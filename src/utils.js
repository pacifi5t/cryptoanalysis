import { resolve } from "path";
import { readFileSync } from "fs";

export const compatibilityTable = parseCompatTable(language);

const language = "ru";

/**
 * @param {number} encryptedLength
 * @returns {[number,number][]} sizes of matrix
 */
export function getMatrixSizes(encryptedLength) {
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
export function mapEncryptedToMatrix(encrypted, matrixSizes) {
  const rows = matrixSizes[0];
  const cols = matrixSizes[1];

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(encrypted.slice(i * cols, i * cols + cols).split(""));
  }
  return matrix;
}

/**
 * @param {string} a
 * @param {string} b
 * @returns {boolean} true if symbols are compatible, else false
 */
export function symbolsAreCompatible(a, b) {
  return (
    compatibilityTable.get(a)[1].includes(b) ||
    compatibilityTable.get(b)[0].includes(a)
  );
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
