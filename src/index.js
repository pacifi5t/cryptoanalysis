import { decrypt as decryptCT } from "./column-transpose.js";
import { cIndex, encryptedToMatrix } from "./vigener.js";
import { closeReadline, question } from "./io.js";

async function main() {
  console.log("Choose cipher");
  console.log("1 - Columnar transposition");
  console.log("2 - Vigener");

  const num = parseInt(await question());

  switch (num) {
    case 1:
      await decryptCT();
      break;
    case 2:
      cIndex(encryptedToMatrix(parseInt(await question("Enter GCD\n"))));
      break;
    default:
      break;
  }

  closeReadline();
}

main();
