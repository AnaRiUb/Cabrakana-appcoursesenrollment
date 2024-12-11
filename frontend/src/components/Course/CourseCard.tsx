import React, { useState } from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  author: string;
  createdAt: string;
  image: string;
  price: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, author, createdAt, image, price }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const handleButtonClick = () => {
    setIsModalOpen(true);

    
    setTimeout(() => {
      setIsModalOpen(false);
      window.open('https://wa.me/999999999', '_blank');
    }, 3000);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">

      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}

     
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Autor: <span className="font-medium text-gray-800">{author}</span></p>
          <p className="text-sm text-gray-500">Creado el: <span className="font-medium">{createdAt}</span></p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-pink-500">{price}</p>
          <button 
            onClick={handleButtonClick} 
            className="bg-pink-500 text-white text-sm px-4 py-2 rounded-md hover:bg-pink-600 transition-colors duration-200"
          >
            Más información
          </button>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-center text-pink-500">Redirigiendo...</h2>
            <p className="text-gray-700 text-center mb-4">
              Se redirigira a un chat de WhatsApp con un asesor.
            </p>
            <button 
              onClick={closeModal} 
              className="bg-pink-500 text-white text-sm px-4 py-2 rounded-md hover:bg-pink-600 transition-colors duration-200 w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
