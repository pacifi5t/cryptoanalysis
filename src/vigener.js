import { readFileSync } from "fs";

const filepath = "./Шифр Виженера2.txt";
const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя_";
const text = readFileSync(filepath, "utf-8").trim().toLowerCase();

export function encryptedToMatrix(gcd) {
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

export function cIndex(matrix) {
  const result = [];

  for (let i = 0; i < matrix[0].length; i++) {
    const map = new Map();
    for (let j = 0; j < matrix.length; j++) {
      const s = matrix[j][i];
      map.has(s) ? map.set(s, map.get(s) + 1) : map.set(s, 1);
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
    // console.log(matrix[i]);
  }

  console.log(
    `I = ${result.reduce((total, e) => total + e, 0) / result.length}`
  );
  return result;
}
