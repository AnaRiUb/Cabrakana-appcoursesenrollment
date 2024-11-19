import React from 'react';
import './EventCard.css';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description, onClick }) => {
  return (
    <div className="event-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{description}</p>
    </div>
  );
};

export default EventCard;
