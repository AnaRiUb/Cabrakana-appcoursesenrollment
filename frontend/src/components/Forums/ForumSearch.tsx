import React, { useState } from 'react';

interface ForumSearchProps {
  onSearch: (searchTerm: string) => void;
}

const ForumSearch: React.FC<ForumSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="forum-search flex items-center gap-2 mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar foros..."
        className="border rounded px-4 py-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
        Buscar
      </button>
    </div>
  );
};

export default ForumSearch;
