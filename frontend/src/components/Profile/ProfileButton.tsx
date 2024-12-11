import React from 'react'; 
import { Link } from 'react-router-dom';
import NotificationBadge from '../Common/NotificationBadge';

interface ProfileButtonProps {
  profileImageUrl: string;
  notificationCount: number;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  profileImageUrl,
  notificationCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-start md:justify-center">
     
      {/* Imagen de perfil NotificationBadge */}

      
      <div className="relative w-12 h-12">
        <Link to="/edit-profile"> 
          <img
            src={profileImageUrl}
            alt="Imagen de perfil"
            className="mx-10 sm:mx-0 flex justify-center items-center w-full h-full rounded-full object-cover border border-none"
          />
        </Link>
        {/* Badge */}
    
      </div>

      {/* Botón Mi Perfil */}
      <Link
        to="/profile"
        className="bg-pink-200 w-40 p-2 m-2 rounded-full shadow-sm text-center hover:bg-pink-200 cursor-pointer"
      >
        Mi Perfil
      </Link>
    </div>
  );
};

export default ProfileButton;
