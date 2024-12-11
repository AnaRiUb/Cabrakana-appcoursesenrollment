import React from 'react';
import ReusableCarousel from './ReusableCarousel';

const ImageCarouselHome: React.FC = () => {
  const images = [
    'svg/coursesCarrousel.svg',
    'svg/ForumCarrousel.svg',
    'svg/EventsCarrousel.svg',
  ];

  const titles = ['Cursos', 'Foros', 'Eventos'];

  const descriptions = [
    'Explora nuestros cursos en línea y mejora tus habilidades. ¡Comienza hoy mismo!',
    'Participa en nuestros foros de discusión y comparte conocimientos con otros estudiantes.',
    'Crea y asiste a eventos educativos para mejorar tu experiencia de aprendizaje.',
  ];

  return (
    <ReusableCarousel 
      images={images} 
      descriptions={descriptions} 
      titles={titles} 
    />
  );
};

export default ImageCarouselHome;
