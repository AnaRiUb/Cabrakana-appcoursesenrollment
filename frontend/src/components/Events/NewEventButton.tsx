// ./src/components/Events/NewEventButton.tsx
import React from 'react';

interface NewEventButtonProps {
  onShowForm: () => void;  // Prop que permite abrir el formulario
}

const NewEventButton: React.FC<NewEventButtonProps> = ({ onShowForm }) => {
  return (
    <button onClick={onShowForm}>
      Create New Event
    </button>
  );
};

export default NewEventButton;
