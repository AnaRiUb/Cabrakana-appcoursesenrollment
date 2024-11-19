// ./src/pages/CreatedEventsPage.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import NewEventButton from '../components/Events/NewEventButton';
import { useMapClick } from '../hooks/useMapClick'; // Importamos el hook

const CreatedEventsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventAuthor, setEventAuthor] = useState('');
  
  // Usamos el hook para obtener latLng del clic en el mapa
  const [latLng, setLatLng] = useMapClick(); // `latLng` contiene las coordenadas

  // Función para manejar el submit del formulario
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (eventName && eventDate && eventTime && latLng && eventAuthor) {
      console.log('Event Created:', {
        eventName,
        eventDate,
        eventTime,
        location: { lat: latLng.lat, lng: latLng.lng }, // Usamos latLng para la ubicación
        eventAuthor,
      });

      setShowForm(false); // Ocultamos el formulario después de enviar
    } else {
      alert('Please fill all fields and select a location');
    }
  };

  return (
    <div>
      <h1>Created Events</h1>
      <NewEventButton onShowForm={() => setShowForm(true)} />

      {showForm && (
        <form onSubmit={handleFormSubmit} className="event-form">
          <div>
            <label>Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Event Time</label>
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Event Location</label>
            <div style={{ height: '300px' }}>
              <MapContainer
                center={[51.505, -0.09]} // Coordenadas iniciales
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {latLng && (
                  <Marker position={latLng}>
                    <Popup>
                      {`Location: ${latLng.lat.toFixed(4)}, ${latLng.lng.toFixed(4)}`}
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
            {latLng && (
              <p>
                Selected Location: {latLng.lat.toFixed(4)}, {latLng.lng.toFixed(4)}
              </p>
            )}
          </div>

          <div>
            <label>Event Author</label>
            <input
              type="text"
              value={eventAuthor}
              onChange={(e) => setEventAuthor(e.target.value)}
              required
            />
          </div>

          <button type="submit">Create Event</button>
        </form>
      )}
    </div>
  );
};

export default CreatedEventsPage;
