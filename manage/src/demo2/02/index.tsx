import { Stats, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Polyhedron } from './Polyhedron';

/**
 * 修改几何属性
 */
export const Demoo002 = () => {
  return (
    <Canvas camera={{ position: [1, 1, 3] }}>
      <Polyhedron />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};
