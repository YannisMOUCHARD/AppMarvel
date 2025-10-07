const CharacterDetail = ({ character }) => {
  if (!character) return <h2>Character not found</h2>;

  // Construire l'URL de l'image en fusionnant path et extension
  const imageUrl = character.thumbnail 
    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
    : null;

  return (
    <div>
      <h2>{character.name}</h2>
      
      {imageUrl ? (
        <img 
          src={imageUrl}
          alt={character.name} 
          width="200" 
          style={{ borderRadius: '10px', marginBottom: '15px' }}
        />
      ) : (
        <p>No image available</p>
      )}

      {/* Description */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Description</h3>
        {character.description && character.description.trim() !== "" ? (
          <p style={{ fontSize: '1.1em', lineHeight: '1.5', color: '#333' }}>
            {character.description}
          </p>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#666' }}>
            No description available
          </p>
        )}
      </div>

      {/* Informations détaillées */}
      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#888' }}>
        <h3 style={{ color: '#333', fontSize: '1.1em' }}>Details</h3>
        <p><strong>ID:</strong> {character.id}</p>
        {character.modified && (
          <p><strong>Last modified:</strong> {new Date(character.modified).toLocaleDateString()}</p>
        )}
        {character.thumbnail && (
          <p><strong>Image URL:</strong> {character.thumbnail.path}.{character.thumbnail.extension}</p>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;