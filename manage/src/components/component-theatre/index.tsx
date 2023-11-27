import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from '@theatre/r3f';
import { PerspectiveCamera } from '@theatre/r3f';
import { useEffect } from 'react';

import demoProjectState from './theatre-project-state.json';

// 初始化编辑器
// studio.initialize();
// studio.extend(extension);

const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet(
  'Demo Sheet'
);

/**
 * 场景编辑器demo
 * @link https://www.theatrejs.com/
 */
export const TheatreDemo: React.FC = () => {
  useEffect(() => {
    demoSheet.project.ready.then(() => {
      console.log('Project loaded!');
      // demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 10] });
      demoSheet.sequence.play();
    });
  }, []);

  return (
    <Canvas
      // camera={{
      //   position: [5, 5, -5],
      //   fov: 75,
      // }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <SheetProvider sheet={demoSheet}>
        <PerspectiveCamera
          theatreKey="Camera"
          makeDefault
          position={[5, 5, -5]}
          fov={75}
        />
        <ambientLight />
        <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
        <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </e.mesh>
      </SheetProvider>
    </Canvas>
  );
};
