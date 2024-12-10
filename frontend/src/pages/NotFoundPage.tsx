import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="text-center">
        {}
        <img
          src="svg/404 not found.svg"  
          alt="Not Found"
          className="mb-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/1 object-contain mx-auto"
        />
        <p className="text-xl font-semibold">Página no encontrada</p>
        <p className="text-gray-600">Lo sentimos, la página que buscas no existe.</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
