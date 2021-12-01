import { readFileSync } from "fs";

const filepath = "./Шифр Виженера2.txt";
const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
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
      if (map.has(s)) {
        map.set(s, map.get(s) + 1);
      } else {
        map.set(s, 1);
      }
    }
    console.log(map);

    let f1;
    for (let j = 0; j < alphabet.length; j++) {
      const elem = map.get(alphabet[j]);
      if (elem != 0 || elem != undefined) {
        f1 = elem;
      }
      break;
    }

    const m = map.has("*") ? matrix.length - 1 : matrix.length;
    console.log(m);
    let sum = 0;
    for (let j = 0; j < alphabet.length; j++) {
      sum += (map.get(alphabet[i]) ?? 0) * f1;
    }
    result.push(sum / (m * (m - 1)));
    // console.log(matrix[i]);
  }
  console.log(result);
  return result;
}
