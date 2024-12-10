import React, { useEffect, useState } from "react";

// Definir la interfaz para un evento seguido
interface FollowedEvent {
  event_id: string;
  event: {
    title: string;
    description: string;
    event_date: string;
  };
}

const FollowedEventsPage: React.FC = () => {
  // Especificar que followedEvents es un arreglo de objetos FollowedEvent
  const [followedEvents, setFollowedEvents] = useState<FollowedEvent[]>([]);

  useEffect(() => {
    const fetchFollowedEvents = async () => {
      try {
        const userId = localStorage.getItem("user_id"); // Suponiendo que tienes el userId guardado

        const response = await fetch(`http://localhost:4000/events/followed/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los eventos seguidos");
        }
        const data = await response.json();
        setFollowedEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFollowedEvents();
  }, []);

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Mis Eventos Seguidos</h1>
      {followedEvents.length > 0 ? (
        followedEvents.map((event) => (
          <div key={event.event_id} className="border rounded-lg p-4 mb-4">
            <h2 className="text-md font-bold">{event.event.title}</h2>
            <p>{event.event.description}</p>
            <p>{event.event.event_date}</p>
          </div>
        ))
      ) : (
        <p>No has seguido ningún evento aún.</p>
      )}
    </div>
  );
};

export default FollowedEventsPage;
