import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import '../index.css';

const MemberDetails = () => {
  const [memberInfo, setMemberInfo] = useState(null);
  const { id } = useParams();
  const userToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const apiKey = "42341e83d7ac";

  useEffect(() => {
    const fetchMemberInfo = async () => {
      let memberId = id;
      if (id === "me") {
        memberId = userId;
      }
      try {
        const response = await axios.get(
          `https://api.betaseries.com/members/infos?id=${memberId}`,
          {
            headers: {
              "X-BetaSeries-Key": apiKey,
              "X-BetaSeries-Token": userToken,
            },
          }
        );
        setMemberInfo(response.data.member);
        console.log("info", response.data.member);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations du membre :",
          error
        );
      }
    };
  
    fetchMemberInfo();
  }, [id, userToken]);

  const handleAddFriend = async () => {
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

  if (!memberInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-x-[40px] h-screen cursor-kernel border-black text-white">
      
      <div
        className="absolute inset-0 bg-film filter blur-xl"
        style={{ zIndex: -1, backgroundSize: "contain" }}
      ></div>
        <Header />
      {memberInfo.profile_banner ? (
      <img src={memberInfo.profile_banner} alt={memberInfo.login} className="w-full h-64 object-cover" />
    ) : (
      <img src={require('../assets/stitch.jpg')} alt="Bannière par défaut" className="w-full h-64 object-cover" />
    )}
      <div className="mt-8 mr-96 ml-96 mb-10 p-4 bg-gray-600 bg-opacity-70 rounded-lg flex flex-col shadow-lg text-center justify-center">
        <h1 className="font-play text-purple text-3xl">Informations sur {memberInfo.login}</h1>
        {memberInfo.avatar ? (
        <img src={memberInfo.avatar} alt={memberInfo.login} className="w-18 h-18 rounded-full mx-auto mt-4 border-solid border-white border-2" />
      ) : (
        <img src={require('../assets/avatar.jpg')} alt="Avatar par défaut" className="w-18 h-18 rounded-full mx-auto mt-4 border-solid border-white" />
      )}
        <p className="text-xl mt-2">XP: {memberInfo.xp}</p>
        <p className="text-xl">Badges: {memberInfo.badges}</p>
        <p className="text-xl">Pays: {memberInfo.country}</p>
        <p className="text-xl">Langue: {memberInfo.language}</p>
        <p className="text-xl">Statut: {memberInfo.is_private ? "Privé" : "Public"}</p>
        {id !== "me" && (
          <button
            onClick={handleAddFriend}
            className="cursor-popcorn mt-4 px-4 py-2 bg-purple-600 text-white border border-red-600 rounded-lg"
          >
            Ajouter en ami
          </button>
        )}
      </div>
    </div>
  );
} 

export default MemberDetails;