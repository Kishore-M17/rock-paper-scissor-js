let userScore = 0;
let computerScore = 0;
let draws = 0;

function playGame(userChoice) {
  const choices = ["Rock", "Paper", "Scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let result = "";

  if (userChoice === computerChoice) {
    result = "It's a Draw!";
    draws++;
  } else if (
    (userChoice === "Rock" && computerChoice === "Scissors") ||
    (userChoice === "Paper" && computerChoice === "Rock") ||
    (userChoice === "Scissors" && computerChoice === "Paper")
  ) {
    result = "You Win!";
    userScore++;
  } else {
    result = "You Lose!";
    computerScore++;
  }

  // Update visible text (keeps these always visible)
  document.getElementById("yourChoice").textContent = `Your choice: ${userChoice}`;
  document.getElementById("computerChoice").textContent = `Computer's choice: ${computerChoice}`;
  document.getElementById("result").textContent = `Result: ${result}`;
  document.getElementById("yourScore").textContent = userScore;
  document.getElementById("computerScore").textContent = computerScore;
  document.getElementById("draws").textContent = draws;

  // If match ended, show message inside the game box
  if (userScore === 5 || computerScore === 5) {
    showEndMessage(userScore === 5 ? "win" : "lose");
  }
}

function showEndMessage(status) {
  // don't add two messages
  if (document.querySelector(".winner-message")) return;

  // find the game container (your HTML earlier used .head)
  const container = document.querySelector(".head") || document.body;

  // create message markup
  const wrapper = document.createElement("div");
  wrapper.className = "winner-message";
  wrapper.style.marginTop = "18px";
  wrapper.style.padding = "18px";
  wrapper.style.borderRadius = "8px";
  wrapper.style.background = "#fafbfcff";
  wrapper.style.textAlign = "center";

  const msg = document.createElement("h2");
  msg.textContent =
    status === "win"
      ? "🎉 Congratulations! You won the game!"
      : "💻 Game over! Computer won the game.";
  msg.style.margin = "0 0 12px 0";
  msg.style.color = "black";

  const playBtn = document.createElement("button");
  playBtn.id = "playAgainBtn";
  playBtn.textContent = "Play Again";
  playBtn.style.background = "#28a745";
  playBtn.style.color = "white";
  playBtn.style.border = "none";
  playBtn.style.padding = "10px 18px";
  playBtn.style.borderRadius = "6px";
  playBtn.style.cursor = "pointer";
  playBtn.onclick = resetGame; // attach reset

  wrapper.appendChild(msg);
  wrapper.appendChild(playBtn);
  container.appendChild(wrapper);

  // Disable only the weapon buttons (keep Play Again and other site buttons unaffected)
  document.querySelectorAll("button.rock, button.paper, button.scissors").forEach(b => b.disabled = true);
}

function resetGame() {
  // reset scores only
  userScore = 0;
  computerScore = 0;
  draws = 0;

  // update UI scores and keep text labels visible
  document.getElementById("yourScore").textContent = 0;
  document.getElementById("computerScore").textContent = 0;
  document.getElementById("draws").textContent = 0;
  document.getElementById("yourChoice").textContent = "Your choice:";
  document.getElementById("computerChoice").textContent = "Computer's choice:";
  document.getElementById("result").textContent = "Result:";  

  // remove the winner message if it exists
  const winEl = document.querySelector(".winner-message");
  if (winEl) winEl.remove();

  // re-enable the weapon buttons
  document.querySelectorAll("button.rock, button.paper, button.scissors").forEach(b => b.disabled = false);
}