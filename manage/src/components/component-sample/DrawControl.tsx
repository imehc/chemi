import MapboxDraw, { DrawModeChangeEvent } from '@mapbox/mapbox-gl-draw';
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

  onCreate?: (event: { features: object[] }) => void;
  onUpdate?: (event: { features: object[]; action: string }) => void;
  onDelete?: (event: { features: object[] }) => void;
  onModeChange?: (event: DrawModeChangeEvent) => void;
};

export const DrawControl = forwardRef((props: DrawControlProps, ref) => {
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
    if (!drawRef) {
      return;
    }
    drawRef.set({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
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
          },
        },
      ],
    });
  }, []);

  useImperativeHandle(ref, () => drawRef, [drawRef]); // This way I exposed drawRef outside the component

  return null;
});
