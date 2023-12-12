import { Canvas } from '@react-three/fiber';
import { Stats, Environment } from '@react-three/drei';
import { Scene } from './Scene';
import { Teleport } from './Teleport';

/**
 * 平滑过渡
 */
const Demo2v10 = () => {
  return (
    <>
      <Canvas>
        <Teleport />
        <Environment
          files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@teleport/public/img/rustig_koppie_puresky_1k.hdr"
          background
        />
        <Scene />
        <Stats />
      </Canvas>
      <div id="instructions">
        Click the floor slide to the circle.
        <br />
        Click a model to orbit around it.
      </div>
    </>
  );
};

export default Demo2v10;
