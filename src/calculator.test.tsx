import { add } from './calculator';

describe('add function', () => {
    it('should return 0 for an empty string', () => {
        expect(add('')).toBe(0);
    });

    it('should return the number for a single number string', () => {
        expect(add('5')).toBe(5);
    });

    it('should return the sum of comma-separated numbers', () => {
        expect(add('1,2,3')).toBe(6);
    });

    it('should return the sum of newline-separated numbers', () => {
        expect(add('1\n2\n3')).toBe(6);
    });

    it('should return the sum of numbers separated by a custom delimiter', () => {
        expect(add('//;\n1;2;3')).toBe(6);
    });

    it('should throw an error for negative numbers', () => {
        expect(() => add('1,-2,3')).toThrow('Negative numbers not allowed -2');
        expect(() => add('-1,-2,3')).toThrow('Negative numbers not allowed -1,-2');
    });

    it('should throw an error for invalid numbers', () => {
        expect(() => add('1,a,3')).toThrow('Invalid number');
    });
});
