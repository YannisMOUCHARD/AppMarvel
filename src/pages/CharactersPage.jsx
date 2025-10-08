import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import CharactersList from '../components/CharactersList'
import NumberOfCharacters from '../components/NumberOfCharacters'
import SortControls from '../components/SortControls'
import { getCharactersSorted } from '../api/characters-api'

// Fonction loader pour React Router
export async function loader({ request }) {
  const url = new URL(request.url);
  const sortBy = url.searchParams.get('sortBy') || 'name';
  const order = url.searchParams.get('order') || 'asc';
  
  const characters = await getCharactersSorted(sortBy, order);
  return characters;
}

function CharactersPage() {
  const data = useLoaderData()
  const [searchParams] = useSearchParams()
  
  // Gérer le cas où le test passe un objet { characters: [...] }
  // et le cas où l'API retourne directement le tableau
  const characters = data && data.characters ? data.characters : (Array.isArray(data) ? data : [])
  
  // Définir le titre du document comme attendu par le test
  useEffect(() => {
    document.title = 'Characters | Marvel App'
  }, [])

  // Obtenir les paramètres de tri pour les afficher
  const sortBy = searchParams.get('sortBy') || 'name';
  const order = searchParams.get('order') || 'asc';

  console.log('Characters in page:', characters)
  console.log('Sort parameters:', { sortBy, order })

  return (
    <>
      <h2>Marvel Characters</h2>
      <SortControls />
      <NumberOfCharacters characters={characters} />
      <CharactersList characters={characters} />
    </>
  )
}

export default CharactersPage