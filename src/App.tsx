import React, { useState } from 'react';
import './App.css';
import { add } from './calculator';

const App: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    const handleClick = () => {
        try {
            const sum = add(input);
            setResult(`Result: ${sum}`);
        } catch (error) {
            setResult((error as Error).message);
        }
    };

    return (
        <div className="container">
            <h1>String Calculator</h1>
            <textarea
                value={input}
                onChange={handleChange}
                placeholder="Enter numbers"
            />
            <button onClick={handleClick}>Add</button>
            <p>{result}</p>
        </div>
    );
}

export default App;
