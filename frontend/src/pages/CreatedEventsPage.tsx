import React, { useEffect, useState } from "react";
import MyCreatedEventButton from "../components/Events/MyCreatedEventButton";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  event_image_url: string;
  location: string;
  lat: number;
  lng: number;
  status?: string; 
}

const CreatedEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const userId = localStorage.getItem("user_id") || "";

  useEffect(() => {
    if (userId) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`http://localhost:4000/events/${userId}`);
          const data = await response.json();

          const parsedEvents = data.map((event: any) => ({
            ...event,
            lat: parseFloat(event.latitude),
            lng: parseFloat(event.longitude),
            status: event.status || "activo", 
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
  }, [userId]);

  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/events/${eventId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      } else {
        console.error("Error al eliminar el evento");
      }
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  const cancelEvent = async (eventId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/events/cancel/${eventId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "CANCELADO" }),
      });

      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, status: "CANCELADO" } : event
          )
        );
      } else {
        console.error("Error al cancelar el evento");
      }
    } catch (error) {
      console.error("Error al cancelar el evento:", error);
    }
  };

  
  const editEvent = (event: Event) => {

    console.log("Editar evento:", event);
  };

  return (
    <div>
      <div className="rounded-lg p-4 gap-1 max-w-6xl mx-auto flex justify-around">
        <h1 className="text-2xl font-bold">Mis eventos</h1>
        <MyCreatedEventButton
          user_id={userId}
          onCreate={(newEvent) => setEvents((prev) => [...prev, newEvent])}
        />
      </div>

      <div className="max-w-6xl mx-auto mt-2 bg-gray-100 p-2 rounded-lg shadow-md">
        <h2 className="mt-2 mx-6 text-2xl font-semibold mb-4">Eventos que estás organizando</h2>
        {events.length > 0 ? (
          <ul className="space-y-4 ">
            {events.map((event) => (
              <li
                key={event.id}
                className="m-4 p-2 bg-white rounded-lg shadow hover:bg-gray-50 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row justify-center md:space-x-6 m-2">
                  <img
                    src={
                      event.event_image_url && event.event_image_url.trim() !== ""
                        ? event.event_image_url
                        : "https://res.cloudinary.com/dyg2tq33j/image/upload/v1733848850/rst60fffxxulup7su3o1.png"
                    }
                    alt={event.title}
                    className="w-30 md:w-1/2 h-auto rounded object-cover"
                  />

                  <div className="mt-4 md:mt-0 p-8 space-y-4">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="text-gray-700">{event.description}</p>
                    <p className=" text-gray-600">Fecha: {event.date}</p>
                    <p className=" text-gray-600">Ubicación: {event.location}</p>
                    {event.status === "CANCELADO" && (
                      <p className="text-red-500">CANCELADO</p>
                    )}
                    <div className="w-full md:w-[350px] h-[250px]">
                      <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
                        libraries={["places"]}
                      >
                        <GoogleMap
                          center={{ lat: event.lat, lng: event.lng }}
                          zoom={12}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                        >
                          <MarkerF position={{ lat: event.lat, lng: event.lng }} />
                        </GoogleMap>
                      </LoadScript>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => editEvent(event)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => cancelEvent(event.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        X
                      </button>
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
