const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const deleteBtn = document.querySelector('.delete');

let firstNumber = '';
let secondNumber = '';
let operator = '';
let clearScreen = false;

function getCurrentValue(){
  return operator === '' ? firstNumber : secondNumber;
};

function setCurrentValue(value){
  if(operator === ''){
    firstNumber = value;
  }else{
    secondNumber = value;
  }
};

function updateDecimalState(){
  decimal.disabled = getCurrentValue.includes('.');
};

const operatorSymbols = {
  '÷' : '/',
  '+' : '+',
  '-' : '-',
  '*' : '*'
};

// HELPER -- Round numbers
const roundResults = function(num){
  return Math.round(num * 1000) / 1000;
}


const add = function(a, b){
  return a + b;
}
const divide = function(a, b){
  if (b === 0) {
   return 'Haha. Nice try!'
  }
  return a / b;
}
const multiply = function(a, b){
  return a * b;
}
const substract = function(a, b){
  return a - b;
}

const operate = function(operator, a, b){
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return substract(a, b);
    case '/':
      return divide(a, b);
    case '*':
      return multiply(a, b);
    default:
      return null;
  }
}

digitButtons.forEach(button => {
  button.addEventListener('click', () =>{
    if(clearScreen){
      firstNumber = '';
      secondNumber = '';
      operator = '';
      clearScreen = false;
    }

    const updated = getCurrentValue() + button.textContent;
    setCurrentValue(updated);
    display.textContent = updated;

    updateDecimalState();
  }
  )
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(firstNumber === 'Haha. Nice try!') return;

    const btnVal = button.textContent.trim();

    if(operator !== '' && secondNumber !== ''){
      const result = operate(operator, Number(firstNumber), Number(secondNumber)).toString();
      if(result === 'Haha. Nice try!'){
        display.textContent = result;
        firstNumber = result;
        operator = '';
        secondNumber = '';
        updateDecimalState();
        return;
      }
      firstNumber = roundResults(result).toString();
      display.textContent = firstNumber;
      secondNumber = '';
    }
  operator = operatorSymbols[btnVal];
  // updateDecimalState();
  })
});

equalsButton.addEventListener('click', () => {
  if(operator === '' || secondNumber === '') return;
  const result = operate(operator, Number(firstNumber), Number(secondNumber));

  if(result === 'Haha. Nice try!'){
    display.textContent = result;
    firstNumber = result;
  }else{
    const rounded = roundResults(result);
    display.textContent = rounded;
    firstNumber = rounded.toString();
  }

  operator = '';
  secondNumber = '';
  clearScreen = true;
})

clearButton.addEventListener('click', () => {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  clearScreen = false;
  display.textContent = '0';
  updateDecimalState();
});



decimal.addEventListener('click', () => {
  if(clearScreen){
    firstNumber = '';
    secondNumber = '';
    operator = '';
    clearScreen = false;
  };

  const current = getCurrentValue();
  if (current.includes('.')) return;
  const updated = current === '' ? '0.' : current + '.';
  setCurrentValue(updated);

  display.textContent = updated;

  updateDecimalState();
})

deleteBtn.addEventListener('click', () => {
  if(clearScreen) return;

  const current = getCurrentValue();
  const updated = current.slice(0, -1);
  setCurrentValue(updated);
  display.textContent = updated === '' ? '0' : updated;

  updateDecimalState();
})