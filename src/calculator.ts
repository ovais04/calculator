export function add(numbers: string): number {
    if (numbers.trim() === '') {
        return 0;
    }

    let delimiter = /[,\n]/;
    let numString = numbers;

    // Check if there is a custom delimiter
    if (numString.startsWith('//')) {
        const delimiterMatch = numString.match(/^\/\/(\D+)\n/);
        if (delimiterMatch) {
            delimiter = new RegExp(delimiterMatch[1]);
            numString = numString.substring(delimiterMatch[0].length);
        }
    }

    const numberArray = numString.split(delimiter).map(num => {
        const parsed = parseInt(num, 10);
        if (isNaN(parsed)) {
            throw new Error('Invalid number');
        }
        return parsed;
    });

    const negativeNumbers = numberArray.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed ${negativeNumbers.join(',')}`);
    }

    return numberArray.reduce((acc, num) => acc + num, 0);
}
