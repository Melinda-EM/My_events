import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useAuth0 } from "@auth0/auth0-react";
import Header from './Header';
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Profil = () => {
  const { user, isAuthenticated } = useAuth0();
  const [bio, setBio] = useState("");
  const [existingUser, setExistingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserToDatabase = async (userData) => {
    try {
      const response = await axios.post('/api/users', userData);
      console.log('Utilisateur enregistré dans la base de données :', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    }
  };

  useEffect(() => {
    const fetchExistingUser = async () => {
      try {
        const response = await axios.get(`/api/users/${user?.sub}`);
        setExistingUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    };

    if (isAuthenticated) {
      fetchExistingUser();
    }
  }, [isAuthenticated, user]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSaveBio = () => {
    if (isAuthenticated) {
      const userData = {
        email: user?.email,
        email_verified: user?.email_verified,
        family_name: user?.family_name,
        given_name: user?.given_name,
        locale: user?.locale,
        name: user?.name,
        nickname: user?.nickname,
        picture: user?.picture,
        sub: user?.sub,
        updated_at: user?.updated_at,
        bio: bio,
      };

      if (!existingUser) {
        saveUserToDatabase(userData);
      } else {
        console.log('L\'utilisateur existe déjà dans la base de données :', existingUser);
       
        axios.put(`/api/users/${user?.sub}`, userData)
          .then(response => {
            console.log('Utilisateur mis à jour dans la base de données :', response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
          });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Remplacez '/api/users' par l'URL correcte pour obtenir la bio de l'utilisateur
      axios.get(`/api/users/${user?.sub}`) 
        .then(response => {
          setBio(response.data.bio);
          setLoading(false); 
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de la bio :', error);
          setLoading(false); 
        });
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <Header />
      <Logout />
      <h2>Profil</h2>
      <div>
        {isAuthenticated && (
          <article className="column">
            {user?.picture && <img src={user.picture} alt={user?.name} />}
            <h2>{user?.name}</h2>
            <h2>{user?.nickname}</h2>
            <p>Email: {user?.email}</p>
          </article>
        )}
        <textarea
          className='bio'
          placeholder="Entrez votre présentation ici"
          value={bio}
          onChange={handleBioChange}
        />
        <button onClick={handleSaveBio}>Enregistrer la présentation</button>
        {loading ? (
          <p>Chargement de la bio...</p>
        ) : (
          <div>
            <h3>Votre présentation :</h3>
            <p>{bio}</p>
          </div>
        )}
        <h1>Liste des sorties</h1>
        <Link to="./sortie">
          Sortie
        </Link>
        <p>Sortie + image + nombre de participants</p>
      </div>
    </>
  );
}

export default Profil;
