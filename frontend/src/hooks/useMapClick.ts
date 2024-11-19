// ./src/hooks/useMapClick.ts
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';

export const useMapClick = () => {
  // Estado para almacenar las coordenadas latLng
  const [latLng, setLatLng] = useState<LatLng | null>(null);

  // Usamos useMapEvents para escuchar eventos de clic en el mapa
  useMapEvents({
    click(e) {
      // Actualizamos el estado con las coordenadas del clic en el mapa
      setLatLng(e.latlng);
    },
  });

  // Retornamos las coordenadas y la función para actualizarlas
  return [latLng, setLatLng] as const; 
};
