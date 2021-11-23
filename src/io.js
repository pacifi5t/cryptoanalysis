import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function question(prompt) {
  return new Promise((resolve, _) => {
    rl.question(prompt ?? "", resolve);
  });
}

export function closeReadline() {
  rl.close();
}
