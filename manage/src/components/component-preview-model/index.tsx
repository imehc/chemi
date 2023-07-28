import { Html, OrbitControls, Sky } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { MOUSE } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Props {
  /**
   * 展示模型的地址
   */
  url?: string;
  /**
   * 只展示模型的快照
   */
  isSnapshot?: boolean;
}

export const PreviewModel: React.FC<Props> = (props) => {
  return (
    <Canvas
      camera={{
        rotation: [0, 0, -Math.PI / 4],
        fov: 90,
        near: 0.1,
        far: 1000,
        position: [0, 30, 30],
      }}
    >
      <OrbitControls
        makeDefault
        autoRotate
        mouseButtons={{
          LEFT: MOUSE.RIGHT,
          RIGHT: MOUSE.LEFT,
        }}
      />
      {/* <ambientLight intensity={0.1} /> */}
      <pointLight position={[0, 50, 20]} />
      <Sky />
      <Suspense
        fallback={
          <Html className="h-full w-full flex flex-col items-center justify-center">
            <p className="whitespace-nowrap text-lg">加载中...</p>
          </Html>
        }
      >
        <Model {...props} />
      </Suspense>
    </Canvas>
  );
};

const Model: React.FC<Props> = ({ url, isSnapshot }) => {
  if (!url) {
    return null;
  }

  const gltf = useLoader(GLTFLoader, url, (progress) => {});

  return <primitive object={gltf.scene} />;
};
