import { resolve } from "path";
import { readFileSync } from "fs";
import { question } from "./io.js";

const language = "ru";
const compatibilityTable = parseCompatTable(language);

export async function decrypt() {
  const encrypted = await question("Enter encrypted message: ");
  const matrixSizes = getMatrixSizes(encrypted.length);
  const results = [];
  let totalPermutations = 0;

  for (const size of matrixSizes) {
    const matrix = mapEncryptedToMatrix(encrypted, size);
    let columnPermutations = [];

    for (let i = 0; i < matrix[0].length; i++) {
      columnPermutations = columnPermutations.concat(
        getPermutations(i, matrix)
      );
    }

    for (const perm of columnPermutations) {
      const dMatrix = [];
      for (let i = 0; i < size[0]; i++) {
        dMatrix.push([]);
        for (const col of perm) {
          dMatrix[i].push(matrix[i][col]);
        }
      }

      let decrypted = "";
      for (let i = 0; i < dMatrix.length; i++) {
        for (let j = 0; j < dMatrix[i].length; j++) {
          decrypted += dMatrix[i][j];
        }
      }
      results.push([decrypted, size, perm]);
    }
    totalPermutations += columnPermutations.length;
  }

  console.log("Matrix sizes:", matrixSizes);
  console.log("Total permutations:", totalPermutations);
  for (const each of results) {
    console.log(each[0], each[1], each[2]);
  }
}

/**
 * @param {string} lang
 * @returns {Map<string, [string, string]>} sizes of matrix
 */
function parseCompatTable(lang) {
  const filePath = resolve(`./compat-tables/${lang}.txt`);
  const content = readFileSync(filePath, { encoding: "utf-8" }).split("\n");
  const charMap = new Map();

  for (const each of content) {
    const char = each.split(" ");
    charMap.set(char[0], [char[1], char[2]]);
  }
  return charMap;
}

/**
 * @param {number} encryptedLength
 * @returns {[number,number][]} sizes of matrix
 */
function getMatrixSizes(encryptedLength) {
  const sizes = [];
  for (let i = 2; ; i++) {
    const result = encryptedLength / i;
    if (result < i) {
      //If result is prime number the loop also should end
      break;
    }
    if (Number.isInteger(result)) {
      sizes.push([result, i]);
    }
  }
  return sizes;
}

/**
 * @param {string} encrypted
 * @param {[number, number]} matrixSizes
 * @returns {string[][]} matrix of symbols
 */
function mapEncryptedToMatrix(encrypted, matrixSizes) {
  const rows = matrixSizes[0];
  const cols = matrixSizes[1];

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(encrypted.slice(i * cols, i * cols + cols).split(""));
  }
  return matrix;
}

function getPermutations(begin, matrix) {
  const maxLen = matrix[0].length;
  const orders = [];

  function next(order) {
    if (order.length === maxLen) {
      orders.push(order);
    }
    for (let i = 0; i < maxLen; i++) {
      const current = matrix[0][order[order.length - 1]];
      const following = matrix[0][i];
      if (!order.includes(i) && symbolsAreCompatible(current, following)) {
        next([...order, i]);
      }
    }
  }

  next([begin]);
  return orders;
}

function symbolsAreCompatible(a, b) {
  return (
    compatibilityTable.get(a)[1].includes(b) ||
    compatibilityTable.get(b)[0].includes(a)
  );
}
