import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import characters from '../data/characters.json';
import NumberOfCharacters from '../components/NumberOfCharacters';

function CharactersPage() {
  useEffect(() => {
    document.title = 'Characters - Marvel App';
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Personnages Marvel</h1>
      <NumberOfCharacters characters={characters} />

      <ul className="mt-4 space-y-2">
        {characters.map((character) => (
          <li key={character.id}>
            <Link
              to={`/characters/${character.id}`} // navigation vers CharacterDetailPage
              className="text-blue-600 hover:underline"
            >
              {character.name} {character.alias ? `(${character.alias})` : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharactersPage;
