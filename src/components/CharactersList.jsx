import React from "react";
import { Link } from "react-router-dom";

function CharactersList({ characters = [] }) {
  return (
    <div className="characters-container">
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <strong>{character.name}</strong>
              <br />
              {character.thumbnail && character.thumbnail.path && character.thumbnail.extension && (
                <img 
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name} 
                  width={100} 
                  style={{ marginTop: '10px', borderRadius: '5px' }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharactersList;