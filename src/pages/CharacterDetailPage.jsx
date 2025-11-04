import { getCharacterById } from "../api/characters-api";
import { useLoaderData } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";
import D3RadarChart from "../components/D3PieChart";

const CharacterDetailPage = () => {
  const character = useLoaderData();
  console.log("Character:", character);

  document.title = character?.name
    ? `${character.name} | Marvel App`
    : "Character Not Found | Marvel App";

  const prepareCapacitiesData = (character) => {
    if (!character?.capacities) return [];
    
    return [
      { label: 'Force', value: character.capacities.force },
      { label: 'Intelligence', value: character.capacities.intelligence },
      { label: 'Durabilité', value: character.capacities.durability },
      { label: 'Énergie', value: character.capacities.energy },
      { label: 'Vitesse', value: character.capacities.speed },
      { label: 'Combat', value: character.capacities.fighting }
    ].filter(capacity => capacity.value > 0);
  };

  const capacitiesData = prepareCapacitiesData(character);

  return (
    <div>
      <CharacterDetail character={character} />
      
      {/* Diagramme de Kiviat des capacités */}
      {capacitiesData.length > 0 && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'transparent',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#fff' }}>
            Capacités de {character?.name}
          </h2>
          <D3RadarChart 
            data={capacitiesData} 
            width={500} 
            height={500} 
          />
        </div>
      )}

      {/* Composant Recharts à venir 
      <div style={{ marginTop: '2rem' }}>
        <h3>Graphique Recharts</h3>
        <RechartsPieChart data={capacitiesData} />
      </div>
      */}
    </div>
  );
};

// Loader pour récupérer le personnage par id
export async function loader({ params }) {
  const { id } = params;
  return getCharacterById(id);
}

export default CharacterDetailPage;