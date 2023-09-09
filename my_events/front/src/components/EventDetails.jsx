import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../index.css';

function EventDetails() {
  const { uid } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  const removeHTMLTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  useEffect(() => {
    axios.get(`/api/event/${uid}`)
      .then(response => {
        console.log(response.data);
        setEventDetails(response.data.results);
        console.log(eventDetails);
      })
      .catch(error => {
        console.error(error);
      });
  }, [uid, eventDetails]);

  return (
    <>
    <Header />
    <div className="event-list">
        {Array.isArray(eventDetails) ? (
            eventDetails.map((eventDetail,index) => (
            <div key={eventDetail.id} className="event">
            <hr/>
            <img src={eventDetail.image} alt={eventDetail.title_fr} />
            <div>

                <h1>{eventDetail.title_fr}</h1>
                <h2>Description: {eventDetail.description_fr}</h2>
                <p className='description'>{removeHTMLTags(eventDetail.longdescription_fr)}</p>
                <h2>{eventDetail.conditions_fr}</h2>
                <div className='infos'>
                  <p>Date: {eventDetail.daterange_fr}</p>
                  <p>Adresse: {eventDetail.location_address}</p>
                  <p>Code postal: {eventDetail.location_postalcode}</p>
                  <p>Ville: {eventDetail.location_city}</p>
                </div>
            </div>
            </div>
        ))
        ) : (
            <p>Aucun événement disponible.</p>
        )}
    </div>
    </>
  );
}

export default EventDetails;
