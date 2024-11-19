import React, { useState } from 'react';

interface EventSearchProps {
  onSearch: (query: string) => void;
}

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="event-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar eventos..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default EventSearch;
