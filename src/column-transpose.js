import { question } from "./io.js";
import * as utils from "./utils.js";

export async function decrypt() {
  const encrypted = await question("Enter encrypted message: ");
  const matrixSizes = utils.getMatrixSizes(encrypted.length);
  const results = [];
  let totalPermutations = 0;

  for (const size of matrixSizes) {
    const matrix = utils.mapEncryptedToMatrix(encrypted, size);
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
 * @param {number} begin
 * @param {string[][]} matrix
 * @returns {any[]} array of permutations that are very likely to be a solution
 */
function getPermutations(begin, matrix) {
  const maxLen = matrix[0].length;
  const permutations = [];

  function next(order) {
    if (order.length === maxLen) {
      permutations.push(order);
    }
    for (let i = 0; i < maxLen; i++) {
      const current = matrix[0][order[order.length - 1]];
      const following = matrix[0][i];
      if (
        !order.includes(i) &&
        utils.symbolsAreCompatible(current, following)
      ) {
        next([...order, i]);
      }
    }
  }

  next([begin]);
  return permutations;
}
