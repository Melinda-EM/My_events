import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

const EpisodeDetail = () => {
  const { id } = useParams();
  const userToken = localStorage.getItem("access_token");
  const apiKey = "42341e83d7ac";

  const [episode, setEpisode] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.betaseries.com/episodes/display?id=${id}`, {
        headers: {
          "X-BetaSeries-Key": apiKey,
          "X-BetaSeries-Token": userToken,  
        },
      })
      .then((response) => {
        setEpisode(response.data.episode);
        console.log("setEpisode",response.data.episode);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'épisode :",
          error
        );
      });
  }, [id, userToken]);

  useEffect(() => {
    if (episode) {
      axios
        .get(`https://api.betaseries.com/comments/comments`, {
          params: {
            type: "episode",
            id: episode.id,
            order: "desc", 
          },
          headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Token": userToken,
          },
        })
        .then((response) => {
          setComments(response.data.comments);
          console.log("setComments", response.data.comments);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des commentaires de l'épisode :",
            error
          );
        });
    }
  }, [episode, userToken]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.betaseries.com/comments/comment",
        {
          type: "episode",
          id: episode.id,
          text: newComment,
        },
        {
          headers: {
            "X-BetaSeries-Key": apiKey,
            "X-BetaSeries-Token": userToken,
          },
        }
      );

      const newCommentData = response.data.comment;

      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment("");

      console.log("Commentaire ajouté :", newCommentData);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  if (!episode) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="border-x-[40px] cursor-kernel border-black text-white relative">
      
    <div
      className="absolute inset-0 bg-film filter blur-xl"
      style={{ zIndex: -1, backgroundSize: "contain" }}
    ></div>
    <Header />
      <h1 className="mb-4 text-3xl text-purple font-bold text-center">Détails de l'épisode</h1>
      <h2 className="mb-4 text-2xl text-cobalt font-bold text-center">{episode.title}</h2>
      
      <div className="flex justify-center backdrop-blur-xl">
      <div className="overflow-hidden w-64 h-64 ">
      <img
        src={`https://api.betaseries.com/pictures/episodes?id=${episode.id}&key=${apiKey}`}
        alt={episode.title}
        className="object-cover w-full h-full"
      />
      </div>
      </div>

      <div className="font-outfit text-center mt-2 text-xl mb-5">
        <p className="font-bold">Description : {episode.description}</p>
        <p>Date de diffusion : {episode.date}</p>
        <p>Réalisateur : {episode.director}</p>
        <p>Note : {episode.note.mean}</p>
      </div>
    <hr />
      <div className="text-center">   
        <h2 className="mb-4 text-2xl text-cobalt font-bold text-center">
          Commentaires</h2>
        <ul className="border border-black">
          {comments.map((comment) => (
            <li key={comment.id}>
              <hr />
              <div className="font-outfit text-1xl text-violet-500 font-bold">{comment.text}</div>
              <div className="font-handjet text-xl font-bold"><h3>Par {comment.login}</h3></div>
              <div className="font-libre text-md text-blue">Le {comment.date}</div>
            </li>
          ))}
          
        </ul>
      </div>
      <hr />
      <div className="text-center">
        <h2 className="mb-4 text-2xl text-cobalt font-bold text-center">Ajouter un commentaire</h2>
        <textarea
          rows="4"
          cols="50"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Écrivez votre commentaire ici..."
          className="text-black"
        />
        <button
          onClick={() => handleCommentSubmit(episode.id)}
         className="cursor-popcorn bg-purplize text-white py-2 px-4 rounded-md ml-2 mb-10">Ajouter le commentaire</button>
      </div>
    </div>
  );
};

export default EpisodeDetail;
