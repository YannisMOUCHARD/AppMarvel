import { expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import CharactersList from './CharactersList'

// Wrapper pour React Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

test('renders CharactersList component with empty list when no characters provided', () => {
  // Render le composant sans passer de personnages
  render(
    <RouterWrapper>
      <CharactersList />
    </RouterWrapper>
  )

  // Vérifier qu'une liste est présente
  const list = screen.getByRole('list')
  expect(list).toBeInTheDocument()

  // Vérifier que la liste est vide
  expect(list).toBeEmptyDOMElement()
})

test('renders CharactersList component with empty list when empty array provided', () => {
  // Render le composant avec un tableau vide
  render(
    <RouterWrapper>
      <CharactersList characters={[]} />
    </RouterWrapper>
  )

  // Vérifier qu'une liste est présente
  const list = screen.getByRole('list')
  expect(list).toBeInTheDocument()

  // Vérifier que la liste est vide
  expect(list).toBeEmptyDOMElement()
})

test('renders CharactersList component with characters when provided', () => {
  const mockCharacters = [
    {
      id: "1",
      name: "Beast",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3",
        extension: "jpg"
      }
    },
    {
      id: "2", 
      name: "Captain America",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087",
        extension: "jpg"
      }
    }
  ]

  // Render le composant avec des personnages
  render(
    <RouterWrapper>
      <CharactersList characters={mockCharacters} />
    </RouterWrapper>
  )

  // Vérifier qu'une liste est présente
  const list = screen.getByRole('list')
  expect(list).toBeInTheDocument()

  // Vérifier que la liste n'est pas vide
  expect(list).not.toBeEmptyDOMElement()

  // Vérifier que les personnages sont affichés
  expect(screen.getByText('Beast')).toBeInTheDocument()
  expect(screen.getByText('Captain America')).toBeInTheDocument()

  // Vérifier qu'il y a 2 éléments de liste
  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(2)

  // Vérifier que les images sont présentes
  const images = screen.getAllByRole('img')
  expect(images).toHaveLength(2)
  expect(images[0]).toHaveAttribute('alt', 'Beast')
  expect(images[1]).toHaveAttribute('alt', 'Captain America')
  
  // Vérifier les sources des images
  expect(images[0]).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3.jpg')
  expect(images[1]).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg')
})

test('renders CharactersList with correct links to character details', () => {
  const mockCharacters = [
    {
      id: "1009351",
      name: "Hulk",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0",
        extension: "jpg"
      }
    }
  ]

  render(
    <RouterWrapper>
      <CharactersList characters={mockCharacters} />
    </RouterWrapper>
  )

  // Vérifier que le lien vers la page de détail est correct
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', '/characters/1009351')
  
  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Hulk')).toBeInTheDocument()
  
  // Vérifier que l'image est présente avec les bons attributs
  const image = screen.getByRole('img')
  expect(image).toHaveAttribute('alt', 'Hulk')
  expect(image).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0.jpg')
})

test('renders multiple characters with correct individual links', () => {
  const mockCharacters = [
    {
      id: "1009175",
      name: "Beast",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3",
        extension: "jpg"
      }
    },
    {
      id: "1009220",
      name: "Captain America",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087",
        extension: "jpg"
      }
    }
  ]

  render(
    <RouterWrapper>
      <CharactersList characters={mockCharacters} />
    </RouterWrapper>
  )

  // Vérifier que tous les liens sont corrects
  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(2)
  expect(links[0]).toHaveAttribute('href', '/characters/1009175')
  expect(links[1]).toHaveAttribute('href', '/characters/1009220')
})

