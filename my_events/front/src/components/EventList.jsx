import React from 'react';
import EventCard from './EventCard'; 

function EventList({ events }) {
  console.log('eventlist :', events);
  return (
    <section className="event-list">
      <article>
        {Array.isArray(events) && events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.uid} event={event} />
          ))
        ) : (
          <p>Aucun événement disponible.</p>
        )}
      </article>
    </section>
  );
}

export default EventList;
