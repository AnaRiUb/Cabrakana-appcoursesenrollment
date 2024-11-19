import React from 'react';
import './EventsPage.css';
import EventCard from '../components/Events/EventCard';
import MyCreatedEventButton from '../components/Events/MyCreatedEventButton';
import MyFollowEventsButton from '../components/Events/MyFollowEventsButton';

const EventPage: React.FC = () => {
  // Definición de la función `handleEventClick`
  const handleEventClick = () => {
    console.log("Event card clicked!");
  };

  return (
    <div>
      <h1>Event Page</h1>
      <MyCreatedEventButton />
      <MyFollowEventsButton />
      {/* Ejemplo de uso de EventCard */}
      <EventCard
        title="Sample Event"
        date="2023-12-01"
        description="This is a sample event description."
        onClick={handleEventClick} // Ahora `handleEventClick` está definido
      />
      
    </div>

  );
};

export default EventPage;
