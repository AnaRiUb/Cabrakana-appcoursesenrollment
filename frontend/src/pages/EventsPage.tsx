import React, { useState, useEffect } from "react";
import EventCard from "../components/Events/EventCard";
import { Link } from "react-router-dom";
import MyFollowEventsButton from "../components/Events/MyFollowEventsButton";
import EventSearch from "../components/Events/EventSearch";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Array<any>>([]); // Estado para almacenar eventos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Función para obtener eventos desde el API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/events"); // Cambia la URL por tu API
        if (!response.ok) {
          throw new Error("Error al obtener eventos");
        }
        const data = await response.json();
        setEvents(data); // Actualizar el estado con los datos del API
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Ejecutar una vez al montar el componente

  const handleEventClick = (eventId: string) => {
    console.log(`Event card clicked! ID: ${eventId}`);
  };

  return (
    <div>
      <div className="p-4 m-2 flex justify-center gap-4">
        <EventSearch
          onSearch={(searchTerm: string) => {
            console.log(`Search: ${searchTerm}`);
          }}
        />

        <Link to="/created-events">
          <button className="bg-white rounded-lg p-2 font-bold shadow-md text-pink-500">
            Mis eventos
          </button>
        </Link>
      </div>

      <div className="p-4 m-2 flex flex-col justify-center gap-4">
        <MyFollowEventsButton />

        {loading ? (
          <p>Cargando eventos...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : events.length === 0 ? (
          <p>No hay eventos disponibles</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.event_id}
              title={event.title}
              description={event.description}
              date={event.event_date}
              image={event.event_image_url}
              location={event.location}
              lat={event.latitude}
              lng={event.longitude}
              onClick={() => handleEventClick(event.event_id)} 
              event_id={event.event_id} 
              user_id={event.created_by}/>
          ))
        )}
      </div>
    </div>
  );
};

export default EventPage;
