import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const apiKey = "42341e83d7ac";
  const userToken = localStorage.getItem("access_token");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://api.betaseries.com/members/search",
        {
          params: {
            login: searchQuery,
          },
          headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Token": userToken,
          },
        }
      );
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateurs :", error);
    }
  };

  return (
    <div className="border-x-[40px] h-screen cursor-kernel border-black text-black">
      
      <div
        className="absolute inset-0 bg-film filter blur-xl"
        style={{ zIndex: -1, backgroundSize: "cover" }}
      ></div>
      <Header />

      <div className="mt-8 mr-96 ml-96 mb-10 p-4 bg-gray-600 bg-opacity-70 rounded-lg flex flex-col shadow-lg text-center justify-center">
        <h1 className="font-play text-purple text-3xl">Rechercher un Utilisateur</h1>
        <input
          type="text"
          className="w-96 self-center p-2 border-black rounded focus:outline-none focus:ring focus:border-blue-500 mt-2"
          placeholder="Nom d'utilisateur"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="cursor-popcorn text-white bg-purplize w-60 flex self-center justify-center font-medium rounded-lg text-md px-3 py-2.5 mt-3"
          onClick={handleSearch}
        >
          Rechercher
        </button>

        <h2 className="font-play text-purple text-2xl mt-5">Résultats de la recherche</h2>
        {searchResults.length > 0 ? (
          <ul className="list-disc list-inside mt-2">
            {searchResults.map((user) => (
              <li key={user.id} className="mt-1">
                <a href={`/profil/${user.id}`} className="text-blue-500 hover:underline">
                  {user.login}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-xl font-normal">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>

  );
};

export default SearchUser;