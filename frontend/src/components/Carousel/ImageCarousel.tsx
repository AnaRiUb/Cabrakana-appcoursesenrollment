import React from 'react';
import ReusableCarousel from './ReusableCarousel';

const ImageCarousel: React.FC = () => {
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

  const titles = [
    'Desarrollo Web',
    'Python para Principiantes',
    'Inteligencia Artificial',
    'Ilustración Digital',
    'Historia del Arte',
    'Álgebra y Geometría',
    'Cálculo Diferencial',
    'Robótica y Drones',
    'Metodologías Ágiles',
    'Edición de Video',
  ];

  const descriptions = [
    'Construye aplicaciones web desde cero.',
    'Domina los fundamentos de Python.',
    'Aprende algoritmos de IA y ML.',
    'Crea impresionantes ilustraciones digitales.',
    'Explora la historia del arte y el diseño.',
    'Domina el álgebra y la geometría aplicada.',
    'Aprende cálculo para resolver problemas reales.',
    'Diseña, construye y programa robots y drones.',
    'Aprende Scrum y Kanban para proyectos de software.',
    'Edita videos de alta calidad para cine y marketing.',
  ];

  return (
    <ReusableCarousel 
      images={images} 
      descriptions={descriptions} 
      titles={titles} 
    />
  );
};

export default ImageCarousel;
