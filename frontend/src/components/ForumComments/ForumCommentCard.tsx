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
    <div className=" bg-white/75 border rounded p-4 shadow-md flex">
     
      <div className="flex-shrink-0 w-1/4 flex items-center justify-center">
        <img
          src={profile_image}
          alt={username}
          className="h-24 w-24 object-cover rounded"
        />
      </div>

   
      <div className="ml-4 w-3/4">
        <h2 className="text-xl font-bold">{email}</h2>
        <p className="w-400 h-100 p-5 bg-white rounded-lg text-gray-600">{comment_text}</p>
        <div className="flex flex-col mt-4 text-sm text-gray-500 space-y-2">
          <span>Autor: {username}</span>
          <span>Creado: {comment_date}</span>
          <span>{comment_time}</span>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
