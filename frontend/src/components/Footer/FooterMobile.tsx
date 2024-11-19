import React from 'react';

const FooterMobile: React.FC = () => {
  return (
    <footer className="footer-mobile fixed bottom-0 w-full p-4 bg-gray-800 text-white flex justify-around">
      <button>Inicio</button>
      <button>Foros</button>
      <button>Eventos</button>
      <button>Perfil</button>
      {/* Puedes agregar iconos o enlaces adicionales aquí */}
    </footer>
  );
};

export default FooterMobile;
