
// Event listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: " + randomNumber);
    attempts = 0;

    // Hide reset button
    document.querySelector("#resetBtn").style.display = "none";

    // Show guess btn
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    document.querySelector("#guesses").textContent = "";
    document.querySelector("#guessesLeft").textContent = "You have " + (7 - attempts) + " guesses left!";
    document.querySelector("#wins").textContent = "Wins: " + wins;
    document.querySelector("#losses").textContent = "Losses: " + losses;
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        let feedback = document.querySelector("#feedback");
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    document.querySelector("#guessesLeft").textContent = "You have " + (7 - attempts) + " guesses left!";
    console.log("Attempts: " + attempts);
    feedback.style.color = "black";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed the correct number!";
        feedback.style.color = "darkgreen";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "You ran out of attempts!";
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
             feedback.textContent = "Guess is too high";
        } else {
            feedback.textContent = "Guess is too low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    document.querySelector("#wins").textContent = "Wins: " + wins;
    document.querySelector("#losses").textContent = "Losses: " + losses;
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}

initializeGame();