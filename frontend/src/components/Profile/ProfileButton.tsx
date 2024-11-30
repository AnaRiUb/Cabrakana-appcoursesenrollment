import React from 'react';
import { Link } from 'react-router-dom';
import NotificationBadge from '../Common/NotificationBadge';

interface ProfileButtonProps {
  onLogout?: () => void;
  profileImageUrl: string; // URL de la imagen de perfil
  notificationCount: number; // Número de notificaciones
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  onLogout,
  profileImageUrl,
  notificationCount,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {/* Imagen de perfil con NotificationBadge */}
      <div className="relative w-12 h-12">
       <Link to="/edit-profile"> 
       <img
          src={profileImageUrl}
          alt="Imagen de perfil"
          className="w-full h-full rounded-full object-cover border border-gray-300"
        />

       </Link>

      {/* Badge */}
        <NotificationBadge count={10} />
      </div>

      {/* Botón Mi Perfil */}
      <Link
        to="/profile"
        className="bg-pink-200/75 p-2 m-2 rounded-lg shadow-sm hover:bg-pink-200 cursor-pointer"
      >
        Mi Perfil
      </Link>

      {/* Botón de cerrar sesión */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="bg-pink-200/75 p-2 m-2 rounded-lg shadow-sm hover:bg-pink-200 cursor-pointer"
        >
          Cerrar sesión
        </button>
      )}

    </div>
  );
};


export default ProfileButton;

