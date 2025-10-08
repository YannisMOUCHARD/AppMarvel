import React, { useEffect } from 'react';

function AboutPage() {
  useEffect(() => {
    document.title = 'About - Marvel App';
  }, []);

  return (
    <div>
      <h2>About Marvel App</h2>
      <p>
        This application presents a selection of characters from the Marvel universe.
        It is developed with React and React Router.
      </p>
    </div>
  );
}

export default AboutPage;