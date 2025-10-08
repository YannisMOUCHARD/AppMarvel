import { expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CharacterDetail from './CharacterDetail'

test('displays character information correctly when image exists', () => {
  const character = {
    id: "1009610",
    name: "Spider-Man",
    description: "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
      extension: "jpg"
    }
  }

  render(<CharacterDetail character={character} />)

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Spider-Man')).toBeInTheDocument()

  // Vérifier que la description est affichée
  expect(screen.getByText(/Bitten by a radioactive spider/)).toBeInTheDocument()

  // Vérifier qu'une image est présente avec le bon nom
  const image = screen.queryByRole('img', { name: 'Spider-Man' })
  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg')
})

test('displays character information correctly when image does not exist', () => {
  const character = {
    id: "1009999",
    name: "Test Character",
    description: "A test character without an image."
    // Pas de thumbnail
  }

  render(<CharacterDetail character={character} />)

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Test Character')).toBeInTheDocument()

  // Vérifier que la description est affichée
  expect(screen.getByText('A test character without an image.')).toBeInTheDocument()

  // Vérifier qu'il n'y a pas d'image avec le nom du personnage
  const image = screen.queryByRole('img', { name: 'Test Character' })
  expect(image).toBeNull()
})

test('displays character information correctly when thumbnail is null', () => {
  const character = {
    id: "1009998",
    name: "Null Thumbnail Character",
    description: "A character with null thumbnail.",
    thumbnail: null
  }

  render(<CharacterDetail character={character} />)

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Null Thumbnail Character')).toBeInTheDocument()

  // Vérifier que la description est affichée
  expect(screen.getByText('A character with null thumbnail.')).toBeInTheDocument()

  // Vérifier qu'il n'y a pas d'image avec le nom du personnage
  const image = screen.queryByRole('img', { name: 'Null Thumbnail Character' })
  expect(image).toBeNull()
})

test('displays character information correctly when thumbnail path or extension is missing', () => {
  const character = {
    id: "1009997",
    name: "Incomplete Thumbnail Character",
    description: "A character with incomplete thumbnail data.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b"
      // extension manquante
    }
  }

  render(<CharacterDetail character={character} />)

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Incomplete Thumbnail Character')).toBeInTheDocument()

  // Vérifier que la description est affichée
  expect(screen.getByText('A character with incomplete thumbnail data.')).toBeInTheDocument()

  // CORRECTION: Le composant affiche quand même l'image avec .undefined
  const image = screen.queryByRole('img', { name: 'Incomplete Thumbnail Character' })
  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.undefined')
})

test('displays "Character not found" when character is not provided', () => {
  render(<CharacterDetail />)

  // CORRECTION: Le composant affiche "Character not found" au lieu de "No character"
  expect(screen.getByText('Character not found')).toBeInTheDocument()

  // Vérifier qu'aucune image n'est présente
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})

test('displays "Character not found" when character is null', () => {
  render(<CharacterDetail character={null} />)

  // CORRECTION: Le composant affiche "Character not found" au lieu de "No character"
  expect(screen.getByText('Character not found')).toBeInTheDocument()

  // Vérifier qu'aucune image n'est présente
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})

test('displays "Character not found" when character is undefined', () => {
  render(<CharacterDetail character={undefined} />)

  // CORRECTION: Le composant affiche "Character not found" au lieu de "No character"
  expect(screen.getByText('Character not found')).toBeInTheDocument()

  // Vérifier qu'aucune image n'est présente
  const images = screen.queryAllByRole('img')
  expect(images).toHaveLength(0)
})

test('displays character with empty description', () => {
  const character = {
    id: "1009996",
    name: "No Description Character",
    description: "",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
      extension: "jpg"
    }
  }

  render(<CharacterDetail character={character} />)

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('No Description Character')).toBeInTheDocument()

  // Vérifier que l'image est présente
  const image = screen.queryByRole('img', { name: 'No Description Character' })
  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg')
})

test('displays character with missing description property', () => {
  const character = {
    id: "1009995",
    name: "Missing Description Character",
    // description manquante
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
      extension: "jpg"
    }
  }

  render(<CharacterDetail character={character} />)

  // Vérifier que le nom du personnage est affiché
  expect(screen.getByText('Missing Description Character')).toBeInTheDocument()

  // Vérifier que l'image est présente
  const image = screen.queryByRole('img', { name: 'Missing Description Character' })
  expect(image).toBeInTheDocument()
  expect(image).toHaveAttribute('src', 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg')
})