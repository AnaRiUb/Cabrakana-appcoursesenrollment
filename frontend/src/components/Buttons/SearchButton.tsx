import React from 'react';

interface SearchButtonProps {
  onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="search-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Buscar
    </button>
  );
};

export default SearchButton;
