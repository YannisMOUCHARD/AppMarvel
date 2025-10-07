import React from "react";
import { Link } from "react-router-dom";

function CharactersList({ characters = [] }) {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <Link to={`/characters/${character.id}`}>
            <strong>{character.name}</strong>
          </Link>
          <br />
          {character.thumbnail && (
            <img 
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name} 
              width={100} 
              style={{ marginTop: '10px', borderRadius: '5px' }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default CharactersList;