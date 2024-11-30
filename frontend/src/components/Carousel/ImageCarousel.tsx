import React, { useState, useEffect } from 'react';

const ImageCarousel: React.FC = () => {
  // Lista de imágenes que se mostrarán en el carrusel
  const images = [
    'images/course1.png',
    'images/course2.png',
    'images/course3.png',
    'images/course4.png',
    'images/course5.png',
    'images/course6.png',
    'images/course7.png',
    'images/course8.png',
    'images/course9.png',
    'images/course10.png',
  ];

  // Descripciones de cada imagen
  const descriptions = [
    'Desarrollo Web Full-Stack: Aprende a construir aplicaciones web modernas desde cero utilizando HTML, CSS, JavaScript, React y Node.js. Duración: 6 meses.',
    'Python para Principiantes: Introducción al lenguaje de programación Python, perfecto para análisis de datos o automatización. Duración: 8 semanas.',
    'Inteligencia Artificial con Python: Explora algoritmos de aprendizaje automático y redes neuronales con aplicaciones prácticas. Duración: 4 meses.',
    'Ilustración Digital: Aprende a crear ilustraciones digitales desde conceptos básicos hasta técnicas avanzadas. Duración: 3 meses.',
    'Historia del Arte y Diseño Contemporáneo: Un recorrido por movimientos artísticos y diseños que marcaron la historia. Duración: 10 semanas.',
    'Álgebra y Geometría Aplicada: Domina los fundamentos del álgebra y geometría para problemas cotidianos y científicos. Duración: 6 semanas.',
    'Cálculo Diferencial e Integral para Ingenieros: Aprende cálculo diferencial e integral con un enfoque práctico. Duración: 12 semanas.',
    'Robótica y Programación de Drones: Descubre cómo construir y programar robots autónomos y drones. Duración: 4 meses.',
    'Metodologías Ágiles de la Ingeniería de Software : Aprende los principios del desarrollo de software con Scrum y Kanban. Duración: 3 meses.',
    'Edición de Video Profesional: Aprende a editar videos para redes sociales, cine o marketing con herramientas avanzadas. Duración: 2 meses.',
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
      <div className="flex justify-center">
        <div
          className="w-1/2 relative h-full flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`, // Desliza la imagen
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-96 h-auto object-cover"
                style={{ objectFit: 'cover' }} // Asegura que las imágenes se mantengan cuadradas
              />
            </div>
          ))}
        </div>

        {/* Descripción lateral a la derecha */}
        <div className="w-1/2 relative h-full flex transition-transform duration-1000 ease-in-out bg-white p-6">
          <div
            className={`text-center transition-opacity duration-500 ${
              fadeText ? 'opacity-0' : 'opacity-100'
            }`}
          >
         
            <p className="text-lg text-gray-600">{descriptions[currentImageIndex]}</p>
            <button className="btn-info bg-pink-600/75 hover:bg-pink-600 text-white px-4 py-2 mt-4 rounded-full ">
            +
            </button>
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

export default ImageCarousel;
