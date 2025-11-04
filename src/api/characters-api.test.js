// src/api/characters-api.test.js

import { describe, expect, jest, test } from '@jest/globals'

import { getCharacters, getCharacterById, getCharactersSorted } from './characters-api';
import characters from '../data/characters.json';

// Mock the characters data for testing purposes
jest.mock('../data/characters.json', () => [
    { 
        id: 1, 
        name: 'Spider-Man', 
        modified: '2023-01-15T10:30:00Z' 
    },
    { 
        id: 2, 
        name: 'Iron Man', 
        modified: '2023-02-20T14:45:00Z' 
    },
    { 
        id: 3, 
        name: 'Captain America', 
        modified: '2023-01-10T08:15:00Z' 
    },
    { 
        id: 4, 
        name: 'hulk', 
        modified: '2023-03-05T16:20:00Z' 
    }
]);

// Test suite for characters-api.js
describe('characters-api', () => {

    // Test for getCharacters function
    describe('getCharacters', () => {

        // Test to check if the function returns the full list of characters
        test('should return the list of characters', () => {
            const result = getCharacters();
            expect(result).toEqual(characters);
        });

        // Test to check if getCharacters returns an array
        test('should return an array', () => {
            const result = getCharacters();
            expect(Array.isArray(result)).toBe(true);
        });

        // Test to check if getCharacters returns the correct length
        test('should return array with correct length', () => {
            const result = getCharacters();
            expect(result).toHaveLength(4);
        });
    });

    // Test for getCharactersSorted function
    describe('getCharactersSorted', () => {
        
        // Test default sorting (by name, ascending)
        test('should sort by name ascending by default', () => {
            const result = getCharactersSorted();
            expect(result[0].name).toBe('Captain America');
            expect(result[1].name).toBe('hulk');
            expect(result[2].name).toBe('Iron Man');
            expect(result[3].name).toBe('Spider-Man');
        });

        // Test sorting by name ascending explicitly
        test('should sort by name ascending when specified', () => {
            const result = getCharactersSorted('name', 'asc');
            expect(result[0].name).toBe('Captain America');
            expect(result[1].name).toBe('hulk');
            expect(result[2].name).toBe('Iron Man');
            expect(result[3].name).toBe('Spider-Man');
        });

        // Test sorting by name descending
        test('should sort by name descending', () => {
            const result = getCharactersSorted('name', 'desc');
            expect(result[0].name).toBe('Spider-Man');
            expect(result[1].name).toBe('Iron Man');
            expect(result[2].name).toBe('hulk');
            expect(result[3].name).toBe('Captain America');
        });

        // Test sorting by modified date ascending
        test('should sort by modified date ascending', () => {
            const result = getCharactersSorted('modified', 'asc');
            expect(result[0].name).toBe('Captain America'); // 2023-01-10
            expect(result[1].name).toBe('Spider-Man');      // 2023-01-15
            expect(result[2].name).toBe('Iron Man');        // 2023-02-20
            expect(result[3].name).toBe('hulk');            // 2023-03-05
        });

        // Test sorting by modified date descending
        test('should sort by modified date descending', () => {
            const result = getCharactersSorted('modified', 'desc');
            expect(result[0].name).toBe('hulk');            // 2023-03-05
            expect(result[1].name).toBe('Iron Man');        // 2023-02-20
            expect(result[2].name).toBe('Spider-Man');      // 2023-01-15
            expect(result[3].name).toBe('Captain America'); // 2023-01-10
        });

        // Test invalid sortBy parameter (should default to name)
        test('should default to name sorting when invalid sortBy is provided', () => {
            const result = getCharactersSorted('invalid', 'asc');
            expect(result[0].name).toBe('Captain America');
            expect(result[1].name).toBe('hulk');
            expect(result[2].name).toBe('Iron Man');
            expect(result[3].name).toBe('Spider-Man');
        });

        // Test invalid order parameter (should default to ascending)
        test('should default to ascending order when invalid order is provided', () => {
            const result = getCharactersSorted('name', 'invalid');
            expect(result[0].name).toBe('Captain America');
            expect(result[1].name).toBe('hulk');
            expect(result[2].name).toBe('Iron Man');
            expect(result[3].name).toBe('Spider-Man');
        });

        // Test that original array is not modified
        test('should not modify the original characters array', () => {
            const originalLength = characters.length;
            const originalFirstName = characters[0].name;
            
            getCharactersSorted('name', 'desc');
            
            expect(characters).toHaveLength(originalLength);
            expect(characters[0].name).toBe(originalFirstName);
        });

        // Test case insensitive sorting
        test('should sort names case insensitively', () => {
            const result = getCharactersSorted('name', 'asc');
            // 'hulk' (lowercase) should be sorted correctly among capitalized names
            const names = result.map(char => char.name);
            expect(names).toEqual(['Captain America', 'hulk', 'Iron Man', 'Spider-Man']);
        });

        // Test with no parameters
        test('should work with no parameters', () => {
            const result = getCharactersSorted();
            expect(result).toHaveLength(4);
            expect(result[0].name).toBe('Captain America');
        });

        // Test with only sortBy parameter
        test('should work with only sortBy parameter', () => {
            const result = getCharactersSorted('modified');
            expect(result[0].name).toBe('Captain America'); // Earliest date
            expect(result[3].name).toBe('hulk');            // Latest date
        });

        // Test return type
        test('should return an array', () => {
            const result = getCharactersSorted();
            expect(Array.isArray(result)).toBe(true);
        });

        // Test that all characters are included
        test('should include all characters in sorted result', () => {
            const result = getCharactersSorted();
            expect(result).toHaveLength(characters.length);
            
            characters.forEach(character => {
                expect(result).toContainEqual(character);
            });
        });
    });

    // Test for getCharacterById function
    describe('getCharacterById', () => {
        // Test to check if the function returns the correct character for a valid ID
        test('should return the correct character when a valid ID is provided', () => {
            const result = getCharacterById(1);
            expect(result).toEqual({ 
                id: 1, 
                name: 'Spider-Man', 
                modified: '2023-01-15T10:30:00Z' 
            });
        });

        // Test to check if the function returns undefined when no character is found with the provided ID
        test('should return undefined when no character is found with the provided ID', () => {
            const result = getCharacterById(999); // ID that doesn't exist in the mock data
            expect(result).toBeUndefined();
        });

        // Test to check if the function returns the second character
        test('should return Character Two when ID 2 is provided', () => {
            const result = getCharacterById(2);
            expect(result).toEqual({ 
                id: 2, 
                name: 'Iron Man', 
                modified: '2023-02-20T14:45:00Z' 
            });
        });

        // Test to check if the function handles null ID
        test('should return undefined when null ID is provided', () => {
            const result = getCharacterById(null);
            expect(result).toBeUndefined();
        });

        // Test to check if the function handles undefined ID
        test('should return undefined when undefined ID is provided', () => {
            const result = getCharacterById(undefined);
            expect(result).toBeUndefined();
        });

        // Test to check if the function handles string ID
        test('should return undefined when string ID is provided for numeric data', () => {
            const result = getCharacterById('1');
            expect(result).toBeUndefined();
        });

        // Test zero ID
        test('should handle zero ID correctly', () => {
            const result = getCharacterById(0);
            expect(result).toBeUndefined();
        });

        // Test negative ID
        test('should handle negative ID correctly', () => {
            const result = getCharacterById(-1);
            expect(result).toBeUndefined();
        });
    });

    // Additional utility tests
    describe('API Structure', () => {
        
        // Test to verify functions exist
        test('should export getCharacters function', () => {
            expect(typeof getCharacters).toBe('function');
        });

        test('should export getCharacterById function', () => {
            expect(typeof getCharacterById).toBe('function');
        });

        test('should export getCharactersSorted function', () => {
            expect(typeof getCharactersSorted).toBe('function');
        });

        // Test characters data structure
        test('characters should have required properties', () => {
            const result = getCharacters();
            if (result.length > 0) {
                expect(result[0]).toHaveProperty('id');
                expect(result[0]).toHaveProperty('name');
                expect(result[0]).toHaveProperty('modified');
            }
        });
    });

    // Performance tests
    describe('Performance', () => {
        
        test('getCharactersSorted should execute in reasonable time', () => {
            const start = performance.now();
            getCharactersSorted('name', 'asc');
            const end = performance.now();
            
            expect(end - start).toBeLessThan(10); // Should be very fast for small dataset
        });

        test('getCharacterById should execute in reasonable time', () => {
            const start = performance.now();
            getCharacterById(1);
            const end = performance.now();
            
            expect(end - start).toBeLessThan(5); // Should be very fast
        });
    });

    // Edge cases
    describe('Edge Cases', () => {
        
        test('getCharactersSorted should handle empty results gracefully', () => {
            // This would be relevant if characters array was empty
            expect(() => getCharactersSorted()).not.toThrow();
        });

        test('should handle extreme date values in modified field', () => {
            // Test with the current mock data - should not throw
            expect(() => getCharactersSorted('modified', 'asc')).not.toThrow();
            expect(() => getCharactersSorted('modified', 'desc')).not.toThrow();
        });

        test('should handle special characters in names correctly', () => {
            const result = getCharactersSorted('name', 'asc');
            expect(result).toHaveLength(4);
            // Should include all characters regardless of special characters
        });
    });

});