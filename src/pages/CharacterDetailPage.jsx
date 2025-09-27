import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import characters from '../data/characters.json';
import CharacterDetail from './CharacterDetail';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Recherche du personnage correspondant à l'id
  const character = characters.find(c => c.id === id);

  // On prend jusqu'à 4 autres personnages pour "personnages liés"
  const relatedCharacters = characters
    .filter(c => c.id !== id)
    .slice(0, 4);

  // Cas où le personnage n'est pas trouvé
  if (!character) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Personnage introuvable</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Retour
        </button>
      </div>
    );
  }

  return (
    <CharacterDetail
      character={character}
      relatedCharacters={relatedCharacters}
      onBack={() => navigate(-1)}
    />
  );
}
