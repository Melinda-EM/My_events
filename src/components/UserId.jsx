const axios = require('axios');

const userToken = localStorage.getItem("access_token");
const apiKey = "42341e83d7ac";

const fetchUserId = async () => {
  try {
    const response = await axios.get(
      'https://api.betaseries.com/members/infos',
      {
        headers: {
          'X-BetaSeries-Key': apiKey,
          'X-BetaSeries-Token': userToken,
        },
      }
    );
    
    const userId = response.data.member.id;
    console.log('Votre ID utilisateur est :', userId);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ID utilisateur :', error);
  }
};

fetchUserId();