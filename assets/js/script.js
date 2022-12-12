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