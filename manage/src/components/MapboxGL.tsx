import Map from 'react-map-gl';

export const MapboxGL = () => {
  return (
    <Map
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="MY_ACCESS_TOKEN"
    />
  );
};
