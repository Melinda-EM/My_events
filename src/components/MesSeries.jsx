import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

const MySeries = () => {
  const [series, setSeries] = useState([]);
  const userToken = localStorage.getItem("access_token");
  const apiKey = "42341e83d7ac";

  const MAX_DESCRIPTION_LENGTH = 150;

  useEffect(() => {
    const fetchUserSeries = async () => {
      try {
        const response = await axios.get(
          "https://api.betaseries.com/shows/member",
          {
            headers: {
              "X-BetaSeries-Key": apiKey,
              "X-BetaSeries-Token": userToken,
            },
          }
        );
        setSeries(response.data.shows);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des séries de l'utilisateur :",
          error
        );
      }
    };

    fetchUserSeries();
  }, [userToken]);

  return (
    <div>
      <div className="border-x-[40px] cursor-kernel border-black relative">  
        <div
          className="absolute inset-0 bg-film filter blur-xl"
          style={{ zIndex: -1, backgroundSize: "cover" }}
        ></div>
        <Header />
          <h1 className="font-play text-center text-purple text-4xl">Mes Séries</h1>
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-1 xl:grid-cols-4 xl:gap-x-8 backdrop-blur-xl">
            {series.length > 0 ? (
              <ul>
                {series.map((show) => (
                  <li key={show.id}>
                    <hr />
                    <div className="overflow-hidden rounded-lg bg-gray-200 bg-opacity-30 xl:aspect-h-8 xl:aspect-w-7 transition-transform hover:scale-105">
                      <img
                        src={show.images.poster}
                        style={{ width: "200px", height: "300px" }}
                        alt={show.title}
                      />    
                      <div className="flex flex-col ml-2">
                        <a className="cursor-popcorn mb-4 font-handjet text-3xl font-bold text-left" 
                          href={`/series/${show.id}`}>{show.title}</a>
                          <p className="mb-4">
                            {show.description.length > MAX_DESCRIPTION_LENGTH
                              ? `${show.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                              : show.description}
                          </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune série ajoutée.</p>
            )}
          </div>
      </div>
    </div>
  );
};

export default MySeries;