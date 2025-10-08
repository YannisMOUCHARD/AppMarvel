import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CharacterDetailPage from './CharacterDetailPage';

// Mock react-router-dom useParams and useLoaderData
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '456' }),
    useLoaderData: jest.fn()
}));

// Import the mocked version
import { useLoaderData } from 'react-router-dom';

describe('CharacterDetailPage', () => {
    beforeEach(() => {
        // Reset document title before each test
        document.title = '';
        // Clear all mocks
        jest.clearAllMocks();
    });

    test('should have correct page title', async () => {
        const mockCharacter = {
            id: 456,
            name: 'Captain America',
            description: 'First Avenger'
        };

        useLoaderData.mockReturnValue(mockCharacter);

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        await screen.findByRole('heading', { level: 2 });
        expect(document.title).toBe('Captain America | Marvel App');
    });

    test('should display character name in h2 heading', async () => {
        const mockCharacter = {
            id: 456,
            name: 'Thor',
            description: 'God of Thunder'
        };

        useLoaderData.mockReturnValue(mockCharacter);

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        const heading = await screen.findByRole('heading', { level: 2, name: 'Thor' });
        expect(heading).toBeInTheDocument();
    });

    test('should display character not found when character is null', () => {
        useLoaderData.mockReturnValue(null);

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        expect(screen.getByText('Character not found')).toBeInTheDocument();
    });

    test('should display error message when character not found', async () => {
        useLoaderData.mockReturnValue(undefined);

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        const errorMessage = await screen.findByText(/character not found/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('should have correct page title for different characters', async () => {
        const mockCharacter = {
            id: 789,
            name: 'Iron Man',
            description: 'Genius, billionaire, playboy, philanthropist'
        };

        useLoaderData.mockReturnValue(mockCharacter);

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        await screen.findByRole('heading', { level: 2, name: 'Iron Man' });
        expect(document.title).toBe('Iron Man | Marvel App');
    });

    test('should display character with special characters in name', async () => {
        const mockCharacter = {
            id: 999,
            name: 'Spider-Man (Peter Parker)',
            description: 'Your friendly neighborhood Spider-Man'
        };

        useLoaderData.mockReturnValue(mockCharacter);

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        const heading = await screen.findByRole('heading', { level: 2, name: 'Spider-Man (Peter Parker)' });
        expect(heading).toBeInTheDocument();
        expect(document.title).toBe('Spider-Man (Peter Parker) | Marvel App');
    });

    test('should handle empty character data gracefully', async () => {
        useLoaderData.mockReturnValue({});

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        // Should handle missing name gracefully - displays normal content with empty name
        expect(document.title).toBe('Character Not Found | Marvel App');
        
        // The component displays normal content even with empty character data
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument(); // Empty h2
        expect(screen.getByText('No image available')).toBeInTheDocument();
        expect(screen.getByText('No description available')).toBeInTheDocument();
        expect(screen.getByText('ID:')).toBeInTheDocument();
    });

    test('should display character description when available', async () => {
        const mockCharacter = {
            id: 123,
            name: 'Hulk',
            description: 'The incredible Hulk with superhuman strength'
        };

        useLoaderData.mockReturnValue(mockCharacter);

        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        expect(await screen.findByText(/The incredible Hulk/)).toBeInTheDocument();
    });
});