import React from 'react';
import GenericPage from '../../components/GenericPage';

const ISTE = () => {
  return (
    <GenericPage title="ISTE">
      <p>Indian Society for Technical Education student chapter.</p>
      <a
        href="https://www.ssgmce.ac.in/iste"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Visit Official Page
      </a>
    </GenericPage>
  );
};

export default ISTE;
