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
let penColor = "rgb(0,0,0)";
// Modes
let rainbowMode;
let cold;
let warm;
let darken;
let lighten;
let fancy;
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
        // Resetting mdoes
        rainbowMode = false;
        cold = false;
        warm = false;
        darken = false;
        lighten = false;
        fancy = false;
        // Resetting the pen color
        penColor = 'black'
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
    else if (clickedButtonName === "warmColor") {
      warm = true;
    }
    // Cold mode
    else if (clickedButtonName === "coldColor") {
      cold = true;
    }
    // Cold mode
    else if (clickedButtonName === "darken") {
      darken = true;
    }
    // Cold mode
    else if (clickedButtonName === "lighten") {
      lighten = true;
    }
    // Fancy mode
    else if (clickedButtonName === "fancyColor") {
      fancy = true;
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
// Set warm mode
function setWarmMode() {
  // Warm color pallette
  const warmColors = ["#de0c1c", "#fe2d2d", "#fb7830", "#fecf02", "#ffdd47"];
  // Choose randomly between one of the colors
  const randomNumber = getRandomNumber(warmColors.length);
  // Setting the pen color
  penColor = warmColors[randomNumber];
}
// Set cold mode
function setColdMode() {
  // cold color pallette
  const coldColors = ["#00047e","#0038b9","#0ca6dd","#6845fb","#8b41ff"];
  // Choose randomly between one of the colors
  const randomNumber = getRandomNumber(coldColors.length);
  // Setting the pen color
  penColor = coldColors[randomNumber];
}
// Getting a random number
function getRandomNumber(max) {
  let randomNumber = Math.trunc(Math.random() * max);
  return randomNumber;
}
// Darken mode
function setDarken(rgbColor) {
  // Getting indexOf pare
  let firstParentheses = rgbColor.indexOf("(")
  let secondParentheses = rgbColor.indexOf(")")
  // Converting rgbColor to an array of red green blue
  let darkenRgb;
  let rgb = rgbColor.slice(firstParentheses + 1, secondParentheses);
  rgb = rgb.split(",");
  for (let i = 0; i < 3; i++) {
    rgb[i] = +rgb[i] - 20;
    if (rgb[i] < 0) {
      rgb[i] = 0;
    }
  }
  darkenRgb = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  penColor = darkenRgb;
}
function setLighten(rgbColor) {
  // Getting indexOf pare
  let firstParentheses = rgbColor.indexOf("(")
  let secondParentheses = rgbColor.indexOf(")")
  // Converting rgbColor to an array of red green blue
  let darkenRgb;
  let rgb = rgbColor.slice(firstParentheses + 1, secondParentheses);
  rgb = rgb.split(",");
  for (let i = 0; i < 3; i++) {
    rgb[i] = +rgb[i] + 20;
    if (rgb[i] > 255) {
      rgb[i] = 255;
    }
  }
  darkenRgb = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  penColor = darkenRgb;
}
function setFancy(clickedDiv) {
  clickedDiv.style.removeProperty('background')
  clickedDiv.classList.add('fancyDiv')
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
  let clickedDivColor = getClickedDivColor();
  // gets clicked div background color
  function getClickedDivColor() {
    return clickedDiv.style.background
  }
  if (rainbowMode) {
    setRainbowMode();
  } else if (warm) {
    setWarmMode();
  } else if (cold) {
    setColdMode();
  } else if (darken) {
    setDarken(clickedDivColor);
  }
  else if (lighten) {
    setLighten(clickedDivColor);
  } 
  clickedDiv.style.background = penColor;
  if (fancy) {
    setFancy(clickedDiv);
  }
  console.log(penColor);
  return true;
};
/* used for Removing drag color to penColor */
const removeDrag = (e) => {
  e.preventDefault();
  return true;
};

/* ============= BUTTONS End=============*/
