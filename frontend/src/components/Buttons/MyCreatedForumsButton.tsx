// ./src/components/Buttons/MyCreatedForumsButton.tsx
import React from 'react';

type MyCreatedForumsButtonProps = {
  onClick?: () => void;
  label: string; // Cambiado para requerir esta propiedad
};

const MyCreatedForumsButton: React.FC<MyCreatedForumsButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="my-created-forums-button">
      {label}
    </button>
  );
};

export default MyCreatedForumsButton;
