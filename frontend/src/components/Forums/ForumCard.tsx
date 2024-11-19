import React from 'react';

interface ForumCardProps {
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

const ForumCard: React.FC<ForumCardProps> = ({ title, description, author, createdAt }) => {
  return (
    <div className="forum-card border rounded p-4 shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <div className="text-sm text-gray-500">
        <span>Autor: {author}</span> | <span>Creado: {createdAt}</span>
      </div>
    </div>
  );
};

export default ForumCard;
