import { useLoaderData } from "react-router-dom";
import { getCharacters } from "../api/characters-api";
import CharactersList from "../components/CharactersList";

const CharactersPage = () => {
  const characters = useLoaderData();
  console.log("Characters in page:", characters);

  if (!characters || characters.length === 0) {
    return <p>Aucun personnage trouvé.</p>;
  }

  return (
    <div>
      <h1>Liste des personnages</h1>
      <CharactersList characters={characters} />
    </div>
  );
};

// Le loader doit être SYNCHRONE si getCharacters() retourne un tableau
export function loader() {
  return getCharacters();
}

export default CharactersPage;