"use strict";
/* ============= Grid box =============*/
const gridBox = document.getElementById("grid-box");
const RANGE_INPUT = document.getElementById("range");
let rangeInputValue;
let div = document.createElement("div");
let divs;
// Filling grid box when user enters the page
fillGridBox(32);
RANGE_INPUT.addEventListener("input", () => {
  // Size text is numbers above range input that indicates it's size
  const sizeText = document.querySelectorAll(".grid-size>span");
  rangeInputValue = RANGE_INPUT.value;
  sizeText[0].textContent = rangeInputValue;
  sizeText[1].textContent = rangeInputValue;
});
RANGE_INPUT.addEventListener("change", () => {
  rangeInputValue = RANGE_INPUT.value;
  // Appending to grid box
  emptyGridBox();
  fillGridBox(rangeInputValue);
});
/* This function will create divs and appends them to gridBox*/
function fillGridBox(length) {
  for (let j = 0; j < length; j++) {
    for (let i = 0; i < length; i++) {
      gridBox.style.gridTemplateRows = `repeat(${length},1fr)`;
      gridBox.style.gridTemplateColumns = `repeat(${length},1fr)`;
      div = document.createElement("div");
      div.classList = "single-div";
      // Remove drag event from divs
      div.setAttribute("draggable", "false");
      gridBox.appendChild(div);
    }
  }
  // ALl divs
  divs = document.querySelectorAll(".single-div");
}
/* This function will empty grid box from divs*/
function emptyGridBox() {
  gridBox.innerHTML = "";
}
/* ============= Grid box end =============*/
/* ============= BUTTONS =============*/
// All buttons
const buttons = document.querySelectorAll(".btn");
const colorPicker = document.querySelector("#colorPicker");
// pen color
let penColor = "black";
// Modes
let rainbowMode ;
let cold ;
let warm ;
for (let button of buttons) {
  // Finding the clicked button
  button.addEventListener("click", (e) => {
    const clickedButton = e.target;
    // Contains each button's dataset value
    const clickedButtonName = clickedButton.dataset.button;
    // Changing background color when button is clicked
    clickedButton.classList.toggle("clicked");
    // Removing clicked class from other buttons
    for (let button of buttons) {
      if (!button.classList.contains(clickedButtonName)) {
        button.classList.remove("clicked");
        colorPicker;
        colorPicker.removeEventListener("input", setBackgroundColor);
        colorPicker.removeEventListener("input", setBorderColor);
        // Reseting mdoes
        rainbowMode = false;
        cold = false;
        warm = false;
      }
    }
    // Custom button
    if (clickedButtonName === "customColor") {
      penColor = colorPicker.value;
      colorPicker.addEventListener("input", setCustomColor);
    }
    // Background Color
    else if (clickedButtonName === "backgroundColor") {
      colorPicker.addEventListener("input", setBackgroundColor);
    }
    // Border color
    else if (clickedButtonName === "borderColor") {
      colorPicker.addEventListener("input", setBorderColor);
    }
    // toggle Border
    else if (clickedButtonName === "toggleBorder") {
      toggleBorder();
    }
    // eraser
    else if (clickedButtonName === "eraser") {
      setEraser();
    }
    // clear grid
    else if (clickedButtonName === "clear") {
      clearDivs();
    }
    // Rainbow mode
    else if (clickedButtonName === "rainbowMode") {
      rainbowMode = true;
    }
    // Warm mode
    else if (clickedButtonName === "warm") {
      warm = true;
    }
    // Cold mode
    else if (clickedButtonName === "warm") {
      cold = true;
    }
  });
}
// Custom button
function setCustomColor() {
  let customColor;
  customColor = colorPicker.value;
  penColor = customColor;
  return true;
}
// backGround color
function setBackgroundColor() {
  let customBackgroundColor;
  customBackgroundColor = colorPicker.value;
  gridBox.style.backgroundColor = customBackgroundColor;
  return true;
}
// border color
function setBorderColor() {
  let customBorderColor;
  customBorderColor = colorPicker.value;
  for (let div of divs) {
    div.style.borderColor = customBorderColor;
  }
  return true;
}
// Toggle border
function toggleBorder() {
  for (let div of divs) {
    div.classList.toggle('border-none');
  }
  return true;
}
// Set eraser
function setEraser() {
  penColor = 'rgba(0,0,0,0)'
}
// Clear divs
function clearDivs() {
  for (div of divs) {
    div.style.background = 'rgba(0,0,0,0)'
  }
}
// Set rainbowMode
function setRainbowMode() {
  // Deciding between a color family
  let randomColorFamily = getRandomNumber(3) + 1;
  // 
  if (randomColorFamily === 1) {
    setRandomPenRgb(0, 255, 255);
  }
  // green = 0
  else if (randomColorFamily === 2) {
    setRandomPenRgb(255, 0, 255);
  }
  // blue = 0
  else if (randomColorFamily === 3) {
    setRandomPenRgb(255, 255, 0);
  }
  // Rgb
  function setRandomPenRgb(red,green,blue) {
    penColor = `rgb(${getRandomNumber(red)},${getRandomNumber(green)},${getRandomNumber(blue)})`;
  }
}

// Getting a random number
function getRandomNumber(max) {
  let randomNumber = Math.trunc(Math.random() * max);
  return randomNumber;
}
gridBox.addEventListener("mousedown", () => {
  for (let div of divs) {
    // When mouse is hovered
    div.addEventListener("mouseover", applyPenColor);
    // When mouse is clicked
    div.addEventListener("click", applyPenColor);
    // Removing drag
    div.addEventListener("dragstart", removeDrag);
    div.addEventListener("drop", removeDrag);
  }
});
gridBox.addEventListener("mouseup", () => {
  for (let div of divs) {
    div.removeEventListener("mouseover", applyPenColor);
  }
  return true;
});
/* Changes div color to penColor */
const applyPenColor = (e) => {
  let clickedDiv = e.target;
  if (rainbowMode) {
    setRainbowMode()
  }
  clickedDiv.style.background = penColor;
  return true;
};
/* used for Removing drag color to penColor */
const removeDrag = (e) => {
  e.preventDefault();
  return true;
};

/* ============= BUTTONS End=============*/