test('displays all characters correctly with MemoryRouter', () => {
  const characters = [
    {
      id: "1009175",
      name: "Beast",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/2/80/511a79a0451a3",
        extension: "jpg"
      }
    },
    {
      id: "1009220", 
      name: "Captain America",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087",
        extension: "jpg"
      }
    },
    {
      id: "1009268",
      name: "Deadpool",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/9/90/5261a86cacb99",
        extension: "jpg"
      }
    },
    {
      id: "1009351",
      name: "Hulk",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0",
        extension: "jpg"
      }
    }
  ]

  // Render le composant avec MemoryRouter comme spécifié
  render(
    <MemoryRouter>
      <CharactersList characters={characters}/>
    </MemoryRouter>
  )

  // Vérifier que tous les éléments de la liste sont présents
  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(4)

  // Vérifier que chaque personnage est affiché par son texte
  expect(screen.getByText('Beast')).toBeInTheDocument()
  expect(screen.getByText('Captain America')).toBeInTheDocument()
  expect(screen.getByText('Deadpool')).toBeInTheDocument()
  expect(screen.getByText('Hulk')).toBeInTheDocument()

  // Vérifier que toutes les images sont présentes
  const images = screen.getAllByRole('img')
  expect(images).toHaveLength(4)

  // Vérifier les attributs alt de chaque image
  expect(screen.getByAltText('Beast')).toBeInTheDocument()
  expect(screen.getByAltText('Captain America')).toBeInTheDocument()
  expect(screen.getByAltText('Deadpool')).toBeInTheDocument()
  expect(screen.getByAltText('Hulk')).toBeInTheDocument()

  // Vérifier que tous les liens sont présents
  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(4)

  // Vérifier que chaque lien pointe vers la bonne URL
  expect(links[0]).toHaveAttribute('href', '/characters/1009175')
  expect(links[1]).toHaveAttribute('href', '/characters/1009220')
  expect(links[2]).toHaveAttribute('href', '/characters/1009268')
  expect(links[3]).toHaveAttribute('href', '/characters/1009351')
})

test('displays character information correctly when image exists', () => {
  const characters = [
    {
      id: "1009610",
      name: "Spider-Man",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
        extension: "jpg"
      }
    }
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters}/>
    </MemoryRouter>
  )

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Spider-Man')).toBeInTheDocument()

  // Vérifier qu'une image est présente quand thumbnail existe
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(1)
  expect(images[0]).toHaveAttribute('alt', 'Spider-Man')
  expect(images[0]).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg')
})

test('displays character information correctly when image does not exist', () => {
  const characters = [
    {
      id: "1009999",
      name: "Test Character",
      // Pas de thumbnail
    }
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters}/>
    </MemoryRouter>
  )

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Test Character')).toBeInTheDocument()

  // Vérifier qu'il n'y a pas d'image quand thumbnail n'existe pas
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})

test('displays character information correctly when thumbnail is null', () => {
  const characters = [
    {
      id: "1009998",
      name: "Another Test Character",
      thumbnail: null
    }
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters}/>
    </MemoryRouter>
  )

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Another Test Character')).toBeInTheDocument()

  // Vérifier qu'il n'y a pas d'image quand thumbnail est null
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})

test('displays character information correctly when thumbnail path or extension is missing', () => {
  const characters = [
    {
      id: "1009997",
      name: "Incomplete Thumbnail Character",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b"
        // extension manquante
      }
    }
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters}/>
    </MemoryRouter>
  )

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Incomplete Thumbnail Character')).toBeInTheDocument()

  // Vérifier qu'il n'y a pas d'image quand l'extension est manquante
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})

test('displays character information correctly when thumbnail path is missing', () => {
  const characters = [
    {
      id: "1009996",
      name: "Missing Path Character",
      thumbnail: {
        // path manquant
        extension: "jpg"
      }
    }
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters}/>
    </MemoryRouter>
  )

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Missing Path Character')).toBeInTheDocument()

  // Vérifier qu'il n'y a pas d'image quand le path est manquant
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})

test('displays character information correctly when both path and extension are missing', () => {
  const characters = [
    {
      id: "1009995",
      name: "Empty Thumbnail Character",
      thumbnail: {
        // path et extension manquants
      }
    }
  ]

  render(
    <MemoryRouter>
      <CharactersList characters={characters}/>
    </MemoryRouter>
  )

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Empty Thumbnail Character')).toBeInTheDocument()

  // Vérifier qu'il n'y a pas d'image
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})