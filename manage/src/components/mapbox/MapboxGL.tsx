import React, { useEffect, useMemo, useState } from 'react';
import Map, { GeolocateControl } from 'react-map-gl';
import { LngLat, version } from 'mapbox-gl';
import GeocoderControl from './EeocoderControl';

const TOKEN = `pk.eyJ1IjoicmljaG9vIiwiYSI6ImNreXkzbmJjcTBvZjQyd282dTJkNXIxamMifQ.ZafGfi_Ew5g7PX9OdsGROA`;

interface Props {
  onResult?: (result: PlaceName | undefined) => void;
}

type PlaceName = {
  name: string;
  lngLat: {
    lng: number;
    lat: number;
  };
};

export const MapboxGL: React.FC<Props> = ({ onResult }) => {
  const [lanlat, setLanlat] = useState<LngLat>();
  const [placeName, setPlaceName] = useState<PlaceName>();

  useEffect(() => {
    if(!onResult) return;
    if(placeName) onResult(placeName);
  }, [placeName]);

  const mapStyle = useMemo<mapboxgl.Style>(() => {
    return {
      version: 8,
      glyphs: `https://cdn.jcbel.com/jcmap/mapbox/fonts/v1/mapbox/{fontstack}/{range}.pbf`,
      sources: {
        'amap-raster-tiles': {
          type: 'raster',
          tiles: [
            'https://cdn.jcbel.com/jcmap/tiles/raster/amap/standard/{z}/{x}/{y}',
          ],
          tileSize: 512,
        },
      },
      layers: [
        {
          id: 'amap-raster-tiles',
          type: 'raster',
          source: 'amap-raster-tiles',
        },
      ],
    };
  }, []);
  return (
    <div>
      <link
        rel="stylesheet"
        href={`https://unpkg.com/mapbox-gl@${version}/dist/mapbox-gl.css`}
      />
      <link
        rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
        type="text/css"
      ></link>
      <Map
        style={{ width: '600px', height: '400px' }}
        initialViewState={{
          longitude: 106.53482,
          latitude: 29.575007,
          zoom: 17,
        }}
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle={mapStyle as any}
        mapboxAccessToken={TOKEN}
        // onMouseMove={(e) => {console.log(e.lngLat,'onMouseMove')}}
        onClick={(e) => {
          setLanlat(e.lngLat);
        }}
      >
        {
          <GeocoderControl
            mapboxAccessToken={TOKEN}
            position="top-left"
            onResult={(evt: any) => {
              setPlaceName({
                lngLat: {
                  lng: evt.result.center[0],
                  lat: evt.result.center[1],
                },
                name: evt.result.place_name,
              });
            }}
          />
        }
        <GeolocateControl />
        {/* <Marker
          longitude={lanlat?.lng ?? 106.53482}
          latitude={lanlat?.lat ?? 29.575007}
        ></Marker> */}
      </Map>
    </div>
  );
};
