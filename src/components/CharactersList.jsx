import React from "react";
import { Link } from "react-router-dom";

function CharactersList({ characters = [] }) {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <Link to={`/characters/${character.id}`}>
            <strong>{character.name}</strong>
            {character.alias && <> ({character.alias})</>}
          </Link>
          <br />
          {character.image && (
            <img src={character.image} alt={character.name} width={100} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default CharactersList;