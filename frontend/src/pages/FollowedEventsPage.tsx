import React, { useEffect, useState } from "react";
import EventCard from "../components/Events/EventCard";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";


interface FollowedEvent {
  event_id: string;
  event: {
    title: string;
    description: string;
    event_date: string;
    event_image_url: string;
    location: string;
    latitude: string; 
    longitude: string; 
    created_by: string;
  };
}


const FollowedEventsPage: React.FC = () => {
  const [followedEvents, setFollowedEvents] = useState<FollowedEvent[]>([]);

  useEffect(() => {
    const fetchFollowedEvents = async () => {
      try {
        const userId = localStorage.getItem("user_id");

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

  const handleEventClick = (eventId: string) => {
    console.log(`Event card clicked! ID: ${eventId}`);
  };

  return (
    <div>
      <h1 className="text-lg text-center font-bold mb-4">Mis Eventos Seguidos</h1>
      {followedEvents.length > 0 ? (
        followedEvents.map((followedEvent) => {
          const e = followedEvent.event;

          const lat = parseFloat(e.latitude);
          const lng = parseFloat(e.longitude);

          // Lógica de imagen por defecto
          const imageUrl =
            e.event_image_url && e.event_image_url.trim() !== ""
              ? e.event_image_url
              : "https://res.cloudinary.com/dyg2tq33j/image/upload/v1733848850/rst60fffxxulup7su3o1.png";

          return (
            <EventCard
              key={followedEvent.event_id}
              title={e.title}
              description={e.description}
              date={e.event_date}
              image={imageUrl}
              location={e.location}
              lat={isNaN(lat) ? 0 : lat}  // Si lat no es un número, usa 0 para evitar errores
              lng={isNaN(lng) ? 0 : lng}  // Si lng no es un número, usa 0
              onClick={() => handleEventClick(followedEvent.event_id)}
              event_id={followedEvent.event_id}
              user_id={e.created_by}
            />
          );
        })
      ) : (
        <p>No has seguido ningún evento aún.</p>
      )}
    </div>
  );
};

export default FollowedEventsPage;
