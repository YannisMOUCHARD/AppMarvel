import React, { useEffect } from 'react';

function AboutPage() {
  useEffect(() => {
    document.title = 'About - Marvel App';
  }, []);

  return (
    <div>
      <h2>À propos de l’application Marvel</h2>
      <p>
        Cette application présente une sélection de personnages issus de l’univers Marvel.
        Elle est développée avec React et React Router.
      </p>
    </div>
  );
}

export default AboutPage;
