import { decrypt } from "./column-transpose.js";
import { closeReadline, question } from "./io.js";

async function main() {
  console.log("Choose cipher");
  console.log("1 - Columnar transposition");

  const num = parseInt(await question());

  switch (num) {
    case 1:
      await decrypt();
      break;

    default:
      break;
  }

  closeReadline();
}

main();
