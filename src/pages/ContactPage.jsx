import React, { useEffect } from 'react';

function ContactPage() {
  useEffect(() => {
    document.title = 'Contact - Marvel App';
  }, []);

  return (
    <div>
      <h2>Contactez-nous</h2>
      <p>
        Pour toute question ou suggestion, vous pouvez nous écrire à
        {' '}
        <a href="mailto:contact@marvelapp.com">contact@marvelapp.com</a>.
      </p>
    </div>
  );
}

export default ContactPage;
