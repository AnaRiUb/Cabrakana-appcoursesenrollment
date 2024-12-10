import React, { useState } from 'react';

interface EventSearchProps {
  onSearch: (searchTerm: string) => void;
}

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-sm min-w-[80px]">
      <div className="relative">
        <input
          className="w-full bg-white placeholder:text-slate-500 text-slate-700 text-m border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Buscar eventos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado del input
        />
        <button
          onClick={handleSearch} // Llamar a handleSearch cuando se haga clic
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-m text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default EventSearch;
