// ./src/components/Buttons/MyCreatedEventButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyCreatedEventButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/created-events'); // Asegúrate de que esta ruta esté configurada en tu enrutador
  };

  return (
    <button onClick={handleNavigate} className="my-created-event-button">
      My Created Events
    </button>
  );
};

export default MyCreatedEventButton;
