import { useLoaderData } from 'react-router-dom'
import CharactersList from '../components/CharactersList'
import NumberOfCharacters from '../components/NumberOfCharacters'
import { getCharacters } from '../api/characters-api'

// Fonction loader pour React Router
export async function loader() {
  const characters = await getCharacters()
  return characters
}

function CharactersPage() {
  const characters = useLoaderData()
  console.log('Characters in page:', characters)

  return (
    <div>
      <h1>Liste des personnages</h1>
      <NumberOfCharacters characters={characters} />
      <CharactersList characters={characters} />
    </div>
  )
}

export default CharactersPage