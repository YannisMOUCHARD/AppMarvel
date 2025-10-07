// src/pages/CharactersPage.test.jsx

import { expect, test, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CharactersPage from './CharactersPage'

// Mock useLoaderData to return our test data
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => [
    { id: "1", name: "Thor" },
    { id: "2", name: "Captain America" }
  ]
}));

// Mock data for characters
const characters = [
    {
        id: "1",
        name: "Thor"
    },
    {
        id: "2",
        name: "Captain America"
    }
];

test('render CharactersPage component', async () => {
    // Render the CharactersPage component within a simple routing context
    render(
        <BrowserRouter>
            <CharactersPage />
        </BrowserRouter>
    )

    // Wait for the heading to appear to ensure routing/render updates are settled
    const heading = await screen.findByRole('heading', { level: 1, name: 'Liste des personnages' })
    expect(heading).toBeInTheDocument()

    // expect the character Thor to be in the document
    const thorElement = screen.getByText(characters[0].name);
    expect(thorElement).toBeInTheDocument();

    // expect the charater Captain America to be in the document
    const captainAmericaElement = screen.getByText(characters[1].name);
    expect(captainAmericaElement).toBeInTheDocument();
    
    // expect the number of characters to be in the document
    const numberOfCharactersElement = screen.getByText(`There are ${characters.length} characters`);
    expect(numberOfCharactersElement).toBeInTheDocument();

    // uncomment to see the full DOM output
    // screen.debug()
})
