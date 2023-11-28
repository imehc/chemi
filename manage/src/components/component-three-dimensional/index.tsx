import React, { Suspense, useState } from 'react';
import {
  GizmoHelper,
  GizmoViewport,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { SkyBox } from './SkyBox';
import { StaticModel } from './StaticModel';

// https://codesandbox.io/p/sandbox/react-three-shi-jiao-zhu-shou-2nd3wj?file=%2Fsrc%2FApp.js%3A1%2C29

const sceneBg = [
  'skyBox1',
  'skyBox2',
  'skyBox3',
  'skyBox4',
  'skyBox5',
  'skyBox6',
] as const;

export const ThreeDimensional: React.FC = () => {
  const [bgUrl, setBgUrl] = useState<(typeof sceneBg)[number]>('skyBox5');
  return (
    <div className="h-full relative w-full">
      <div className="absolute bg-[rgba(96,165,250,.7)] h-xs left-0 p-1 rounded-br-lg top-0 w-xs z-1">
        <div>
          <span>背景：</span>
          <select
            onChange={(e) => setBgUrl(e.target.value as typeof bgUrl)}
            defaultValue={bgUrl}
          >
            {sceneBg.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <Suspense
          fallback={
            <Html className="flex h-full items-center justify-center w-full">
              <p>loading...</p>
            </Html>
          }
        >
          <group>
            <OrbitControls makeDefault />
            <PerspectiveCamera
              fov={75}
              aspect={window.innerWidth / window.innerHeight}
              near={0.1}
              far={1000}
              position={[2, 3, 2]}
              lookAt={() => [0, 0, 0]}
            />
            <SkyBox url={bgUrl} />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport
              // axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
              // labelColor="white"
              />
            </GizmoHelper>
          </group>
          <group>
            <StaticModel />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};
