const rangeInputs = document.querySelector('input[type="range"]');
function handleInputChange() {
  target = document.getElementById('range');
  console.log(target);
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
rangeInputs.addEventListener('input', handleInputChange);