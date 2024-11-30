import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  location: string; // Dirección del evento
  lat: number;  // Latitud
  lng: number;  // Longitud
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  location,
  lat,
  lng,
  onClick,
}) => {
  return (
    <div
      className="transform hover:scale-105 transition duration-300 forum-card bg-white/75 border rounded p-4 shadow-md"
      onClick={onClick}
    >
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="mt-2 text-gray-700">{description}</p>

      {/* Mostrar ubicación */}
      <p className="mt-2 text-sm text-gray-600">Ubicación: {location}</p>

      {/* Mapa de Google Maps dentro de la tarjeta */}
      <LoadScript googleMapsApiKey="AIzaSyA6Rat4XB1qcltaTLlea57pEQA8whd-hUU">
        <GoogleMap
          center={{ lat, lng }}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "150px" }}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default EventCard;
