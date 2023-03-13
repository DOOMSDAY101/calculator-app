const numberButtons = document.querySelectorAll('[data-number]');
  const deleteButton = document.querySelector('[data-delete]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const resetButton = document.querySelector('[data-reset]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');

  //create a class that would take all the input given by the user
  
  class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }

    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }

    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    
    appendNumber(number) { 
      if (number === '.' && this.currentOperand.includes('.')) return '';
      this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {
      if (this.currentOperand === '') return '';
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }

    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if(isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
          case '/':
          computation = prev / current;
          break;
        default:
          return
          
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }

    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if(isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0 });
      }
      if(decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay;
      }
    }

    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

      if(this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = '';
      }

      
    }

  }

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


  numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      calculator.appendNumber(this.innerText);
      calculator.updateDisplay();
    });
  });

  operationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      calculator.chooseOperation(this.innerText);
      calculator.updateDisplay();
    });
  });

  equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  });

  resetButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  });

  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  });
  
  

  //styling for the toggle button 

  $(".custom-toggle").each(function(i) {
    var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");

    $(this).wrap('<div class="custom-toggle" id="' + name + '"></div>');
    $(this).after('<label for="custom-toggle-' + i + '"></label>');
    $(this).attr("id", "custom-toggle-" + i);
    $(this).attr("name", name);
    
  });
  $(".custom-toggle input").change(function() {
    $("body").toggleClass("white");
    $("h2").toggleClass("black");
    $("h3").toggleClass("black");
    $("div.output").toggleClass("screen");
    $(".custom-toggle label").toggleClass("bg");
    $(".output .current-operand").toggleClass("cur");
    $(".output .previous-operand").toggleClass("pre");
    $(".input-session").toggleClass("theme2-bg");
    $("div.number-box button").toggleClass("keys-color");
    $("div.number-box button").toggleClass("keys-shadow");
    $("#del").toggleClass("theme2-del");
    $("#reset").toggleClass("theme2-del");
    $("#equal").toggleClass("theme2-equal");
  }); 