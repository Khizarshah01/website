import React from 'react';
import GenericPage from '../../components/GenericPage';

const SAE = () => {
  return (
    <GenericPage title="SAE Collegiate Club">
      <p>Society of Automotive Engineers student club.</p>
      <a
        href="https://www.ssgmce.ac.in/sae"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Visit Official Page
      </a>
    </GenericPage>
  );
};

export default SAE;
