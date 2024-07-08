import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [resultDisplayed, setResultDisplayed] = useState(false);
  const [inputHistory, setInputHistory] = useState([]); // Track input history

  const handleNumberClick = (e) => {
    const value = e.target.innerText;

    if (resultDisplayed) {
      setCurrentValue(value);
      setResultDisplayed(false);
    } else if (waitingForOperand) {
      setCurrentValue(value);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === '0' ? value : currentValue + value);
    }

    setInputHistory([...inputHistory, value]);
  };

  const handleOperatorClick = (e) => {
    const value = e.target.innerText;
    const lastChar = inputHistory[inputHistory.length - 1];

    if (['+', 'x', '/'].includes(lastChar) && value !== '-') {
      // Replace the last operator with the current one
      const updatedHistory = [...inputHistory.slice(0, -1), value];
      setInputHistory(updatedHistory);
    } else {
      setInputHistory([...inputHistory, value]);
      setWaitingForOperand(true);
      if (operator && !waitingForOperand) {
        const result = performCalculation();
        setCurrentValue(String(result));
        setPreviousValue(result);
      } else {
        setPreviousValue(currentValue);
      }
    }

    setOperator(value);
    setResultDisplayed(false);
  };

  const performCalculation = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return current;

    let result;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'x':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return current;
    }
    return Math.round(result * 10000) / 10000; // Ensures precision to at least 4 decimal places
  };

  const handleEqualsClick = () => {
    if (operator && previousValue !== null) {
      const result = performCalculation();
      setCurrentValue(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      setResultDisplayed(true);
      setInputHistory([]); // Reset input history after calculation
    }
  };

  const handleClearClick = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setResultDisplayed(false);
    setInputHistory([]); // Reset input history on clear
  };

  const handleDecimalClick = (e) => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setWaitingForOperand(false);
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
    setInputHistory([...inputHistory, '.']);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div id='my-calculator'>
        <div id='display' className='display'>
          <div id='display' className='current-value'>{currentValue}</div>
        </div>
        <div id='clear' className='button flex' onClick={handleClearClick}>AC</div>
        <div id='divide' className='button' onClick={handleOperatorClick}>/</div>
        <div id='multiply' className='button' onClick={handleOperatorClick}>x</div>
        <div id='seven' className='button' onClick={handleNumberClick}>7</div>
        <div id='eight' className='button' onClick={handleNumberClick}>8</div>
        <div id='nine' className='button' onClick={handleNumberClick}>9</div>
        <div id='subtract' className='button' onClick={handleOperatorClick}>-</div>
        <div id='four' className='button' onClick={handleNumberClick}>4</div>
        <div id='five' className='button' onClick={handleNumberClick}>5</div>
        <div id='six' className='button' onClick={handleNumberClick}>6</div>
        <div id='add' className='button' onClick={handleOperatorClick}>+</div>
        <div id='one' className='button' onClick={handleNumberClick}>1</div>
        <div id='two' className='button' onClick={handleNumberClick}>2</div>
        <div id='three' className='button' onClick={handleNumberClick}>3</div>
        <div id='equals' className='button equals' onClick={handleEqualsClick}>=</div>
        <div id='zero' className='button flex' onClick={handleNumberClick}>0</div>
        <div id='decimal' className='button' onClick={handleDecimalClick}>.</div>
      </div>
    </>
  );
}

export default App;
















