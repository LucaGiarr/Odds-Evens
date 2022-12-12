// Wait for the DOM to finish loading before running the game

// Define global variable
let oddsClicked = "false";
let evensClicked = "false";
let youChoice = "";
let maxScoreNumb = "0";

let howToPlayButton = document.getElementById("how-to-play-button");
let startButton = document.getElementById("start-button");

let oddsButton = document.getElementById("odds-button");
let evensButton = document.getElementById("evens-button");


// Event listeners
document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("max-score").focus();

});

startButton.addEventListener("click", function () {

  let maxScore = document.getElementById("max-score");
  maxScoreNumb = maxScore.value;

  if (maxScoreNumb === "") {

    throw alert("Select a max number of rounds");

  } else if (maxScoreNumb > 9) {

    throw alert("Max number of rounds is 9");

  } else {

    displayMaxScoreNumb();

  }
})

oddsButton.addEventListener("click", function () {

  if (oddsClicked === "false" && evensClicked === "false") {
    oddsClicked = "true";

    highlightButton(oddsButton, oddsClicked);

  } else if (oddsClicked === "false" && evensClicked === "true") {
    oddsClicked = "true";
    evensClicked = "false";
    highlightButton(oddsButton, oddsClicked);
    highlightButton(evensButton, evensClicked);
  }
  youChoice = "odd";
});

evensButton.addEventListener("click", function () {

  if (evensClicked === "false" && oddsClicked === "false") {
    evensClicked = "true";
    highlightButton(evensButton, evensClicked);

  } else if (evensClicked === "false" && oddsClicked === "true") {
    evensClicked = "true";
    oddsClicked = "false";
    highlightButton(evensButton, evensClicked);
    highlightButton(oddsButton, oddsClicked);
  }
  youChoice = "even";
});

displayNumberHandYou();

document.getElementById("img-numbers").addEventListener("click", function () {
  getNumber();
});

document.getElementById("play-button").onclick = function () {
  runGame();
};












// Functions
function displayMaxScoreNumb() {
  document.getElementById("pc-score").innerText = `SCORE (0/${maxScoreNumb})`;
  document.getElementById("you-score").innerText = `SCORE (0/${maxScoreNumb})`;
}

/**
 * Highlight the button if clicked and go to the standard button style if the other button is clicked
 */
function highlightButton(button, isClicked) {

  let backColor = "black";
  let textColor = "white";
  let defaultBackColor = "#EFEFEF";
  let defaultTextColor = "black";

  if (isClicked === "true") {
    button.style.backgroundColor = backColor;
    button.style.color = textColor;
  } else {
    button.style.backgroundColor = defaultBackColor;
    button.style.color = defaultTextColor;
  }
}

/**
 * Displays the number that you choose by clicking on the image with the hands
 */
function displayNumberHandYou() {

  let imgNumbers = document.getElementById('img-numbers').children;

  for (var image of imgNumbers) {
    image.addEventListener("click", function () {
      let numbSelected = this.getAttribute("alt");
      document.getElementById("you-number-display").outerHTML = `<img id="you-number-display" src="assets/images/${numbSelected}.png" alt="${numbSelected}">`;
    });
  }
}

// when PLAY is clicked
function runGame() {

  // Check if one of the buttons ODDS or EVENS are selected (if no choice is made, it returns an error)
  if (oddsClicked === "false" && evensClicked === "false") {

    throw alert("Please select ODDS or EVENS");
  }

  delayedFunctions();

}

async function delayedFunctions() {

  // 3, 2, 1... SHOOT!!

  // random number is calculated (pc) and displayed
  let pcNum = randPcNumb();

  // you-number is obtained
  let youNum = getNumber();

  // sum is calculated, checked (odd or even) and displayed
  let sumNum = sumNumbers(pcNum, youNum);
  let sumOddsEvens = checkNumb(sumNum);

  // Check who is the winner
  let whoWins = "";
  if (youChoice === sumOddsEvens) {
    whoWins = "You win!";
  } else {
    whoWins = "PC wins!";
  }
  
  // Winner is displayed and scores added to the counter
  displayResultsWinner(sumNum, sumOddsEvens, whoWins);  

  // Increment score and display pc score and you score
  displayScores(whoWins);

  // Get scores (pc and you)
  let scores = currentScores();

  let pcScore = Math.max(scores[0]);
  let youScore = Math.max(scores[1]);

  if (Math.max(pcScore, youScore) == maxScoreNumb) {

    if (pcScore > youScore) {
      displayEndGame("Game Over");
    } else {
      displayEndGame("You win!");
    }

    // play again or go to start (buttons)

  } else {

    // Restore the initial styles
  }
}

