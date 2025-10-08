import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterDetail from './CharacterDetail';

describe('CharacterDetail', () => {
    const mockCharacter = {
        id: 1009610,
        name: 'Spider-Man',
        description: 'Bitten by a radioactive spider, Peter Parker\'s arachnid abilities give him amazing powers he uses to help others.',
        modified: '2016-09-28T12:18:40-0400',
        thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
            extension: 'jpg'
        }
    };

    test('should display character name in h2 heading', () => {
        render(<CharacterDetail character={mockCharacter} />);

        const heading = screen.getByRole('heading', { level: 2, name: 'Spider-Man' });
        expect(heading).toBeInTheDocument();
    });

    test('should display "Character not found" when character is null', () => {
        render(<CharacterDetail character={null} />);

        const heading = screen.getByRole('heading', { level: 2, name: 'Character not found' });
        expect(heading).toBeInTheDocument();
    });

    test('should display "Character not found" when character is undefined', () => {
        render(<CharacterDetail character={undefined} />);

        const heading = screen.getByRole('heading', { level: 2, name: 'Character not found' });
        expect(heading).toBeInTheDocument();
    });

    test('should display "No image available" when thumbnail is present', () => {
        render(<CharacterDetail character={mockCharacter} />);

        expect(screen.getByText('No image available')).toBeInTheDocument();
    });

    test('should display "No image available" when thumbnail is missing', () => {
        const characterWithoutImage = { ...mockCharacter, thumbnail: null };
        render(<CharacterDetail character={characterWithoutImage} />);

        expect(screen.getByText('No image available')).toBeInTheDocument();
    });

    test('should display character description when available', () => {
        render(<CharacterDetail character={mockCharacter} />);

        expect(screen.getByText(/Bitten by a radioactive spider/)).toBeInTheDocument();
    });

    test('should display empty paragraph when description is empty', () => {
        const characterWithoutDescription = { ...mockCharacter, description: '' };
        render(<CharacterDetail character={characterWithoutDescription} />);

        const paragraphs = screen.getAllByText('', { selector: 'p' });
        expect(paragraphs.length).toBeGreaterThan(0);
    });

    test('should display whitespace when description is only whitespace', () => {
        const characterWithWhitespaceDescription = { ...mockCharacter, description: '   ' };
        render(<CharacterDetail character={characterWithWhitespaceDescription} />);

        const whitespaceElement = screen.getByText(/\s+/);
        expect(whitespaceElement).toBeInTheDocument();
    });

    test('should handle character with different name correctly', () => {
        const ironMan = {
            ...mockCharacter,
            id: 1009368,
            name: 'Iron Man',
            description: 'Genius, billionaire, playboy, philanthropist'
        };

        render(<CharacterDetail character={ironMan} />);

        const heading = screen.getByRole('heading', { level: 2, name: 'Iron Man' });
        expect(heading).toBeInTheDocument();
        expect(screen.getByText(/Genius, billionaire, playboy/)).toBeInTheDocument();
    });

    test('should handle character with special characters in name', () => {
        const specialCharacter = {
            ...mockCharacter,
            name: 'Spider-Man (Peter Parker)'
        };

        render(<CharacterDetail character={specialCharacter} />);

        const heading = screen.getByRole('heading', { level: 2, name: 'Spider-Man (Peter Parker)' });
        expect(heading).toBeInTheDocument();
    });

    test('should render basic structure with character data', () => {
        render(<CharacterDetail character={mockCharacter} />);

        // Check that we have the expected elements
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
        
        // Check specific content is present
        expect(screen.getByText('No image available')).toBeInTheDocument();
        expect(screen.getByText(/Bitten by a radioactive spider/)).toBeInTheDocument();
    });

    test('should handle character without description gracefully', () => {
        const characterWithNoDescription = {
            id: 1009610,
            name: 'Spider-Man',
            thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
                extension: 'jpg'
            }
        };

        render(<CharacterDetail character={characterWithNoDescription} />);

        const heading = screen.getByRole('heading', { level: 2, name: 'Spider-Man' });
        expect(heading).toBeInTheDocument();
        expect(screen.getByText('No image available')).toBeInTheDocument();
    });
});