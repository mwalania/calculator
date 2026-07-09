let num1;
let operator;
let num2;

const operate = function(num1, operator, num2){
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
    default:
      console.log('ERROR: Undefined operator.');
        }
}

function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
  if(b === 0){
    // console.log('Error: /0');
    return 'Error: /0';
  }
  return a / b;
}