// resolved  how to create a "delay" function from websites below
// https://linuxhint.com/wait-x-seconds-javascript/
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Calculates a random number between 0-5 and write the code in the DOM to display the "hand" with the random number
 */
function randPcNumb() {
  let pcNum = Math.floor(Math.random() * 5) + 1;
  document.getElementById("pc-number-display").outerHTML = `<img id="pc-number-display" src="assets/images/number${pcNum}.png" alt="number${pcNum}">`;
  return pcNum;
}

/**
 * Gets the number you choose
 */
function getNumber() {
  let youNum = document.getElementById("you-number-display").getAttribute("alt");
  youNum = parseInt(youNum[youNum.length - 1]);
  return youNum;
}

/**
 * Returns the sum of two numbers
 */
function sumNumbers(num1, num2) {
  return num1 + num2;
}

/**
 * Checks if the number is odd or even
 */
function checkNumb(numb) {
  let result = "";
  if (numb % 2 == 0) {
    result = "even";
  } else {
    result = "odd";
  }
  return result;
}

// Function to display in the DOM the results and the winner
function displayResultsWinner(sumNum, sumOddsEvens, whoWins) {
  let winner = document.getElementById("sum-display-container");

  winner.children[0].innerText = `the sum is ${sumNum}`;
  winner.children[1].innerText = sumOddsEvens;
  winner.children[2].innerText = whoWins;

  winner.style.transitionDuration = "0.3s";
  winner.style.opacity = "1";
}

// Function to display the scores in the DOM
function displayScores(whoWins) {
  let pcScore = document.getElementById("pc-score").innerText;
  let pcScoreNum = parseInt(pcScore[pcScore.length - 4]);

  let youScore = document.getElementById("you-score").innerText;
  let youScoreNum = parseInt(youScore[youScore.length - 4]);

  if (whoWins === "You win!") {
    youScoreNum = youScoreNum + 1;
    document.getElementById("you-score").innerText = `SCORE (${youScoreNum}/${maxScoreNumb})`;
  } else {
    pcScoreNum = pcScoreNum + 1;
    document.getElementById("pc-score").innerText = `SCORE (${pcScoreNum}/${maxScoreNumb})`;
  }

  document.getElementById("sum-display-container").style.opacity = "0";
  document.getElementById("sum-display-container").style.transitionDuration = "0.5s";

  let disScores = document.getElementById("scores-display-container");
  disScores.children[1].innerHTML = `<h3>${pcScoreNum}</h3>`;
  disScores.children[3].innerHTML = `<h3>${youScoreNum}</h3>`;
  document.getElementById("scores-display-container").style.opacity = "1";
  document.getElementById("scores-display-container").style.transitionDuration = "0.5s";
}

// Reads current scores in the DOM
function currentScores() {
  let pcScore = document.getElementById("pc-score").innerText;
  let pcScoreNum = parseInt(pcScore[pcScore.length - 4]);

  let youScore = document.getElementById("you-score").innerText;
  let youScoreNum = parseInt(youScore[youScore.length - 4]);

  return [pcScoreNum, youScoreNum];
}

// Hides window with the scores and shows window with winner and buttons to play again
function displayEndGame(result) {
  document.getElementById("scores-display-container").style.opacity = "0";
  document.getElementById("scores-display-container").style.transitionDuration = "0.5s";

  document.getElementById("end-game").children[0].innerText = result;
  document.getElementById("end-game").style.opacity = "1";
  document.getElementById("end-game").style.transitionDuration = "0.5s";
}