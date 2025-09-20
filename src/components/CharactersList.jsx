import React from 'react';

function CharactersList({ characters = [] }) {
  const firstThree = characters.slice(0, 11);

  const listItems = firstThree.map((character) => (
    <li key={character.id}>{character.name}</li>
  ));

  return <ul>{listItems}</ul>;
}

export default CharactersList;
