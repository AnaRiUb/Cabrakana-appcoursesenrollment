import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyFollowEventsButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/followed-events');
  };

  return (
    <button onClick={handleNavigate} className="px-2 w-20% max-w-xs rounded-lg text-pink-500 text-xs shadow-md hover:bg-white/75 bg-white font-bold">
      My Followed Events
    </button>
  );
};

export default MyFollowEventsButton;
