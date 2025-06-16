function simulate() {
  let balance = parseFloat(document.getElementById('balance').value);
  const basebet = parseFloat(document.getElementById('basebet').value);
  const increase = parseFloat(document.getElementById('increase').value) / 100;
  const bombs = parseInt(document.getElementById('bombs').value);
  const tiles = parseInt(document.getElementById('tiles').value);
  const rounds = parseInt(document.getElementById('rounds').value);

  let bet = basebet;
  let maxLossStreak = 0, lossStreak = 0;
  let wins = 0, losses = 0;
  let broke = false;
  let history = [];

  const winChance = (tiles - bombs) / tiles;

  for (let i = 0; i < rounds; i++) {
    const win = Math.random() < winChance;

    if (bet > balance) {
      broke = true;
      break;
    }

    if (win) {
      balance += bet * (1 / winChance) - bet;
      bet = basebet;
      wins++;
      lossStreak = 0;
    } else {
      balance -= bet;
      bet *= (1 + increase);
      losses++;
      lossStreak++;
      maxLossStreak = Math.max(maxLossStreak, lossStreak);
    }

    history.push(balance);
  }

  const resultText = `
總模擬局數：${wins + losses}
勝率：${(wins / (wins + losses) * 100).toFixed(2)}%
輸局：${losses}
最大連輸次數：${maxLossStreak}
爆倉：${broke ? '是' : '否'}
最終資金：$${balance.toFixed(2)}
`;

  document.getElementById('result').textContent = resultText;
}
