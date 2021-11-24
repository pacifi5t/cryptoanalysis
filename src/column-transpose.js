import { resolve } from "path";
import { readFileSync } from "fs";
import { question } from "./io.js";

const language = "ru";
const compatibilityTable = parseCompatTable(language);

export async function decrypt() {
  const encrypted = await question("Enter encrypted message: ");
  const matrixSizes = getMatrixSizes(encrypted.length);
  // console.log(matrixSizes);
  for (const size of matrixSizes) {
    //TODO: try different combinations of columns
    const matrix = mapEncryptedToMatrix(encrypted, size);
    let columnPermuations = [];

    for (let i = 0; i < matrix[0].length; i++) {
      columnPermuations = columnPermuations.concat(getPermuasions(i, matrix));
    }
    // console.log(columnPermuations.length);
    const possibleDecryptionMatrices = [];
    for (const perm of columnPermuations) {
      const dMatrix = [];
      for (let i = 0; i < size[0]; i++) {
        dMatrix.push([]);
        for (const col of perm) {
          dMatrix[i].push(matrix[i][col]);
        }
      }

      // console.log(dMatrix);
      let ostr = "";
      for (let i = 0; i < dMatrix.length; i++) {
        for (let j = 0; j < dMatrix[i].length; j++) {
          ostr += dMatrix[i][j];
        }
      }
      console.log(ostr, size, perm);
    }
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
      //TODO: add check if result is prime number
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

function getPermuasions(begin, matrix) {
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
