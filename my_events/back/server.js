require('dotenv').config();
const { connectDb } = require('./config');
const express = require('express');
const axios = require('axios');
const app = express();
const UserRoutes = require('./routes/userRoutes');
const port = process.env.PORT || 4000;
connectDb().catch(err => console.log(err));
const UserModel = require('./models/userModel');


app.use(express.json()); 

app.use(UserRoutes);

app.get('/api/events', async (req, res) => {
  const { latitude, longitude, offset } = req.query;
  console.log('latitude :', latitude);
  console.log('longitude :', longitude);
  console.log('offset :', offset);

  try {
    const mylocaresponse = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const location = mylocaresponse.data.display_name;
    const city = mylocaresponse.data.address.town;
    console.log('city :', city);

    const eventsResponse = await axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=100&offset=${offset}`
    );
    const events = eventsResponse.data.results;


    const nearbyEvents = events.filter(event => {
        if (event.location_coordinates && event.location_coordinates.lat && event.location_coordinates.lon) {
            
            console.log('event :', event.title_fr);
            const eventlat = event.location_coordinates.lat;
            console.log('eventlat :', eventlat);
            const eventlon = event.location_coordinates.lon;
            console.log('eventlon :', eventlon);
            const distance = calculateDistance(latitude, longitude, eventlat, eventlon);
            console.log('distance :', distance);
            return distance <= 30; 
          }
          return false;
    });

    const eventsWithDistance = nearbyEvents.map(event => ({
      ...event,
      distance: calculateDistance(latitude, longitude, event.location_coordinates.lat, event.location_coordinates.lon),
    }));

    
    eventsWithDistance.sort((a, b) => a.distance - b.distance);

    const response = {
      city: city,
      events: eventsWithDistance,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

});


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; 
  return distance;
}


function degToRad(deg) {
  return deg * (Math.PI / 180);
}

app.get('/api/events-by-filtre', async (req, res) => {
  const { searchKeywords , searchType, searchValue, offset } = req.query;
  console.log('searchKeywords :', searchKeywords);
  console.log('searchType :', searchType);
  console.log('searchValue :', searchValue);
  console.log('offset :', offset);

  try {
    
   
    const startIndex = parseInt(offset, 10) || 0; 
    
   
    let apiUrl = '';
    
    if (searchKeywords) {
      
      apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=keywords_fr%20like%20'${searchKeywords}'&limit=100&offset=${startIndex}`;
      console.log('apiUrl searchKey :', apiUrl);
    } else if (searchType && searchValue) {
    
      apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=${searchType}%20like%20'${searchValue}'&limit=100&offset=${startIndex}`;
      console.log('apiUrl Type :', apiUrl);
    } else {
      
      res.status(400).json({ message: 'Paramètres de recherche invalides' });
      return;
    }

    const eventsResponse = await axios.get(apiUrl);
    const events = eventsResponse.data.results;
 
    
    res.json(events);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

});

app.get('/api/event/:uid', async (req, res) => {

    const { uid } = req.params;

    try {
      const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=uid%3D${uid}`);
      const eventDetails = response.data;
      res.json(eventDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new UserModel(userData);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
});


async function main() {
  await connectDb();
  app.listen(port, () => {
    console.log(`Le serveur est lancé a http://localhost:${port}`);
  });
}

main().catch((err) => console.log(err));