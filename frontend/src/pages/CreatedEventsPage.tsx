import React, { useState } from "react";
import MyCreatedEventButton from "../components/Events/MyCreatedEventButton";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  location: string;
  lat: number;
  lng: number;
}


const CreatedEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Hackathon de Tecnología",
      description: "Un evento para desarrolladores y entusiastas de la tecnología.",
      date: "2024-12-15",
      image: "https://via.placeholder.com/150", // Imagen de ejemplo
      location: "Madrid, España",
      lat: 40.4168,
      lng: -3.7038,
    },
    {
      id: "2",
      title: "Festival de Cine",
      description: "Disfruta de las mejores películas en este festival único.",
      date: "2025-01-10",
      image: "https://via.placeholder.com/150", // Imagen de ejemplo
      location: "Barcelona, España",
      lat: 41.3784,
      lng: 2.1915,
    },
  ]);

  const addNewEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mis eventos</h1>
        <MyCreatedEventButton onCreate={function (event: { id: string; title: string; description: string; date: string; image: string; location: string; }): void {
          throw new Error("Function not implemented.");
        } } />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Eventos que estás organizando</h2>
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
              >
                <div className="flex space-x-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-sm text-gray-500">Fecha: {event.date}</p>
                    <p className="text-sm text-gray-600">Ubicación: {event.location}</p>
                    <div style={{ width: "100%", height: "150px" }}>
                      {/* Mapa de Google Maps dentro de la tarjeta */}
                      <LoadScript googleMapsApiKey="AIzaSyA6Rat4XB1qcltaTLlea57pEQA8whd-hUU">
                        <GoogleMap
                          center={{ lat: event.lat, lng: event.lng }}
                          zoom={12}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                        >
                          <Marker position={{ lat: event.lat, lng: event.lng }} />
                        </GoogleMap>
                      </LoadScript>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No estás organizando ningún evento actualmente.</p>
        )}
      </div>
    </div>
  );
};

export default CreatedEventsPage;
