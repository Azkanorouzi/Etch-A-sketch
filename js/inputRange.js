
const RANGE = document.querySelector('input[type="range"]');

function handleInputChange() {
  target = document.getElementById('range');
  /* MIN */
  const min = target.min;
  /* MAX */
  const max = target.max;
  /* VALUE */
  const val = target.value;
  /* CHANGING RANGE INPUT DEPENDING ON CURRENT POSITION OF BACKGROUND */
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
RANGE.addEventListener('input', handleInputChange);