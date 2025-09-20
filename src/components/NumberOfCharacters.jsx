import React from 'react';

function NumberOfCharacters({ characters = [] }) {
  const count = characters.length;

  return (
    <p>
      {count === 0
        ? 'There is no character'
        : `There is ${count} character${count > 1 ? 's' : ''}`}
    </p>
  );
}

export default NumberOfCharacters;
