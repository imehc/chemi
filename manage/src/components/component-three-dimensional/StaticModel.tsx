import { useGLTF, Center, Html } from '@react-three/drei';
import { Suspense } from 'react';

export const StaticModel = () => {
  const { scene } = useGLTF('/model/scene.glb');
  return (
    <Suspense
      fallback={
        <Center>
          <Html>加载中</Html>
        </Center>
      }
    >
      <primitive object={scene} />
    </Suspense>
  );
};
