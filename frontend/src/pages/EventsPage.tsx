import React, { useState, useEffect } from "react";
import EventCard from "../components/Events/EventCard";
import { Link } from "react-router-dom";
import MyFollowEventsButton from "../components/Events/MyFollowEventsButton";
import EventSearch from "../components/Events/EventSearch";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Array<any>>([]); 
  const [filteredEvents, setFilteredEvents] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/events"); 
        if (!response.ok) {
          throw new Error("Error al obtener eventos");
        }
        const data = await response.json();
        setEvents(data); 
        setFilteredEvents(data); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredEvents(events); 
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleEventClick = (eventId: string) => {
    console.log(`Event card clicked! ID: ${eventId}`);
  };

  return (
    <div>
      <div className="flex justify-center gap-4">

        <EventSearch onSearch={handleSearch} />

        <Link to="/created-events">
          <button className="bg-white hover:bg-white/75 rounded-lg p-2 py-4 w-20% max-w-sm min-w-[20px]  text-xs font-bold shadow-md text-pink-500">
            Mis eventos
          </button>
        </Link>

        <MyFollowEventsButton />

      </div>

      <div className="p-4 m-2 flex flex-col justify-center gap-4">
    

        {loading ? (
          <p>Cargando eventos...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : filteredEvents.length === 0 ? (
          <p>No hay eventos disponibles</p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
            key={event.event_id}
            title={event.title}
            description={event.description}
            date={event.event_date}
            image={
              event.event_image_url && event.event_image_url.trim() !== ""
                ? event.event_image_url
                : "https://res.cloudinary.com/dyg2tq33j/image/upload/v1733848850/rst60fffxxulup7su3o1.png"
            }
            location={event.location}
            lat={event.latitude}
            lng={event.longitude}
            onClick={() => handleEventClick(event.event_id)} 
            event_id={event.event_id} 
            user_id={event.created_by} 
          />
          ))
        )}
      </div>
    </div>
  );
};

export default EventPage;
