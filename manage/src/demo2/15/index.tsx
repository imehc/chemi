import {
  Html,
  OrbitControls,
  Environment,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { update } from '@tweenjs/tween.js';
import { Suspense, useRef } from 'react';
import { Model } from './Scan';

/**
 * 摄影测量
 */
export const Demo2v15 = () => {
  const ref = useRef<any>(null);
  return (
    <>
      <Canvas shadows camera={{ position: [4, 0, 3] }}>
        <Suspense fallback={<Loader />}>
          <Environment preset="forest" />
          <OrbitControls ref={ref} target={[4, 0, 0]} />
          <Model controls={ref} />
          <Tween />
        </Suspense>
      </Canvas>
      <div id="instructions">Doubleclick to change OrbitControls target</div>
    </>
  );
};

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Tween() {
  useFrame(() => {
    update();
  });
  return null;
}

export default Demo2v15;
