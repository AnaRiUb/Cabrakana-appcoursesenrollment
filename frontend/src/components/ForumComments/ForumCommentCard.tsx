import React from 'react';

interface ForumCardProps {
  comment_text: string;

  
   username:string,
   email:string,
   profile_image:string,
   comment_date:string
   comment_time:string

}

const ForumCard: React.FC<ForumCardProps> = ({ username, comment_text, email, comment_date, profile_image,comment_time }) => {
  return (
    <div className="transform hover:scale-105 transition duration-300 forum-card  bg-white/75 border rounded p-4 shadow-md flex">
      {/* Sección de la imagen */}
      <div className="flex-shrink-0 w-1/4 flex items-center justify-center">
        <img
          src={profile_image}
          alt={username}
          className="h-24 w-24 object-cover rounded"
        />
      </div>

      {/* Sección del contenido */}
      <div className="ml-4 w-3/4">
        <h2 className="text-xl font-bold">{email}</h2>
        <p className="text-gray-600">{comment_text}</p>
        <div className="text-sm text-gray-500">
          <span>Autor: {username}</span> | <span>Creado: {comment_date}  {comment_time}</span>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
