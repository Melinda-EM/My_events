import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';


const AuthComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState('');


  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleTokenExchange(code);
    }
  }, []);

  const handleLogin = () => {
    const clientId = '42341e83d7ac';
    const redirectUri = 'http://localhost:3000/';
    const authorizationUrl = `https://www.betaseries.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authorizationUrl;
  };

  const handleTokenExchange = async (code) => {
    try {
     
      const clientId = '42341e83d7ac';
      const clientSecret = '63bdb5426730caea7f9521c004cf4e70';
      const redirectUri = 'http://localhost:3000/';

      const response = await axios.post('https://api.betaseries.com/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
      });

      
      const newAccessToken = response.data.access_token;

      setIsAuthenticated(true);
      setAccessToken(newAccessToken);
      localStorage.setItem('access_token', newAccessToken);
      window.location.href= 'http://localhost:3000/home';
      fetchUsername(newAccessToken);
    } catch (error) {
      console.error('Erreur lors de l\'échange du code d\'autorisation :', error);
    }
  };

  const fetchUsername = async (token) => {
    try {
      const response = await axios.get('https://api.betaseries.com/members/infos', {
        headers: {
          'X-BetaSeries-Token': token,
          'X-BetaSeries-Key': '42341e83d7ac',
        },
      });
      const user = response.data.member;
      const user_id = user.id;
      setUser(user_id);
      localStorage.setItem('user_id', user_id);
    } catch (error) {
      console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
    }
  };

  return (
    <>
      <div className="border-x-[40px] cursor-kernel border-black bg-film bg-no-repeat bg-cover h-screen w-screen flex justify-center items-center">
        <div className="w-full h-full flex flex-col items-center backdrop-blur-xl">
          <h1 className="text-[12rem] text-white font-play mt-16 mb-16 text-center">Previously On</h1>
          <div className='text-white text-center text-xl'>
            <p className='text-center text-3xl font-dancing text-bold mb-10'>
              Préparez-vous à entrer dans l'univers captivant des séries, un voyage enchanteur et addictif dont vous ne voudrez plus jamais revenir. 
              <br/>
              Une aventure remplie de suspens, de personnages inoubliables, d'émotions intenses vous attend.
              <br/> 
              Prêt à être emporter dans des mondes 
              extraordinaires et à vivre des histoires inoubliables ?</p>
          {isAuthenticated ? (
            <div>
              <p>Utilisateur authentifié avec succès!</p>
              <p>Token d'accès : {accessToken}</p>
              <p>Nom d'utilisateur : {user}</p>
            </div>
          ) : (
            <div>
              <p className="text-purple font-outfit font-extrabold">Appuyez sur le bouton ci-dessous pour vous connecter :</p>
              <button type="button" 
                className="text-white bg-purplize font-outfit rounded-lg text-md px-6 py-3.5 
                mt-12 cursor-popcorn" onClick={handleLogin}>
                  Se connecter avec BetaSeries
              </button>   
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
  
}

export default AuthComponent;
