// src/components/NumberOfCharacters.jsx 

/**
 * NumberOfCharacters component
 * @param {*} Array of characters, default is an empty array
 * @returns 
 */
export default function NumberOfCharacters({ characters = [] }) {
    // If no characters are provided or the array is empty
    if (characters.length === 0) {
      return <p>There is no character</p>;
    }

    // If there is exactly one character
    if (characters.length === 1) {
      return <p>There is 1 character</p>;
    }

    // If there are multiple characters
    return <p>There are {characters.length} characters</p>;
}