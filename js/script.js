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
  clickedDiv.style.background = penColor;
  return true;
};
/* used for Removing drag color to penColor */
const removeDrag = (e) => {
  e.preventDefault();
  return true;
};

/* ============= BUTTONS End=============*/
