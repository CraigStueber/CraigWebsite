const SYMBOLS = ["🍀", "🔥", "🐉", "💀", "⚔️", "🧿"];
const WEIGHTS = [25, 25, 20, 15, 8, 7]; // house odds

function weightedRandomSymbol() {
  const totalWeight = WEIGHTS.reduce((a, b) => a + b, 0);
  let r = Math.random() * totalWeight;
  for (let i = 0; i < SYMBOLS.length; i++) {
    if (r < WEIGHTS[i]) return SYMBOLS[i];
    r -= WEIGHTS[i];
  }
  return SYMBOLS[0];
}

export function spinReel(betAmount = 10) {
  const reels = [0, 0, 0].map(() => weightedRandomSymbol());
  const [a, b, c] = reels;

  let win = 0;
  let message = "";

  if (a === b && b === c) {
    if (a === "💀") {
      win = -2 * betAmount;
      message = "💀💀💀 - The Curse Strikes! You lost double!";
    } else if (a === "🧿") {
      win = 100 * betAmount;
      message = `🧿🧿🧿 - JACKPOT! You won ${win} gold! The gods blinked.`;
    } else if (a === "⚔️") {
      win = 25 * betAmount;
      message = `⚔️⚔️⚔️ - The Blade Triumphs! You won ${win} gold!`;
    } else if (a === "🐉") {
      win = 10 * betAmount;
      message = `🐉🐉🐉 - The Wyrm Roars! You won ${win} gold!`;
    } else {
      win = 2 * betAmount;
      message = `${a}${b}${c} - Triple match! You won double!`;
    }
  }

  return { reels, message, win };
}
