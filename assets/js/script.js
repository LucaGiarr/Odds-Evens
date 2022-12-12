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

  // you-number is displayed (small) and checked (odd or even)

  // sum is calculated, checked (odd or even) and displayed

  // Check who is the winner
  // Hands are hidden

  // Winner is displayed and scores added to the counter

  // Increment score and display pc score and you score

  if (Math.max(pcScore, youScore) == maxScoreNumb) {

    if (pcScore > youScore) {
      // display game over
    } else {
      // display you win
    }

    // play again or go to start (buttons)

  } else {

    // Restore the initial styles
  }
}