import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

const SerieDetails = () => {
  const { id } = useParams();
  const userToken = localStorage.getItem("access_token");
  const apiKey = "42341e83d7ac";

  const [serie, setSerie] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [viewedEpisodes, setViewedEpisodes] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [archived, setArchived] = useState(false);
 

  useEffect(() => {
    const apiKey = "42341e83d7ac";

    axios
      .get(`https://api.betaseries.com/shows/display?id=${id}`, {
        headers: {
          "X-BetaSeries-Key": apiKey,
        },
      })
      .then((response) => {
        setSerie(response.data.show);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de la série :",
          error
        );
      });
  }, [id]);

  useEffect(() => {
    if (serie) {
      axios
        .get(`https://api.betaseries.com/shows/seasons?id=${serie.id}`, {
          headers: {
            "X-BetaSeries-Key": "42341e83d7ac",
            "X-BetaSeries-Token": userToken,
          },
        })
        .then((response) => {
          setSeasons(response.data.seasons);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des saisons de la série :",
            error
          );
        });
    }
  }, [serie, userToken]);

  const handleSeasonSelect = async (seasonNumber) => {
    if (serie) {
      try {
        const response = await axios.get(
          `https://api.betaseries.com/shows/episodes?id=${serie.id}&season=${seasonNumber}`,
          {
            headers: {
              "X-BetaSeries-Key": "42341e83d7ac",
              "X-BetaSeries-Token": userToken,
            },
          }
        );

        const seasonEpisodes = response.data.episodes;
        const seenEpisodes = seasonEpisodes.filter(
          (episode) => episode.user.seen
        );

        setEpisodes(seasonEpisodes);
        setViewedEpisodes(seenEpisodes);
        setSelectedSeason(seasonNumber);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des épisodes de la saison :",
          error
        );
      }
    }
  };

  const handleEpisodeView = async (episodeId, isSeen) => {
    try {
      await axios.post(
        "https://api.betaseries.com/episodes/watched",
        {
          id: episodeId,
          bulk: true,
          delete: !isSeen,
        },
        {
          headers: {
            "X-BetaSeries-Key": "42341e83d7ac",
            "X-BetaSeries-Token": userToken,
          },
        }
      );

      setEpisodes((prevEpisodes) => {
        return prevEpisodes.map((ep) => {
          if (ep.id === episodeId) {
            return { ...ep, user: { ...ep.user, seen: !isSeen } };
          }
          return ep;
        });
      });

      setViewedEpisodes((prevViewedEpisodes) => {
        if (isSeen) {
          return prevViewedEpisodes.filter(
            (episode) => episode.id !== episodeId
          );
        } else {
          return [
            ...prevViewedEpisodes,
            episodes.find((ep) => ep.id === episodeId),
          ];
        }
      });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'état de l'épisode :",
        error
      );
    }
  };

  const handleMarkEpisodeAsSeen = async (episodeId) => {
    try {
      await axios.delete(
        `https://api.betaseries.com/episodes/watched?id=${episodeId}`,
        {
          headers: {
            "X-BetaSeries-Key": "42341e83d7ac",
            "X-BetaSeries-Token": userToken,
          },
        }
      );

      setEpisodes((prevEpisodes) => {
        return prevEpisodes.map((ep) => {
          if (ep.id === episodeId) {
            return { ...ep, user: { ...ep.user, seen: false } };
          }
          return ep;
        });
      });

      setViewedEpisodes((prevViewedEpisodes) => {
        return prevViewedEpisodes.filter((episode) => episode.id !== episodeId);
      });

      console.log("Épisode marqué comme non vu :", episodeId);
    } catch (error) {
      console.error(
        "Erreur lors du marquage de l'épisode comme non vu :",
        error
      );
    }
  };

  const handleRateEpisode = async (episodeId, rating) => {
    try {
      await axios.post(
        "https://api.betaseries.com/episodes/note",
        {
          id: episodeId,
          note: rating,
        },
        {
          headers: {
            "X-BetaSeries-Key": "42341e83d7ac",
            "X-BetaSeries-Token": userToken,
          },
        }
      );
      console.log("Note de l'épisode", episodeId, ":", rating);
    } catch (error) {
      console.error("Erreur lors de la notation de l'épisode :", error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (episodeId) => {
    try {
      const response = await axios.post(
        "https://api.betaseries.com/comments/comment",
        {
          type: "show",
          id: episodeId,
          text: newComment,
        },
        {
          headers: {
            "X-BetaSeries-Key": "42341e83d7ac",
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

  const toggleArchived = () => {
    setArchived(!archived);
    // Vous pouvez également ajouter ici la logique pour envoyer cette information au serveur si nécessaire.
  };

  if (!serie) {
    return <div>Chargement en cours...</div>;
  }

  return (
   
      <div className="border-x-[40px] cursor-kernel border-black relative">
        <div
          className="absolute inset-0 bg-film filter blur-xl"
          style={{ zIndex: -1, backgroundSize: "contain" }}
        ></div>
          <Header />
          <div className="p-4">
            <h1 className="mb-4 text-3xl text-purple font-bold text-center">{serie.title}</h1>
            <div className="flex justify-center backdrop-blur-xl pt-6 pb-6 ml-20 mr-20">
            <div className="overflow-hidden w-64 h-64 ">
              <img
                src={serie.images.poster}
                alt={serie.title}
                className="object-cover w-full h-full"
              />
            </div>    

          </div>
            <h2 className="mb-4 text-3xl text-cobalt font-bold text-center">Saisons</h2>
            <button
              className='cursor-popcorn bg-purplize text-white py-2 px-4 rounded-md mb-5'
              onClick={toggleArchived}
            >
              {archived ? 'Déarchiver' : 'Archiver la série'}
            </button>
            <ul>
              {seasons.map((season) => (
                <li key={season.number}>
                  <button
                    className="cursor-popcorn bg-purplize text-white py-2 px-4 rounded-md"
                    onClick={() => handleSeasonSelect(season.number)}
                  >
                    Saison {season.number}
                  </button>
                </li>
              ))}
            </ul>

          {selectedSeason && (
            <div>
              <h2 className="text-2xl font-libre text-black font-bold mt-5">Épisodes de la Saison {selectedSeason}</h2>
              <ul className="grid grid-cols-3 gap-5">
                {episodes.map((episode) => (
                  <div className="mt-2" key={episode.id}>
                    <img
                      src={`https://api.betaseries.com/pictures/episodes?id=${episode.id}&key=${apiKey}`}
                      alt={episode.title}
                      style={{ width: "150px", height: "200px" }}
                    />
                    <a href={`/episode/${episode.id}`} className="cursor-popcorn text-white hover:underline">
                      {episode.title}
                    </a>
                    <p>{episode.length}</p>

                    <button
                      className="cursor-popcorn bg-validate text-white py-2 px-4 rounded-md mt-2 ml-4 mb-3"
                      onClick={() => handleEpisodeView(episode.id, episode.user.seen)}
                    >
                      {episode.user.seen ? "Déjà vu" : "Marquer comme vu"}
                    </button>
                    {/* <button
                      className="bg-purplize text-white py-2 px-4 rounded-md ml-2"
                      onClick={() => handleRateEpisode(episode.id)}
                    >
                      Noter
                    </button> */}
                    <hr />
                    <div className="text-white">
                      Note :{" "}
                      {episode.note && episode.note.user ? (
                        <span>{episode.note.user.toFixed(2)}/5</span>
                      ) : (
                        <span className="text-white mr-2">Aucune note</span>
                      )}
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="cursor-popcorn mt-2 mb-2 bg-yellow-300 text-gray-800 py-1 px-2 rounded-md ml-2"
                          onClick={() => handleRateEpisode(episode.id, rating)}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>

                    <hr />

                    <ul>
                      {comments.map((comment) => (
                        <li key={comment.id}>
                          <div>{comment.text}</div>
                          <div>Par {comment.login}</div>
                          <div>Le {comment.date}</div>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-cobalt text-xl font-bold mt-2">Ajouter un commentaire</h2>
                    <textarea
                      rows="4"
                      cols="50"
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Écrivez votre commentaire ici..."
                      className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 mt-2"
                    />
                    <button
                      className="cursor-popcorn bg-purplize mb-6 text-white py-2 px-4 rounded-md mt-2"
                      onClick={() => handleCommentSubmit(episode.id)}
                    >
                      Ajouter le commentaire
                    </button>
                    <hr />
                  </div>
                ))}
              </ul>
            </div>
          )}

            <h2 className="mt-3 text-2xl text-red font-libre font-bold">Épisodes déjà vus</h2>
            <ul className="grid grid-cols-3 gap-5 text-white">
              {viewedEpisodes.map((episode) => (
                <li key={episode.id}>
                  {episode.title}
                  <img
                      src={`https://api.betaseries.com/pictures/episodes?id=${episode.id}&key=${apiKey}`}
                      alt={episode.title}
                      style={{ width: "150px", height: "200px" }}
                      className="mt-4 mb-4"
                  />
                  <button
                    className="bg-redish cursor-popcorn text-white py-2 px-4 rounded-md mb-5"
                    onClick={() => handleMarkEpisodeAsSeen(episode.id)}
                  >
                    Marquer comme non vu
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

  );
};

export default SerieDetails;
