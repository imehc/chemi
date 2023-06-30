import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Geometry, Feature } from 'geojson';
import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
} from 'react';
import { ControlPosition, useControl } from 'react-map-gl';

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  ref: MutableRefObject<MapboxDraw>;
  position?: ControlPosition;
  geometry?: Geometry;
  onCreate?: (event: { features: Feature[] }) => void;
  onUpdate?: (event: { features: Feature[]; action: string }) => void;
  onDelete?: (event: { features: Feature[] }) => void;
  onModeChange?: (event: Feature[]) => void;
};

export const DrawControl = forwardRef(
  ({ geometry, ...props }: DrawControlProps, ref) => {
    const drawRef = useControl<MapboxDraw>(
      () =>
        new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true,
          },
          ...props,
        }),
      ({ map }) => {
        props.onCreate && map.on('draw.create', props.onCreate);
        props.onUpdate && map.on('draw.update', props.onUpdate);
        props.onDelete && map.on('draw.delete', props.onDelete);
        props.onModeChange && map.on('draw.modechange', props.onModeChange);
      },
      ({ map }) => {
        props.onCreate && map.off('draw.create', props.onCreate);
        props.onUpdate && map.off('draw.update', props.onUpdate);
        props.onDelete && map.off('draw.delete', props.onDelete);
        props.onModeChange && map.off('draw.modechange', props.onModeChange);
      },
      {
        position: props.position,
      }
    );

    useEffect(() => {
      if (!drawRef || !geometry) {
        return;
      }
      drawRef.set({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry,
          },
        ],
      });
    }, [drawRef, geometry]);

    useImperativeHandle(ref, () => drawRef, [drawRef]); // This way I exposed drawRef outside the component

    return null;
  }
);
