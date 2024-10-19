import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [blocked, setBlocked] = useState([]);

  const userToken = localStorage.getItem("access_token");
  const apiKey = "42341e83d7ac";

  useEffect(() => {
    const fetchFriendsList = async () => {
      try {
        const response = await axios.get(
          "https://api.betaseries.com/friends/list",
          {
            headers: {
              "X-BetaSeries-Token": userToken,
              "X-BetaSeries-Key": apiKey,
            },
          }
        );
        setFriends(response.data.users);
        console.log("Liste d'amis :", response.data.users);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la liste d'amis :",
          error
        );
      }
    };

    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.betaseries.com/friends/list",
          {
            params: {
              blocked: true,
            },
            headers: {
              "X-BetaSeries-Key": apiKey,
              "X-BetaSeries-Token": userToken,
            },
          }
        );

        const blockedUsers = response.data.users || [];
        setBlocked(blockedUsers);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la liste des personnes bloquées :",
          error
        );
      }
    };

    fetchFriendsList();
    fetchBlockedUsers();
  }, [userToken]);

  const blockFriend = async (friendId) => {
    try {
      await axios.post(
        "https://api.betaseries.com/friends/block",
        {
          id: friendId,
        },
        {
          headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Token": userToken,
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors du blocage de l'ami :", error);
    }
  };

  const deleteFriend = async (friendId) => {
    try {
      await axios.delete(
        `https://api.betaseries.com/friends/friend?id=${friendId}`,
        {
          headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Token": userToken,
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ami :", error);
    }
  };

  return (
    <div className="border-x-[40px] h-screen cursor-kernel border-black text-white">
      
      <div
        className="absolute inset-0 bg-film filter blur-xl"
        style={{ zIndex: -1, backgroundSize: "cover" }}
      ></div>
      <Header />
      <div className="text-center mt-8 mr-96 ml-96 mb-10 p-4 rounded-lg bg-gray-600 bg-opacity-70">
      <h1 className="font-play text-purple text-3xl mt-5">Liste d'Amis</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} className="font-libre text-purple mr-5">
            <a href={`/profil/${friend.id}`} className="cursor-popcorn text-cobalt text-xl font-libre hover:underline" >
              {friend.login}
            <button className="cursor-popcorn text-white bg-purplize font-medium rounded-md text-sm mr-5 ml-5 mt-2 px-5 py-2.5 group relative" onClick={() => blockFriend(friend.id)}>Bloquer</button>
            <button className="cursor-popcorn text-white bg-purplize font-medium rounded-md text-sm px-5 py-2.5 group relative" onClick={() => deleteFriend(friend.id)}>Supprimer</button>
          </a>
          </li>
        ))}
      </ul>

      <h1 className="font-play text-red text-3xl mt-7">Personnes Bloquées</h1>
      {blocked.length > 0 ? (
        <ul>
          {blocked.map((user) => (
            <li key={user.id}>{user.login}</li>
          ))}
        </ul>
      ) : (
        <p className="text-dark-gray text-md mt-2 font-normal">Aucune personne bloquée.</p>
      )}
    </div>
    </div>
  );
};

export default FriendsList;