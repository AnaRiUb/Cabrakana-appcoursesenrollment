import React, { useEffect, useState } from "react";
import MyCreatedEventButton from "../components/Events/MyCreatedEventButton";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

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
  const [events, setEvents] = useState<Event[]>([]);

  // Obtener el userId del localStorage, o un valor predeterminado si no existe
  const userId = localStorage.getItem("user_id") || ""; // Si no existe, usa una cadena vacía

  useEffect(() => {
    if (userId) { // Verifica que userId no sea vacío
      const fetchEvents = async () => {
        try {
          const response = await fetch(`http://localhost:4000/events/${userId}`);
          const data = await response.json();

          // Convertir latitud y longitud a números con parseFloat
          const parsedEvents = data.map((event: any) => ({
            ...event,
            lat: parseFloat(event.latitude),
            lng: parseFloat(event.longitude),
          }));

          setEvents(parsedEvents);
        } catch (error) {
          console.error("Error al obtener los eventos:", error);
        }
      };

      fetchEvents();
    } else {
      console.error("No se encontró el user_id en localStorage.");
    }
  }, [userId]); // Re-llamar a useEffect si userId cambia

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mis eventos</h1>
        <MyCreatedEventButton user_id={userId} onCreate={(newEvent) => setEvents((prev) => [...prev, newEvent])} />
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
                      <LoadScript googleMapsApiKey="AIzaSyA6Rat4XB1qcltaTLlea57pEQA8whd-hUU">
                        <GoogleMap
                          center={{ lat: event.lat, lng: event.lng }}
                          zoom={12}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                        >
                          <MarkerF position={{ lat: event.lat, lng: event.lng }} />
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