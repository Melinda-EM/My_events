import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './EventList';
import Header from './Header';

function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState(''); // Par défaut, recherche par ville
  const [offset, setOffset] = useState(0); // Offset initial

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      axios
        .get(`/api/events?latitude=${latitude}&longitude=${longitude}&offset=${offset}`)
        .then(response => {
          setCity(response.data.city);
          setEvents(response.data.events);
          // console.log('====================================');
          // console.log('response.data.events :', response.data.events);
          // console.log('====================================');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [latitude, longitude, offset]);

  const handleSearch = () => {
    setOffset(0); // Réinitialiser l'offset à 0 lors de la nouvelle recherche
    axios
      .get(`/api/events-by-filtre?searchKeywords=${searchKeywords}&searchType=${searchType}&searchValue=${searchValue}&offset=${offset}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlePageChange = newOffset => {
    // Calculer le nouvel offset en fonction de la page sélectionnée
    const newPageOffset = newOffset;
    setOffset(newPageOffset);
    
    axios
      .get(`/api/events-by-filtre?searchKeywords=${searchKeywords}&searchType=${searchType}&searchValue=${searchValue}&offset=${newPageOffset}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
    <Header />
    <div className="App">
      <div className='title'>
      <h1>Événements à venir près de chez vous</h1>
      <p>Votre ville géolocalisée : {city}</p>
     </div>
      <div className='container'>
      
      <form className='left-column'>
      <select className='small' value={searchKeywords} onChange={e => setSearchKeywords(e.target.value)}>
        <option value="" disabled>Catégorie</option>
        <option value="concert">Concert</option>
        <option value="musique">Musique</option>
        <option value="atelier">Atelier</option>
        <option value="exposition">Exposition</option>
        <option value="danse">Danse</option>
        <option value="nature">Nature</option>
        <option value="gratuit">Gratuit</option>
      </select>

      <select className='small' value={searchType} onChange={e => setSearchType(e.target.value)}>
        <option value="" disabled>Rechercher par</option>
        <option value="location_city">Ville</option>
        <option value="location_address">Adresse</option>
        <option value="location_postalCode">Code Postal</option>
      </select>

      <input
        type="text"
        className='small'
        placeholder={`Entrez ${searchType === 'address' ? 'une adresse' : searchType === 'postalCode' ? 'un code postal' : 'une ville'}`}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <button onClick={handleSearch}>Rechercher</button>
      </form>
      <div className='right-column'>
      <EventList events={events} />
      <div className="pagination">
        <button onClick={() => handlePageChange(offset - 100)} disabled={offset === 0}>
          Précédent
        </button>
        <button onClick={() => handlePageChange(offset + 100)}>Suivant</button>
      </div> 
      </div>
      </div>
    </div>
    </>
  );
}

export default Home;