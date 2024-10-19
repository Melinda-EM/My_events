import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

const FriendRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const userToken = localStorage.getItem("access_token");
  const apiKey = "42341e83d7ac";

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await axios.get(
          "https://api.betaseries.com/friends/requests",
          {
            params: {
              received: true,
            },
            headers: {
              "X-BetaSeries-Key": apiKey,
              "X-BetaSeries-Token": userToken,
            },
          }
        );
        setReceivedRequests(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes reçues :", error);
      }
    };

    
    const fetchSentRequests = async () => {
      try {
        const response = await axios.get(
          "https://api.betaseries.com/friends/requests",
          {
            headers: {
              "X-BetaSeries-Key": apiKey,
              "X-BetaSeries-Token": userToken,
            },
          }
        );
        setSentRequests(response.data.users);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes envoyées :", error);
      }
    };

    fetchReceivedRequests();
    fetchSentRequests();
  }, [userToken]);

  const handleAddFriend = async (id) => {
    try {
      await axios.post(
        "https://api.betaseries.com/friends/friend",
        { id: id },
        {
          headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Token": userToken,
          },
        }
      );
     
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'ami :", error);
    }
  };

  const handleRufFriend = async (id) => {
    try {
      await axios.delete(
        "https://api.betaseries.com/friends/friend",
        { id: id },
        {
          headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Token": userToken,
          },
        }
      );

    } catch (error) {
      console.error("Erreur lors de l'ajout de l'ami :", error);
    }
  };

  return (
    <div className="border-x-[40px] h-screen cursor-kernel border-black text-white">
      
      <div
        className="absolute inset-0 bg-film filter blur-xl"
        style={{ zIndex: -1, backgroundSize: "cover" }}
      ></div>
    <Header />
    <div className="text-center mt-8 mr-96 ml-96 mb-10 p-4 bg-gray-600 bg-opacity-70">
      <h1 className="font-play text-purple text-2xl mt-5">Demandes d'Amis Reçues</h1>
      {receivedRequests.length > 0 ? (
        <ul>
          {receivedRequests.map((request) => (
            <li key={request.id}>
              <a href={`/profil/${request.id}`} className="text-purple hover:underline">
                {request.login}
              </a>
              <button className="cursor-popcorn text-white bg-purplize font-medium rounded-lg text-md px-6 py-3.5 group relative" onClick={() => handleAddFriend(request.id)}>Accepter</button>{" "}
              <button className="cursor-popcorn text-white bg-purplize font-medium rounded-lg text-md px-6 py-3.5 group relative" onClick={() => handleRufFriend(request.id)}>Refuser</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-xl font-normal">Aucune demande d'amis reçue.</p>
      )}

      <h1 className="font-play text-purple text-2xl mt-5">Demandes d'Amis Envoyées</h1>
      {sentRequests.length > 0 ? (
        <ul>
          {sentRequests.map((request) => (
            <li key={request.id}>
              <a href={`/profil/${request.id}`} className="text-cobalt text-xl font-libre hover:underline">
                {request.login}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-dark-gray text-md font-normal">Aucune demande d'amis envoyée.</p>
      )}
    </div>
  </div>


  );
};

export default FriendRequests;