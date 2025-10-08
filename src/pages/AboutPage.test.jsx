import { expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AboutPage from './AboutPage'

test('renders AboutPage with correct title and heading', () => {
  render(<AboutPage />)

  // Vérifier que le titre de la page est correct
  expect(document.title).toBe('About - Marvel App')

  // Vérifier qu'il y a bien un élément h2 avec le texte attendu (CORRECTION: texte en anglais)
  expect(screen.getByRole('heading', { level: 2, name: 'About Marvel App' })).toBeInTheDocument()
})

test('renders AboutPage with correct content', () => {
  render(<AboutPage />)

  // Vérifier que le titre de la page est défini
  expect(document.title).toBeDefined()

  // Vérifier la présence du heading h2
  const heading = screen.getByRole('heading', { level: 2 })
  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent('About Marvel App')
})

test('sets correct document title on mount', () => {
  // Réinitialiser le titre avant le test
  document.title = 'Initial Title'
  
  render(<AboutPage />)

  // Vérifier que le titre a été modifié vers la valeur attendue
  expect(document.title).toBe('About - Marvel App')
  expect(document.title).toContain('About')
})

test('displays About heading with specific text', () => {
  render(<AboutPage />)

  // Test plus spécifique pour le heading h2 (CORRECTION: texte en anglais)
  expect(screen.getByRole('heading', { level: 2, name: 'About Marvel App' })).toBeInTheDocument()
})

test('renders AboutPage component without errors', () => {
  // Test de base pour s'assurer que le composant se rend sans erreur
  const { container } = render(<AboutPage />)
  expect(container).toBeInTheDocument()

  // Vérifier qu'au moins un heading h2 est présent
  const headings = screen.getAllByRole('heading', { level: 2 })
  expect(headings.length).toBeGreaterThan(0)
})

test('displays correct paragraph content', () => {
  render(<AboutPage />)

  // Vérifier que le contenu du paragraphe est présent (CORRECTION: texte en anglais)
  expect(screen.getByText(/This application presents a selection of characters/)).toBeInTheDocument()
  expect(screen.getByText(/It is developed with React and React Router/)).toBeInTheDocument()
})

test('renders complete page structure', () => {
  render(<AboutPage />)

  // Vérifier la structure complète
  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  expect(screen.getByText('About Marvel App')).toBeInTheDocument()
  
  // Vérifier que le paragraphe est présent
  const paragraph = screen.getByRole('paragraph')
  expect(paragraph).toBeInTheDocument()
})

test('displays full paragraph text', () => {
  render(<AboutPage />)

  // Test du texte complet du paragraphe
  expect(screen.getByText('This application presents a selection of characters from the Marvel universe. It is developed with React and React Router.')).toBeInTheDocument()
})

test('contains specific keywords in content', () => {
  render(<AboutPage />)

  // Vérifier la présence de mots-clés spécifiques
  expect(screen.getByText(/Marvel universe/)).toBeInTheDocument()
  expect(screen.getByText(/React/)).toBeInTheDocument()
  expect(screen.getByText(/React Router/)).toBeInTheDocument()
})