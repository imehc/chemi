import { useEffect, useRef, type FC } from 'react';
import { Map } from 'mapbox-gl';

const accessToken =
  'pk.eyJ1IjoicmljaG9vIiwiYSI6ImNreXkzbmJjcTBvZjQyd282dTJkNXIxamMifQ.ZafGfi_Ew5g7PX9OdsGROA';

export const Basic: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current: container } = ref;
    if (!container) {
      return;
    }

    const map = new Map({
      accessToken,
      container,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [103.93005525808513, 30.75208889840195],
      zoom: 12,
      pitch: 60, // 倾斜视角
    });

    map.on('click', (e) => {
      const lngLat = [e.lngLat.lng, e.lngLat.lat];
      console.log(lngLat);
    });

    const rotateCamera = (timestamp: number) => {
      map.rotateTo((timestamp / 360) % 360, { duration: 0 });
      requestAnimationFrame(rotateCamera);
    };

    map.on('load', () => rotateCamera(0));

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};
