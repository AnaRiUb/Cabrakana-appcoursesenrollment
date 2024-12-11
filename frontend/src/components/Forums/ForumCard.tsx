import React from 'react';

interface ForumCardProps {
  title: string;
  description: string;
  author: string;
  createdAt: string;
  image: string; 
  onClick?: () => void;
}

const ForumCard: React.FC<ForumCardProps> = ({ title, description, author, createdAt, image, onClick }) => {
  return (
    <div className="transform hover:scale-105 transition duration-300 forum-card  bg-white/75 border rounded p-4 shadow-md flex"  onClick={onClick}>
      {/* Sección de la imagen */}
      <div className="flex-shrink-0 w-1/4 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="h-24 w-24 object-cover rounded"
        />
      </div>

      {/* Sección del contenido */}
      <div className="ml-4 w-3/4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="text-sm text-gray-500">
          <span>Autor: {author}</span> | <span>Creado: {createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
