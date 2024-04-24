import { css } from '#/css';
import { FC, Suspense, useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Html,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  useProgress,
} from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { EnvBackground, LeftLayout, LocalModal } from '~/components';

// https://polyhaven.com/
// https://sbcode.net/react-three-fiber/environment/
// https://sketchfab.com/3d-models/porsche-gt3-rs-e738eae819c34d19a31dd066c45e0f3d glb

export const Home: FC = () => {
  const orbitRef = useRef<OrbitControlsImpl>(null);
  const [select, setSelect] = useState<string>();
  const [localUrl, setLocalUrl] = useState<string[]>([]);
  const handleFileChange = (file?: File) => {
    if (!file) {
      throw new Error('未选择文件');
    }
    if (localUrl.length > 5) {
      throw new Error('场景模型过多会导致卡顿');
    }
    setLocalUrl((state) => [...state, window.URL.createObjectURL(file)]);
  };

  useEffect(() => {
    return () => {
      localUrl.forEach((url) => window.URL.revokeObjectURL(url));
    };
  }, [localUrl]);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <LeftLayout onSelectSingleFile={handleFileChange} />
      <Canvas
        className={css({
          backgroundColor: '#333',
          flex: '1',
          w: 'full',
          h: 'screen',
          // opacity: '0',
        })}
        gl={{ preserveDrawingBuffer: true }}
        // camera={{
        // position: [-5, 1.4, -4.5],
        // fov: 40,
        // far: 100,
        // near: 0.3,
        // aspect: window.innerWidth / window.innerHeight,
        // }}
      >
        <Suspense fallback={<Loading />}>
          <group>
            <OrbitControls
              makeDefault
              maxDistance={9}
              maxPolarAngle={MathUtils.degToRad(90)}
              position={[0, 10, 0]}
              ref={orbitRef}
            />
            <directionalLight position={[0, 0, 10]} />
            <pointLight position={[0, 0, 10]} />
            <EnvBackground />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} />
            </GizmoHelper>
          </group>

          {localUrl.map((url, i) => (
            <Suspense fallback={<Loading />} key={i}>
              <LocalModal
                url={url}
                orbitRef={orbitRef}
                select={select}
                onSelect={setSelect}
              />
            </Suspense>
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export const Loading: FC = () => {
  const { progress } = useProgress();
  return (
    <Html center className="text-white whitespace-nowrap">
      <p>{progress.toFixed(2)} % loading...</p>
    </Html>
  );
};
