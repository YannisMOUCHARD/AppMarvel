import { useLoaderData } from 'react-router-dom'
import CharactersList from '../components/CharactersList'
import NumberOfCharacters from '../components/NumberOfCharacters'

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