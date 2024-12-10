import React, { useState, useEffect } from "react";
import EventCard from "../components/Events/EventCard";
import { Link } from "react-router-dom";
import MyFollowEventsButton from "../components/Events/MyFollowEventsButton";
import EventSearch from "../components/Events/EventSearch";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Array<any>>([]); // Estado para almacenar eventos
  const [filteredEvents, setFilteredEvents] = useState<Array<any>>([]); // Estado para almacenar eventos filtrados
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
        setFilteredEvents(data); // Inicializar los eventos filtrados con todos los eventos
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Ejecutar una vez al montar el componente

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredEvents(events); // Si el término de búsqueda está vacío, restaurar todos los eventos
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered); // Filtrar eventos según el término de búsqueda
    }
  };

  const handleEventClick = (eventId: string) => {
    console.log(`Event card clicked! ID: ${eventId}`);
  };

  return (
    <div>
      <div className="p-4 m-2 flex justify-center gap-4">
        <EventSearch onSearch={handleSearch} />

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
        ) : filteredEvents.length === 0 ? (
          <p>No hay eventos disponibles</p>
        ) : (
          filteredEvents.map((event) => (
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
              user_id={event.created_by}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventPage;
