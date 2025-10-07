import { useLoaderData } from 'react-router-dom'
import { useEffect } from 'react'
import CharactersList from '../components/CharactersList'
import NumberOfCharacters from '../components/NumberOfCharacters'
import { getCharacters } from '../api/characters-api'

// Fonction loader pour React Router
export async function loader() {
  const characters = await getCharacters()
  return characters
}

function CharactersPage() {
  const data = useLoaderData()
  
  // Gérer le cas où le test passe un objet { characters: [...] }
  // et le cas où l'API retourne directement le tableau
  const characters = data && data.characters ? data.characters : (Array.isArray(data) ? data : [])
  
  // Définir le titre du document comme attendu par le test
  useEffect(() => {
    document.title = 'Characters | Marvel App'
  }, [])

  console.log('Characters in page:', characters)

  return (
    <>
      <h2>Marvel Characters</h2>
      <NumberOfCharacters characters={characters} />
      <CharactersList characters={characters} />
    </>
  )
}

export default CharactersPage