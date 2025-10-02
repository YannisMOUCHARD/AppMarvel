import characters from "../data/characters.json";
console.log("Imported characters:", characters);

export function getCharacters() {
  return characters;
}

/**
 * Retourne un personnage par son identifiant
 * @param {number|string} id - identifiant du personnage
 * @returns {Object|null} Le personnage trouvé ou null si inexistant
 */
export function getCharacterById(id) {
  return characters.find((c) => String(c.id) === String(id)) || null;
}