import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';

export const useMapClick = () => {
  const [latLng, setLatLng] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      setLatLng(e.latlng);
    },
  });

  return [latLng, setLatLng] as const; 
};
