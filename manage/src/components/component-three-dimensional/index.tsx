import React, { useEffect } from 'react';
import {
  OrbitControls,
  PerspectiveCamera,
  useCubeTexture,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';

export const ThreeDimensional: React.FC = () => {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <OrbitControls />
      <SkyBox />
    </Canvas>
  );
};

const SkyBox: React.FC = () => {
  const { scene } = useThree();

  const textures = useCubeTexture(
    [
      'posx.jpg', // 右侧
      'negx.jpg', // 左侧
      'posy.jpg', // 顶部
      'negy.jpg', // 底部
      'posz.jpg', // 前侧
      'negz.jpg', // 后侧
    ],
    { path: '/textures/skyBox/skyBox6/' }
  );

  useEffect(() => {
    scene.background = textures;
  }, [scene, textures]);

  return (
    <React.Fragment>
      <PerspectiveCamera
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[2, 3, 2]}
        lookAt={() => scene.position}
      />
      <pointLight color={0xffffff} position={[40, 20, 30]} />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
    </React.Fragment>
  );
};
