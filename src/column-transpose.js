import { resolve } from "path";
import { readFileSync } from "fs";
import { question } from "./io.js";

const language = "ru";
const compatibilityTable = parseCompatTable(language);

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

function parseCompatTable(lang) {
  const filePath = resolve(`./compat-tables/${lang}.txt`);
  const content = readFileSync(filePath, { encoding: "utf-8" }).split("\n");
  const charMap = new Map();

  for (const each of content) {
    const char = each.split(" ");
    charMap.set(char[0], char[1]);
  }
  console.log(charMap);
  return charMap;
}
