const CharacterDetail = ({ character }) => {
  if (!character) return <h2>Character not found</h2>;

  return (
    <div>
      <h2>{character.name}</h2>
      {character.image ? (
        <img src={character.image} alt={character.name} width="200" />
      ) : (
        <p>No image available</p>
      )}
      <p>{character.bio}</p> {/* <-- Corrige ici */}
    </div>
  );
};

export default CharacterDetail;