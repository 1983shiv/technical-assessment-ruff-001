import React, { useState } from 'react';

// TODO: Import useState from React

const ClickCounter: React.FC = () => {
    // TODO: Create a state variable `count` initialized to 0
    const [count, setCount] = useState<number>(0);

    // TODO: Create a function `handleClick` that increments the count
    const handleClick = () => {
        if (count < 10) {
            setCount((prv) => prv + 1);
        }
    };

    const handleReset = () => {
        setCount(0);
    };

    return (
        <div className="flex flex-col justify-center">
            {/* TODO: Add a button with text "Click Me", data-testid="counter-btn", and onClick handler */}
            <div className="flex flex-row justify-around">
                <button
                    onClick={handleClick}
                    data-testid="counter-btn"
                    className="p-2 m-1"
                    disabled={count >= 10 ? true: false}
                    aria-label="Increment counter"
                >
                    Click Me
                </button>
                <button
                    onClick={handleReset}
                    data-testid="reset-btn"
                    className="p-2 m-1"
                    aria-label="reset counter"
                >
                    Reset Counter
                </button>
            </div>
            {/* TODO: Add a paragraph showing "Count: {count}" with data-testid="counter-text" */}
            <p data-testid="counter-text">Count: {count}</p>
        </div>
    );
};

export default ClickCounter;
