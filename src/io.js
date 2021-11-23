import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * @param {string} prompt
 * @returns {Promise<string>} typed message
 */
export async function question(prompt) {
  return new Promise((resolve, _) => {
    rl.question(prompt ?? "", resolve);
  });
}

export function closeReadline() {
  rl.close();
}
