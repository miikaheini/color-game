var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	// Add listener for reset button
	resetButton.addEventListener("click", reset);
	// Initialise mode buttons
	setModeButtons();
	// Initialise squares
	setSquares();
	// Initialise colors
	reset();
}

function setSquares(){
	for (var i = 0; i < squares.length; i++){
		// Add click listeners to squares
		squares[i].addEventListener("click", function(){
			// Grab color of clicked square
			var guess = this.style.backgroundColor;
			// Compare color to pickedColor
			if (guess === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(guess);
				h1.style.backgroundColor = guess;
				resetButton.textContent = "Play again?"
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again"
			}
		});
	}
}

function setModeButtons(){
	// Add event listeners for mode buttons
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			// Make sure that none of the modes shows as selected
			for (var j = 0; j < modeButtons.length; j++){
				modeButtons[j].classList.remove("selected");
			}
			// Select the mode and set number of squares
			this.classList.add("selected");
			if (this.textContent === "Easy"){
				numSquares = 3;
			} else if (this.textContent === "Normal") {
				numSquares = 6;
			} else {
				numSquares = 9;
			}
			// Reset the squares according to selected mode
			reset();
		});
	}
}

function changeColors(color){
	// Loop through all squares
	for (var i = 0; i < squares.length; i++){
		// Change each square to match given colors
		squares[i].style.backgroundColor = color;
	}
	
};

function pickColor(){
	// Create random number for the color to be guessed
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// Initialise array for random colors
	var arr = [];
	// Repeat number of times as set by mode
	for (var i = 0; i < num; i++){
		// Get random color and push to array
		arr.push(randomColor());
	}
	// Return array
	return arr;
}

function randomColor(){
	// Pick red from 0-255
	var r = Math.floor(Math.random() * 256);
	// Pick green from 0-255
	var g = Math.floor(Math.random() * 256);
	// Pick blue from 0-255
	var b = Math.floor(Math.random() * 256);

	// Create return string
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset(){
	colors = generateRandomColors(numSquares);
	// Pick new random color from array
	pickedColor = pickColor();
	// Change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// Change colors of squares
	for (var i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block"
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	resetButton.textContent = "New colors";
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
}