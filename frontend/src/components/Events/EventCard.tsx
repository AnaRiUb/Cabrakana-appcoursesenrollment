import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  image: string;
  onClick: () => void;
  event_id: string;
  user_id: string; 
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  location,
  lat,
  lng,
  image,
  onClick,
  event_id,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false); // Estado de seguimiento

  // Obtener el `user_id` del localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Leer el estado de seguimiento desde el localStorage al montar el componente
  useEffect(() => {
    const followStatus = localStorage.getItem(`follow_event_${event_id}`);
    if (followStatus === 'true') {
      setIsFollowing(true);
    }
  }, [event_id]);

  // Función para seguir/dejar de seguir el evento
  const handleFollowEvent = async () => {
    if (!userId) {
      alert("No estás autenticado.");
      return;
    }

    try {
    

      const response = await fetch(
      "http://localhost:4000/events/follow", {
        method: isFollowing ? "DELETE" : "POST", // DELETE para dejar de seguir, POST para seguir
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, event_id }),
      });

      if (response.ok) {
        const newState = !isFollowing;
        setIsFollowing(newState); // Alterna el estado
        
        // Guardar el estado en el localStorage
        localStorage.setItem(`follow_event_${event_id}`, newState ? 'true' : 'false');

        alert(
          newState
            ? "Has seguido el evento con éxito."
            : "Has dejado de seguir el evento."
        );
      } else {
        const data = await response.json();
        alert(data.message || "Ocurrió un error.");
      }
    } catch (error) {
      console.error("Error al gestionar el seguimiento del evento:", error);
      alert("Ocurrió un error al intentar gestionar el seguimiento.");
    }
  };

  
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15`;

  return (
    <div
      className="max-w-6xl mx-auto mt-4 gap-2 p-4 flex flex-col md:flex-row bg-white/75 border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      {/* Imagen */}
      <div className="py-4 md:w-1/3">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover p-2"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between p-4 md:w-1/3">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="mt-2 text-gray-700">{description}</p>
        <p className="mt-2 text-sm text-gray-600">Ubicación: {location}</p>

        {/* Botón de seguir el evento */}
        <button
          className="m-2 p-2 rounded-lg bg-pink-500/75 hover:bg-pink-500 text-white text-sm font-bold"
          onClick={(e) => {
            e.stopPropagation(); // Evitar activar el onClick del contenedor
            handleFollowEvent(); // Gestionar seguimiento del evento
          }}
        >
          {isFollowing ? "Dejar de seguir el evento" : "Seguir evento"}
        </button>
      </div>

      {/* Mapa */}
      <div className="flex flex-col items-center p-2 w-full md:w-1/3">
        <div className="w-full">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              center={{ lat, lng }}
              zoom={12}
              mapContainerStyle={{ width: "100%", height: "200px" }}
            >
              <MarkerF position={{ lat, lng }} />
            </GoogleMap>
          </LoadScript>
        </div>
        <button
          className="m-2 p-2 rounded-lg bg-pink-500/75 hover:bg-pink-500 text-white text-sm font-bold"
          onClick={(e) => {
            e.stopPropagation();
            window.open(googleMapsUrl, "_blank");
          }}
        >
          Ver ubicación en Google Maps
        </button>
      </div>
    </div>
  );
};

export default EventCard;
