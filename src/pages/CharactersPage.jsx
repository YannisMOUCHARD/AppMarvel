import React, { useEffect } from 'react';
import characters from '../data/characters.json';
import CharactersList from '../components/CharactersList';
import NumberOfCharacters from '../components/NumberOfCharacters';

function CharactersPage() {
  useEffect(() => {
    document.title = 'Characters - Marvel App';
  }, []);

  return (
    <div>
      <h1>Personnages Marvel</h1>
      <NumberOfCharacters characters={characters} />
      <CharactersList characters={characters} />
    </div>
  );
}

export default CharactersPage;
