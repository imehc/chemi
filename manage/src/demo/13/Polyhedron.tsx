import { useRef } from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const Polyhedron: React.FC<MeshProps> = (props) => {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.2 * delta;
    ref.current.rotation.y += 0.05 * delta;
  });

  return (
    <mesh {...props} ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  );
};
