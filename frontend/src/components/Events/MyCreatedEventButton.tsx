import React, { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

interface MyCreatedEventButtonProps {
  onCreate: (newEvent: Event) => void;
  user_id: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  event_image_url: string;
  location: string;
  lat: number;
  lng: number;
}

const MyCreatedEventButton: React.FC<MyCreatedEventButtonProps> = ({ onCreate, user_id }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    location: "",
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImageToCloudinary(file); 
    }
  };

  const uploadImageToCloudinary = async (imageFile: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "apptofindevents");
    formData.append("cloud_name", "dyg2tq33j");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dyg2tq33j/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.secure_url;
      setImageURL(imageUrl);
      console.log("Imagen subida exitosamente:", imageUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onLoad = (autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setNewEvent({ ...newEvent, location: place.formatted_address });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(newEvent.location)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la ubicación.");
      }

      const data = await response.json();
      if (data.status !== "OK" || data.results.length === 0) {
        throw new Error("Dirección no válida. Intenta de nuevo.");
      }

      const { lat, lng } = data.results[0].geometry.location;

      const finalImageURL = imageURL || 'svg/EventPageDefault.png';

      const newEventData = {
        title: newEvent.title,
        description: newEvent.description,
        event_date: newEvent.date,
        event_image_url: finalImageURL,
        location: newEvent.location,
        latitude: lat,
        longitude: lng,
        created_by: user_id,
      };

      const createEventResponse = await fetch("http://localhost:4000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEventData),
      });

      if (!createEventResponse.ok) {
        throw new Error("Error al crear el evento.");
      }

      const createdEvent = await createEventResponse.json();
      onCreate(createdEvent);

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
      <button
        className="bg-pink-500 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(true)}
        disabled={loading}
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

              <LoadScript 
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''} 
                libraries={["places"]}
              >

               <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Ubicación (dirección)"
                  className="block p-2 w-full mb-2 border rounded"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </Autocomplete>
              </LoadScript>

              <input
                type="file"
                accept="image/*"
                className="block p-2 w-full mb-2 border rounded"
                onChange={handleFileChange}
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
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
