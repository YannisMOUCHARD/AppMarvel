import { getCharacterById } from "../api/characters-api";
import { useLoaderData } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";


const CharacterDetailPage = () => {
  const character = useLoaderData();
  console.log("Character:", character); // Ajoute ceci

  document.title = character?.name
    ? `${character.name} | Marvel App`
    : "Character Not Found | Marvel App";

  return <CharacterDetail character={character} />;
};

// Loader pour récupérer le personnage par id
export async function loader({ params }) {
  const { id } = params;
  return getCharacterById(id);
}

export default CharacterDetailPage;
