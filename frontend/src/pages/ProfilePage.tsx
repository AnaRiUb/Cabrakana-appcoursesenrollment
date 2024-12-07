import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
  userAvatar: string; // URL del avatar del usuario
  userName: string; // Nombre del usuario
  userDescription: string; // Descripción del usuario
  userAge: number; // Edad del usuario
  isAgeVisible: boolean; // Si la edad es visible
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  userAvatar,
  userName,
  userDescription,
  userAge,
  isAgeVisible,
}) => {
  const navigate = useNavigate();

  // Navegar a la página de edición del perfil
  const handleEditProfile = () => {
    navigate('/edit-profile'); // Cambia esta ruta según la configuración de tu app
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      {/* Imagen de perfil */}
      <div className="flex justify-center mb-4">
        <img
          src={userAvatar}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
      </div>

      {/* Información del usuario */}
      <h2 className="text-2xl font-bold text-center mb-2">{userName}</h2>
      <p className="text-gray-600 text-center mb-4">{userDescription || 'Sin descripción.'}</p>

      {/* Edad del usuario (opcional) */}
      {isAgeVisible && (
        <p className="text-gray-700 text-center mb-4">
          <span className="font-medium">Edad:</span> {userAge} años
        </p>
      )}

      {/* Botón para editar el perfil */}
      <div className="flex justify-center">
        <button
          onClick={handleEditProfile}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-200"
        >
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
