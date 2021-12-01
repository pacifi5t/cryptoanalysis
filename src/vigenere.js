import { readFileSync } from "fs";
import { question } from "./io.js";

const filepath = "./Шифр Виженера2.txt";
const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя_";
const text = readFileSync(filepath, "utf-8").trim().toLowerCase();
const columns = [];

export async function decrypt() {
  const gcd = parseInt(await question("Enter GCD: "));
  const matrix = encryptedToMatrix(gcd);
  const index = indexOfCoincidence(matrix);

  const offsets = [];
  for (let i = 1; i < columns.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      const mut = mutualIndex(columns[0], shiftColumn(columns[i], j));
      if (mut > 0.05 && mut < 0.07) {
        console.log(`col = ${i}; s = ${j}`);
        offsets.push(j);
      }
    }
  }
  // console.log(offsets);
}

function encryptedToMatrix(gcd) {
  const rows = Math.ceil(text.length / gcd);
  const cols = gcd;

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(text.slice(i * cols, i * cols + cols).split(""));
  }

  while (matrix[rows - 1].length < cols) {
    matrix[rows - 1] = [...matrix[rows - 1], "*"];
  }

  // console.log(matrix);
  return matrix;
}

function indexOfCoincidence(matrix) {
  const result = [];

  for (let i = 0; i < matrix[0].length; i++) {
    const map = new Map();
    for (let j = 0; j < matrix.length; j++) {
      const s = matrix[j][i];
      map.has(s) ? map.set(s, map.get(s) + 1) : map.set(s, 1);
    }

    // Insert 0 for the rest of symbols
    for (let j = 0; j < alphabet.length; j++) {
      map.has(alphabet[j]) ? {} : map.set(alphabet[j], 0);
    }
    // console.log(map);

    const m = map.has("*") ? matrix.length - 1 : matrix.length;
    // console.log(m);
    let sum = 0;
    for (let j = 0; j < alphabet.length; j++) {
      const elem = map.get(alphabet[j]) ?? 0;
      sum += elem * (elem - 1);
    }

    result.push(sum / (m * (m - 1)));
    columns.push(map);
    // console.log(matrix[i]);
  }

  console.log(
    `I = ${result.reduce((total, e) => total + e, 0) / result.length}`
  );
  return result;
}

function shiftColumn(column, offset) {
  let temp = [];
  for (let i = 0; i < alphabet.length; i++) {
    temp.push(column.get(alphabet[i]));
  }

  for (let i = 0; i < offset; i++) {
    const elem = temp.shift();
    temp = [...temp, elem];
  }

  const map = new Map();
  for (let i = 0; i < temp.length; i++) {
    map.set(alphabet[i], temp[i]);
  }
  return map;
}

function mutualIndex(fisrt, second) {
  let sum = 0;
  let m1 = 0;
  let m2 = 0;

  let temp1 = [];
  for (let i = 0; i < alphabet.length; i++) {
    temp1.push(fisrt.get(alphabet[i]));
  }

  for (let i = 0; i < alphabet.length; i++) {
    const elemFirst = fisrt.get(alphabet[i]);
    const elemSecond = second.get(alphabet[i]);
    m1 += elemFirst;
    m2 += elemSecond;
    sum += elemFirst * elemSecond;
  }

  return sum / (m1 * m2);
}
