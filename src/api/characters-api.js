// ...existing code...
import characters from '../data/characters.json'

/**
 * returns the list of characters
 * @returns 
 */
export const getCharacters = () => {
  return characters;
}

/**
 * returns the list of characters sorted by field and order
 * @param {string} sortBy - 'name' or 'modified'
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} sorted characters
 */
export const getCharactersSorted = (sortBy = 'name', order = 'asc') => {
  const sortedCharacters = [...characters].sort((a, b) => {
    let valueA, valueB;
    
    if (sortBy === 'name') {
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
    } else if (sortBy === 'modified') {
      valueA = new Date(a.modified);
      valueB = new Date(b.modified);
    } else {
      // Default to name if invalid sortBy
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
    }
    
    if (order === 'desc') {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }
  });
  
  return sortedCharacters;
}

/**
 * returns a character by id
 * @param {*} id 
 * @returns 
 */
export const getCharacterById = (id) => {
  return characters.find(character => character.id === id);
}