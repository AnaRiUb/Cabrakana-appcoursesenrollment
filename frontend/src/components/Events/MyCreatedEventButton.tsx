import React, { useState, useEffect } from "react";

interface MyCreatedEventButtonProps {
  onCreate: (newEvent: Event) => void;
  user_id: string; // Añadimos el user_id para pasar a la API
}

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

const MyCreatedEventButton: React.FC<MyCreatedEventButtonProps> = ({ onCreate, user_id }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    location: "",
  });
  const [followedEvents, setFollowedEvents] = useState<any[]>([]); // Estado para almacenar los eventos seguidos

  // Obtener eventos seguidos cuando se monta el componente
  useEffect(() => {
    const fetchFollowedEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user_id}/followed-events`);
        const data = await response.json();
        setFollowedEvents(data); // Establecer los eventos seguidos en el estado
      } catch (error) {
        console.error("Error fetching followed events:", error);
      }
    };

    fetchFollowedEvents();
  }, [user_id]); // Solo vuelve a ejecutarse si cambia el user_id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          newEvent.location
        )}&key=AIzaSyA6Rat4XB1qcltaTLlea57pEQA8whd-hUU`
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la ubicación.");
      }

      const data = await response.json();

      if (data.status !== "OK" || data.results.length === 0) {
        throw new Error("Dirección no válida. Intenta de nuevo.");
      }

      const { lat, lng } = data.results[0].geometry.location;

      onCreate({
        id: new Date().toISOString(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        image: newEvent.image,
        location: newEvent.location,
        lat,
        lng,
      });

      setShowForm(false);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        image: "",
        location: "",
      });
    } catch (err: any) {
      setError(err.message || "Error al crear el evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Mostrar los eventos seguidos */}
      <div>
        <h3>Tus eventos seguidos:</h3>
        <ul>
          {followedEvents.length > 0 ? (
            followedEvents.map((event) => (
              <li key={event.event_id}>
                {event.event.title} - {event.event.event_date}
              </li>
            ))
          ) : (
            <p>No has seguido ningún evento aún.</p>
          )}
        </ul>
      </div>

      {/* Botón para mostrar el formulario de creación */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(true)}
      >
        Crear nuevo evento
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Evento</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Título"
                className="block p-2 w-full mb-2 border rounded"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <textarea
                placeholder="Descripción"
                className="block p-2 w-full mb-2 border rounded"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <input
                type="date"
                className="block p-2 w-full mb-2 border rounded"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ubicación (dirección)"
                className="block p-2 w-full mb-2 border rounded"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                className="block p-2 w-full mb-2 border rounded"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, image: URL.createObjectURL(e.target.files![0]) })
                }
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Creando..." : "Crear Evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCreatedEventButton;
