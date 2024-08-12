// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { add } from './calculator';

jest.mock('./calculator', () => ({
    add: jest.fn()
}));

describe('App component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should display result for valid input', () => {
        (add as jest.Mock).mockReturnValue(6);
        render(<App />);
        
        const textarea = screen.getByPlaceholderText('Enter numbers');
        const button = screen.getByText('Add');
        const result = screen.getByText(/Result:/);

        fireEvent.change(textarea, { target: { value: '1,2,3' } });
        fireEvent.click(button);

        expect(result).toHaveTextContent('Result: 6');
    });

    it('should display error for invalid input', () => {
        (add as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid number');
        });
        render(<App />);
        
        const textarea = screen.getByPlaceholderText('Enter numbers');
        const button = screen.getByText('Add');
        const result = screen.getByText(/Result:/);

        fireEvent.change(textarea, { target: { value: '1,a,3' } });
        fireEvent.click(button);

        expect(result).toHaveTextContent('Invalid number');
    });

    it('should handle custom delimiter input correctly', () => {
        (add as jest.Mock).mockReturnValue(6);
        render(<App />);

        const textarea = screen.getByPlaceholderText('Enter numbers');
        const button = screen.getByText('Add');
        const result = screen.getByText(/Result:/);

        fireEvent.change(textarea, { target: { value: '//;\n1;2;3' } });
        fireEvent.click(button);

        expect(result).toHaveTextContent('Result: 6');
    });
});
