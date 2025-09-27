import React from "react";

export default function CharacterDetail({ character, relatedCharacters = [], onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Bouton Retour */}
        <div className="p-6 border-b">
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
          >
            ← Retour à la liste
          </button>
        </div>

        {/* Informations principales */}
        <div className="p-6 flex flex-col md:flex-row md:gap-6">
          {/* Colonne gauche */}
          <div className="md:w-1/3 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">{character?.name}</h2>
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              {character?.image ? (
                <img
                  src={new URL(character.image, import.meta.url).href}
                  alt={character.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500 text-sm">Image non disponible</span>
              )}
            </div>
            {character?.alias && <p className="text-gray-500">Vrai nom : {character.alias}</p>}
          </div>

          {/* Colonne droite */}
          <div className="md:w-2/3 mt-6 md:mt-0">
            <section>
              <h3 className="text-xl font-semibold">Biographie</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {character?.bio || "Aucune biographie disponible."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
