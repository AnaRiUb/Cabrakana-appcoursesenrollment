import React, { useState, useEffect } from 'react';

interface ReusableCarouselProps {
  images: string[];
  descriptions?: string[];
  titles?: string[];
}

const ReusableCarousel: React.FC<ReusableCarouselProps> = ({ images, descriptions = [], titles = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeText, setFadeText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeText(true);
  
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
  
      setTimeout(() => setFadeText(false), 1000);
    }, 10000);
  
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="max-w-full w-auto relative overflow-hidden rounded-lg">
      <div className="relative shadow-md flex flex-col items-center">
        <div
          className="w-full relative flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full relative">
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-60 md:h-72 object-cover"
              />
            
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white transition-opacity duration-500 ${
                  fadeText ? 'opacity-0' : 'opacity-100'
                } hidden lg:flex`}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    {titles[currentImageIndex] || ''}
                  </h2>
                  <p className="text-lg">{descriptions[currentImageIndex] || ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-full flex justify-center items-center bg-white p-4 lg:hidden">
          <div
            className={`text-center transition-opacity duration-500 ${
              fadeText ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {titles[currentImageIndex] || ''}
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              {descriptions[currentImageIndex] || ''}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() =>
            setCurrentImageIndex(
              currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
            )
          }
          className="bg-black bg-opacity-50 text-white p-2 rounded-full md:p-3 lg:p-4"
        >
          ‹
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex(
              currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
            )
          }
          className="bg-black bg-opacity-50 text-white p-2 rounded-full md:p-3 lg:p-4"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ReusableCarousel;
