import { decrypt as decryptCT } from "./column-transpose.js";
import { decrypt as decryptV } from "./vigenere.js";
import { closeReadline, question } from "./io.js";

async function main() {
  console.log("Choose cipher");
  console.log("1 - Columnar transposition");
  console.log("2 - Vigenere");

  const num = parseInt(await question());

  switch (num) {
    case 1:
      await decryptCT();
      break;
    case 2:
      await decryptV();
      break;
    default:
      break;
  }

  closeReadline();
}

main();
