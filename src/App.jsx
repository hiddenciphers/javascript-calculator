import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // State to hold the current value displayed on the calculator
  const [currentValue, setCurrentValue] = useState('0');

  // State to hold the ongoing calculation expression
  const [liveCalculation, setLiveCalculation] = useState('');

  // State to determine if the next input should reset the current value
  const [resetNext, setResetNext] = useState(false);

  // useEffect to handle mouse movement and apply the tilt effect on the calculator
  useEffect(() => {
    // Function to handle mouse movement
    const handleMouseMove = (e) => {
      const calculator = document.getElementById('my-calculator');
      const { clientX, clientY } = e; // Get the mouse position
      const { innerWidth, innerHeight } = window; // Get the window size

      // Calculate the rotation based on mouse position
      const rotateX = ((clientY / innerHeight) - 0.5) * 60; // Increased tilt effect
      const rotateY = ((clientX / innerWidth) - 0.5) * -60; // Increased tilt effect

      // Apply the calculated rotation to the calculator
      calculator.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    // Add the event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Function to handle button clicks
  const handleButtonClick = (value) => {
    if (value === 'AC') {
      // Reset all values when 'AC' (All Clear) button is clicked
      setCurrentValue('0');
      setLiveCalculation('');
      setResetNext(false);
      return;
    }

    if (value === '=') {
      // Handle equals button
      try {
        // Create a filtered expression that removes consecutive operators, allowing negative numbers
        const filtered = (liveCalculation + currentValue).match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
        // Evaluate the filtered expression and update the current value with the result
        const result = eval(filtered);
        setCurrentValue(String(result));
        setLiveCalculation('');
        setResetNext(true);

        // Add wobble effect to the Vite logo
        const viteLogoElement = document.getElementById('vite-logo');
        viteLogoElement.classList.add('wobble');
        setTimeout(() => {
          viteLogoElement.classList.remove('wobble');
        }, 500);
      } catch {
        // Handle any errors in the evaluation
        setCurrentValue('Error');
        setLiveCalculation('');
      }
      return;
    }

    // Handle operator buttons
    if (['+', '-', '*', '/'].includes(value)) {
      if (resetNext) {
        // If the calculator was reset, start a new calculation with the current value and the operator
        setLiveCalculation(currentValue + value);
        setResetNext(false);
      } else {
        // Continue building the calculation expression
        setLiveCalculation(liveCalculation + currentValue + value);
      }
      // Reset the current value
      setCurrentValue('');
      return;
    }

    // Handle decimal point button
    if (value === '.') {
      if (!currentValue.includes('.')) {
        setCurrentValue(currentValue + value);
      }
      return;
    }

    // Prevent multiple leading zeros
    if (currentValue === '0' && value === '0') {
      return;
    }

    // Update the current value, either resetting it or appending to it
    if (currentValue === '0' || resetNext) {
      setCurrentValue(value);
      setResetNext(false);
    } else {
      // Check if the maximum character limit is reached
      if ((currentValue + value).length > 22) {
        setCurrentValue('Digit Limit Met'); // Display error message
        setTimeout(() => {
          setCurrentValue(currentValue); // Revert to previous value after a short delay
        }, 1000);
      } else {
        setCurrentValue(currentValue + value); // Append the new value
      }
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" id="vite-logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div id='my-calculator'>
        <div id='display' className='display'>
          <div className='live-calculation'>
            {liveCalculation} {/* Display the ongoing calculation */}
          </div>
          <div className='current-value'>
            {currentValue} {/* Display the current value */}
          </div>
        </div>

        {/* Calculator buttons */}
        <div id='clear' className='button flex' onClick={() => handleButtonClick('AC')}>AC</div>
        <div id='divide' className='button' onClick={() => handleButtonClick('/')}>/</div>
        <div id='multiply' className='button' onClick={() => handleButtonClick('*')}>x</div>
        <div id='seven' className='button' onClick={() => handleButtonClick('7')}>7</div>
        <div id='eight' className='button' onClick={() => handleButtonClick('8')}>8</div>
        <div id='nine' className='button' onClick={() => handleButtonClick('9')}>9</div>
        <div id='subtract' className='button' onClick={() => handleButtonClick('-')}>-</div>
        <div id='four' className='button' onClick={() => handleButtonClick('4')}>4</div>
        <div id='five' className='button' onClick={() => handleButtonClick('5')}>5</div>
        <div id='six' className='button' onClick={() => handleButtonClick('6')}>6</div>
        <div id='add' className='button' onClick={() => handleButtonClick('+')}>+</div>
        <div id='one' className='button' onClick={() => handleButtonClick('1')}>1</div>
        <div id='two' className='button' onClick={() => handleButtonClick('2')}>2</div>
        <div id='three' className='button' onClick={() => handleButtonClick('3')}>3</div>
        <div id='equals' className='button equals' onClick={() => handleButtonClick('=')}>=</div>
        <div id='zero' className='button flex' onClick={() => handleButtonClick('0')}>0</div>
        <div id='decimal' className='button' onClick={() => handleButtonClick('.')}>.</div>
      </div>
      <br></br>
      <span id='hiddenciphers-span'><a href='https://www.github.com/hiddenciphers' target='_blank' id='hiddenciphers'>@hiddenciphers</a>2024</span>
    </>
  );
}

export default App;


























