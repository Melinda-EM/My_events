import React from 'react';

const SerieDetails = ({ serie }) => {
  return (
    <div className="serie-details">
      <h2>{serie.title}</h2>
      <img src={serie.image} alt={serie.title} />
      <p>Nombre de saisons: {serie.seasons}</p>
      <p>Nombre d'épisodes: {serie.episodes}</p>
      <p>Durée des épisodes: {serie.duration}</p>
      <p>Note: {serie.rating}</p>
      <p>Résumé: {serie.summary}</p>
      <p>Genres: {serie.genres.join(', ')}</p>
      <button>Archiver la série</button>
    </div>
  );
};

export default SerieDetails;