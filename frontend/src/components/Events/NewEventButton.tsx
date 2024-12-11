import React from 'react';

interface NewEventButtonProps {
  onShowForm: () => void;
}

const NewEventButton: React.FC<NewEventButtonProps> = ({ onShowForm }) => {
  return (
    <button onClick={onShowForm}>
      Create New Event
    </button>
  );
};

export default NewEventButton;
