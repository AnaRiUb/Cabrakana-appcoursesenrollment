import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
  user_id,
}) => {

  const handleFollowEvent = async () => {
    try {
      const response = await fetch("http://localhost:3000/events/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, event_id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Has seguido el evento con éxito.");
      } else {
        alert(data.message || "Error al seguir el evento.");
      }
    } catch (error) {
      console.error("Error al seguir el evento:", error);
      alert("Ocurrió un error al intentar seguir el evento.");
    }
  };

  const latitude = parseFloat(lat as any);
  const longitude = parseFloat(lng as any);

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;

  return (
    <div
      className="flex flex-col md:flex-row bg-white/75 border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
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
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="mt-2 text-gray-700">{description}</p>
          <p className="mt-2 text-sm text-gray-600">Ubicación: {location}</p>   
            <button
              className="m-2 p-2 rounded-lg bg-pink-500/75 hover:bg-pink-500 text-white text-sm font-bold"
              onClick={(e) => {
                e.stopPropagation();
                handleFollowEvent();
              }}> Seguir evento </button>

        </div>
      </div>

      {/* Mapa y botón */}
      <div className="flex flex-col items-center p-2 w-full md:w-1/3">
        <div className="w-full">
          <LoadScript googleMapsApiKey="AIzaSyA6Rat4XB1qcltaTLlea57pEQA8whd-hUU">
            <GoogleMap
              center={{ lat: latitude, lng: longitude }}
              zoom={12}
              mapContainerStyle={{ width: "100%", height: "200px" }}
            >
              <Marker position={{ lat: latitude, lng: longitude }} />
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
