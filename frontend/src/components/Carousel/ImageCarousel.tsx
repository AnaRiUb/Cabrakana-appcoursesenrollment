import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[]; // Array de URLs de imágenes
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  return (
    <div className="image-carousel">
      <button onClick={goToPrev}>Anterior</button>
      <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
      <button onClick={goToNext}>Siguiente</button>
    </div>
  );
};

export default ImageCarousel;
