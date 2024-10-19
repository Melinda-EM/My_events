import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const SerieList = ({ userToken }) => {
  const [series, setSeries] = useState([]);
  const [addedSeries, setAddedSeries] = useState([]);
  const [limit] = useState(30); 
  const [offset, setOffset] = useState(0);

  const MAX_DESCRIPTION_LENGTH = 150;

  useEffect(() => {
    const userToken = localStorage.getItem('access_token');
  
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://api.betaseries.com/shows/discover', {
          params: {
            limit: limit,
            offset: offset,
          },
          headers: {
            'X-BetaSeries-Key': '42341e83d7ac', 
            'X-BetaSeries-Token': userToken, 
          },
        });

        setSeries(response.data.shows);
      } catch (error) {
        console.error('Erreur lors de la récupération des séries :', error);
      }
    };

    
    fetchSeries();
  }, [userToken, limit, offset]);

  const handleAddSerie = async (serieId) => {
    try {
      
      const userToken = localStorage.getItem('access_token');
      await axios.post(
        'https://api.betaseries.com/shows/show',
        { id: serieId },
        {
          headers: {
            'X-BetaSeries-Key': '42341e83d7ac', 
            'X-BetaSeries-Token': userToken,
          },
        }
      );
      console.log(`Série ajoutée avec succès : ${serieId}`);
     
      setAddedSeries([...addedSeries, serieId]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la série :', error);
    }
  };

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };


  return (
    <div className="border-x-[40px] cursor-kernel border-black relative">
      <div
      className="absolute inset-0 bg-film filter blur-xl"
      style={{ zIndex: -1, backgroundSize: "contain" }}
      ></div>

      <Header />
      <h1 className="font-play text-center text-purple text-4xl">
        Liste des Séries
      </h1>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 grid grid-cols-3 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 backdrop-blur-xl">
        {series.map((serie) => (
          <div key={serie.id} className="text-white">
            <a href={`/series/${serie.id}`}>
              <div className="cursor-popcorn aspect-h-1 aspect-w-1 w-cd overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 transition-transform hover:scale-105">
                <img
                  src={serie.images.poster}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  alt={serie.title}
                />
              </div>
            </a>

            <div className="mt-4">
              <h2 className="mb-4 font-handjet text-3xl font-bold text-center">
                {serie.title}
              </h2>
              <p className="mb-4">
                {serie.description.length > MAX_DESCRIPTION_LENGTH
                  ? `${serie.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                  : serie.description}
              </p>
              <p>Durée d'un épisode : {serie.length}</p>
              <p>Nombre d'épisodes : {serie.episodes}</p>
            </div>

            <div className="text-center mt-4 content-center">
              <button
                onClick={() => handleAddSerie(serie.id)}
                disabled={addedSeries.includes(serie.id)}
                className="cursor-popcorn text-white bg-purplize font-medium rounded-lg text-md px-6 py-3.5 group relative"
              >
                <span className="relative z-10">
                  {addedSeries.includes(serie.id) ? 'Ajoutée !' : '+'}
                </span>
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-center space-x-5 ml-[40rem] mt-10">
          <button
            className="cursor-popcorn text-white bg-purplize font-medium rounded-lg text-md px-6 py-3.5 group relative"
            onClick={() => handlePageChange(offset - 30)}
            disabled={offset === 0}
          >
            Précédent
          </button>
          <button
            className="cursor-popcorn text-white bg-purplize font-medium rounded-lg text-md px-6 py-3.5 group relative"
            onClick={() => handlePageChange(offset + 30)}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default SerieList;
