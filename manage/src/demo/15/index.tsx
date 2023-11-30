import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import {
  MeshBasicMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  TextureLoader,
} from 'three';
import { Floor } from './Floor';
import { Lights } from './Lights';
import { Polyhedron } from './Polyhedron';

/**
 * 使用图片纹理
 */
export const Demo15: React.FC = () => {
  const texture = useLoader(TextureLoader, '/imgs/grid.png');
  return (
    <Canvas camera={{ position: [4, 4, 1.5] }} shadows>
      <Lights />
      <Polyhedron
        name="meshBasicMaterial"
        position={[-3, 1, 0]}
        material={new MeshBasicMaterial({ map: texture })}
      />
      <Polyhedron
        name="meshNormalMaterial"
        position={[-1, 1, 0]}
        material={
          new MeshNormalMaterial({
            flatShading: true,
          })
        }
      />
      <Polyhedron
        name="meshPhongMaterial"
        position={[1, 1, 0]}
        material={
          new MeshPhongMaterial({
            flatShading: true,
            map: texture,
          })
        }
      />
      <Polyhedron
        name="meshStandardMaterial"
        position={[3, 1, 0]}
        material={
          new MeshStandardMaterial({
            flatShading: true,
            map: texture,
          })
        }
      />
      <Floor />
      <OrbitControls target={[0, 1, 0]} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  );
};
