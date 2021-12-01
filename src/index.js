import { decrypt as decryptCT } from "./column-transpose.js";
import { cIndex, encryptedToMatrix } from "./vigener.js";
import { closeReadline, question } from "./io.js";

async function main() {
  // console.log("Choose cipher");
  // console.log("1 - Columnar transposition");
  // console.log("2 - Double transposition");

  // const num = parseInt(await question());

  // switch (num) {
  //   case 1:
  //     await decryptCT();
  //     break;
  //   default:
  //     break;
  // }

  cIndex(encryptedToMatrix(3));

  closeReadline();
}

main();
