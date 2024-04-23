import { css } from '#/css';
import { FC, Suspense } from 'react';
import { MathUtils } from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  GizmoHelper,
  GizmoViewport,
} from '@react-three/drei';
import { EnvBackground, LocalModal } from '../../components';

// https://polyhaven.com/

export const Home: FC = () => {
  return (
    <Canvas
      className={css({ backgroundColor: "#333" })}
      style={{ height: '100vh', width: '100vw' }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense
        fallback={
          <Html
            className={css({
              display: 'flex',
              h: 'full',
              alignItems: 'center',
              justifyContent: 'center',
              color: "#fff"
            })}
          >
            <p>loading...</p>
          </Html>
        }
      >
        <group>
          <OrbitControls
            makeDefault
            maxDistance={9}
            maxPolarAngle={MathUtils.degToRad(90)}
            position={[0, 0.5, 0]}
          />
          <directionalLight position={[0, 0, 10]} />
          <pointLight position={[0, 0, 10]} />
          <PerspectiveCamera
            fov={40}
            aspect={window.innerWidth / window.innerHeight}
            near={0.3}
            far={100}
            position={[-5, 1.4, -4.5]}
          />
          <EnvBackground />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} />
          </GizmoHelper>
        </group>
        <group>
          <LocalModal />
        </group>
      </Suspense>
    </Canvas>
  );
};
