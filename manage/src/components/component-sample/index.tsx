import Map, { MapRef } from 'react-map-gl';
import { LngLatBounds } from 'mapbox-gl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DrawModeChangeEvent } from '@mapbox/mapbox-gl-draw';
import { DrawControl } from './DrawControl';
import { bbox, centerOfMass } from '@turf/turf';
import type { Geometry, Polygon } from 'geojson';

export const feature = [
  {
    id: '791b21486dcf4bdbeafe51fb1fe06260',
    type: 'Feature',
    properties: {},
    geometry: {
      coordinates: [
        [
          [105.82133149560485, 29.99666825226099],
          [106.39262055810542, 29.572360963515564],
          [105.54392671044889, 29.17264662278609],
          [105.04404878076224, 29.751361319047206],
          [105.34891938622974, 30.07988745379251],
          [105.82133149560485, 29.99666825226099],
        ],
      ],
      type: 'Polygon',
    },
  },
];

interface Props {
  defaultValue?: Polygon;
}

export const Sample: React.FC<Props> = ({ defaultValue }) => {
  const [mapboxMap, setMapboxMap] = useState<MapRef | null>();

  const [geometry, updateGeometry] = useState<Geometry | undefined>();

  // 获取区域中心点
  const polygonCenter = useMemo(() => {
    if (
      !defaultValue ||
      !(defaultValue.type === 'Polygon') ||
      !defaultValue.coordinates.length
    ) {
      return;
    }
    return centerOfMass(defaultValue).geometry.coordinates;
  }, [defaultValue]);

  // 缩放地图级别到可视范围
  useEffect(() => {
    if (
      !defaultValue ||
      !(defaultValue.type === 'Polygon') ||
      !defaultValue.coordinates.length ||
      !mapboxMap
    ) {
      return;
    }
    const _bbox = bbox(defaultValue);
    const bounds = new LngLatBounds([
      [_bbox[0], _bbox[1]],
      [_bbox[2], _bbox[3]],
    ]);
    mapboxMap.getMap().fitBounds(bounds, { padding: 20 });
  }, [defaultValue, mapboxMap]);
  // ================================================COPY========================================================================
  const drawRef = useRef<MapboxDraw>(null);

  // drawRef will be undefined here, because Drawcontrol is not loaded yet.
  // console.log(drawRef);

  const changeModeTo = ({ mode }: DrawModeChangeEvent) => {
    // If you programmatically invoke a function in the Draw API, any event that directly corresponds with that function will not be fired

    console.log(mode);

    // always refer drawRef inside any Drawcontrol function to manipulate it
    drawRef.current?.changeMode(mode as string);
  };

  useEffect(() => {
    const draw = drawRef.current;
    console.log(draw, 'draw');

    if (!draw) {
      return;
    }

    console.log('init');
  }, []);
  // ========================================================================================================================

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.1/mapbox-gl-draw.css"
        rel="stylesheet"
      />
      <Map
        ref={(ref) => ref && setMapboxMap(ref)}
        // mapLib={import('mapbox-gl')}
        initialViewState={{
          latitude: polygonCenter?.[0] ?? 29.575944089902336,
          longitude: polygonCenter?.[1] ?? 106.53269624170116,
          zoom: 8,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={'mapbox://styles/mapbox/streets-v12'}
        mapboxAccessToken="pk.eyJ1IjoicmljaG9vIiwiYSI6ImNreXkzbmJjcTBvZjQyd282dTJkNXIxamMifQ.ZafGfi_Ew5g7PX9OdsGROA"
      >
        {/* <Source id="my-data" type="geojson" data={feature[0]}>
          <Layer
            id="pointLayer"
            type="circle"
            paint={{
              'circle-radius': 6,
              'circle-color': '#007cbf',
            }}
          />
        </Source> */}
        <DrawControl
          position="top-left"
          geometry={geometry}
          // ref={drawRef}
          // onModeChange={changeModeTo}
          onCreate={({ features }) => {
            updateGeometry(features?.[0]?.geometry as Geometry);
          }}
          onUpdate={({ features }) => {
            updateGeometry(features?.[0]?.geometry as Geometry);
          }}
          onDelete={() => {
            updateGeometry(undefined);
          }}
        />
      </Map>
    </>
  );
};
