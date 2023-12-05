import { Environment, OrbitControls, Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Annotations } from './Annotations';
import { House } from './House';
import { Loader } from './Loader';
import TWEEN from '@tweenjs/tween.js';

const Tween = () => {
  useFrame(() => {
    TWEEN.update();
  });

  return null;
};

export const Demoo01: React.FC = () => {
  const ref = useRef(null);

  return (
    <Canvas camera={{ position: [8, 2, 12] }}>
      <OrbitControls ref={ref} target={[8, 2, 3]} />
      <Suspense fallback={<Loader />}>
        <Environment preset="forest" background blur={0.75} />
        <House />
        <Annotations controls={ref} />
        <Tween />
      </Suspense>
      <Stats />
    </Canvas>
  );
};
