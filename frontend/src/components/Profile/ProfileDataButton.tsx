// ProfileButton.tsx
import React from 'react';

interface ProfileButtonProps {
  onLogout?: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onLogout }) => {
  return (
    <div className="profile-button">
      <span>Mi Perfil</span>
      {onLogout && (
        <button onClick={onLogout} className="logout-button">
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
