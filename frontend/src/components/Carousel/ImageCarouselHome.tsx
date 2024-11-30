import React, { useState, useEffect } from 'react';

const ImageCarouselHome: React.FC = () => {
  // Lista de imágenes que se mostrarán en el carrusel
  const images = [
    'svg/coursesCarrousel.svg',
    'svg/ForumCarrousel.svg',
    'svg/EventsCarrousel.svg',
  ];

  // Descripciones de cada imagen
  const descriptions = [
    'Explora nuestros cursos en línea y mejora tus habilidades. ¡Comienza hoy mismo!',
    'Participa en nuestros foros de discusión y comparte conocimientos con otros estudiantes.',
    'Crea y asiste a eventos educativos para mejorar tu experiencia de aprendizaje.',
  ];

  // Estado para manejar el índice de la imagen actual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeText, setFadeText] = useState(false); // Controla la transición de desvanecimiento del texto

  useEffect(() => {
    // Cambiar la imagen cada 5 segundos
    const interval = setInterval(() => {
      setFadeText(true); // Iniciar la transición de desvanecimiento del texto

      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );

      // Esperar a que el texto se desvanezca antes de mostrar el nuevo texto
      setTimeout(() => setFadeText(false), 500); // 500ms es el tiempo de duración del desvanecimiento
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg flex">
      <div className='flex justify-center'>
            <div className=" w-1/2 relative h-full flex transition-transform duration-1000 ease-in-out"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`, // Desliza la imagen
                  }}>
                
                  {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full">
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="w-96 h-auto object-cover"
                        style={{ objectFit: 'cover' }} // Asegura que las imágenes se mantengan cuadradas
                      /> </div>))}
            </div>

            {/* Descripción lateral a la derecha */}
            <div className="  w-1/2 relative h-full flex transition-transform duration-1000 ease-in-out bg-white p-6">
                    <div className={`text-center transition-opacity duration-500 ${fadeText ? 'opacity-0' : 'opacity-100'}`}>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {currentImageIndex === 0
                          ? 'Cursos'
                          : currentImageIndex === 1
                          ? 'Foros'
                          : 'Eventos'}
                      </h2>
                      <p className="text-lg text-gray-600">{descriptions[currentImageIndex]}</p>
                    </div>
            </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4">
        {/* Botones de navegación manual */}
        <button
          onClick={() =>
            setCurrentImageIndex(
              currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
            )
          }
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex(
              currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
            )
          }
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ImageCarouselHome;
