import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MyEnrolledForumsButtonProps {
  onClick?: () => void;
}

const MyEnrolledForumsButton: React.FC<MyEnrolledForumsButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/my-enrolled-forums');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="my-enrolled-forums-button px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      Mis Foros Inscritos
    </button>
  );
};

export default MyEnrolledForumsButton;
