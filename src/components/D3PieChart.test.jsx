import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import D3PieChart from './D3PieChart';

describe('D3PieChart Integration Tests', () => {
    const testData = [
        { label: 'Force', value: 8 },
        { label: 'Intelligence', value: 6 },
        { label: 'Durabilité', value: 7 },
        { label: 'Énergie', value: 5 },
        { label: 'Vitesse', value: 9 },
        { label: 'Combat', value: 4 }
    ];

    test('component renders without errors', () => {
        expect(() => {
            render(<D3PieChart data={testData} />);
        }).not.toThrow();
    });

    test('component handles different props combinations', () => {
        const testCases = [
            { data: testData },
            { data: testData, width: 300 },
            { data: testData, height: 300 },
            { data: testData, width: 500, height: 400 },
            { data: [] },
            { data: null },
            { data: undefined },
        ];

        testCases.forEach((props, index) => {
            expect(() => {
                render(<D3PieChart {...props} key={index} />);
            }).not.toThrow();
        });
    });
});