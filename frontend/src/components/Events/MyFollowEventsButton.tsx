// ./src/components/Buttons/MyFollowEventsButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyFollowEventsButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/followed-events'); // Asegúrate de que esta ruta esté configurada en tu enrutador
  };

  return (
    <button onClick={handleNavigate} className="my-follow-events-button">
      My Followed Events
    </button>
  );
};

export default MyFollowEventsButton;
