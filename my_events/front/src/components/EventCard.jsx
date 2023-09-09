import React from 'react';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <figure>
        <img src={event.thumbnail} alt={event.title_fr} />
      </figure>
      <div className='event-details'>
        <a href={`/event/${event.uid}`}>
          <h2>{event.title_fr}</h2>
          <p>Date : {event.daterange_fr}</p>
          <p>Ville : {event.location_city}</p>
          {event.distance !== undefined && (
            <p>Distance: {event.distance.toFixed(2)} km</p>
          )}
          <p>Conditions : {event.conditions_fr}</p>
          <button>En savoir + </button>
        </a>
      </div>
    </div>
  );
}

export default EventCard;
