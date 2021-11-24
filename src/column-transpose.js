import { question } from "./io.js";

export async function decrypt() {
  const encrypted = await question("Enter encrypted message: ");
  const matrixSizes = getMatrixSizes(encrypted.length);

  for (const each of matrixSizes) {
    //TODO: try different combinations of columns
  }
}

export function getMatrixSizes(encryptedLength) {
  const sizes = [];

  for (let i = 2; ; i++) {
    const result = encryptedLength / i;

    if (result < i) {
      break;
    }

    if (Number.isInteger(result)) {
      sizes.push([result, i]);
    }
  }
  return sizes;
}
