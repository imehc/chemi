import { css } from '#/css';
import { FC, Suspense, useCallback, useEffect, useRef } from 'react';
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
import { saveAs } from 'file-saver';
import { EnvBackground, LeftLayout, LocalModal } from '~/components';
import { useConfigStore } from '~/store';

// https://polyhaven.com/
// https://sbcode.net/react-three-fiber/environment/
// https://sketchfab.com/3d-models/porsche-gt3-rs-e738eae819c34d19a31dd066c45e0f3d glb

export const Home: FC = () => {
  const orbitRef = useRef<OrbitControlsImpl>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { modelPaths, appendModelPath } = useConfigStore();

  const handleFileChange = (file?: File) => {
    if (!file) {
      throw new Error('未选择文件');
    }
    if (modelPaths.length > 5) {
      throw new Error('场景模型过多会导致卡顿');
    }
    // 应上传获取到远程链接
    appendModelPath({ type: 'local', url: window.URL.createObjectURL(file) });
  };
  const handleSave = useCallback(() => {
    console.log('1');
  }, []);
  const handleDownloadScenePicture = useCallback(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) return;
    saveAs(canvas.toDataURL('image/jpeg'));
  }, []);

  useEffect(() => {
    if (modelPaths.length > 5) {
      console.error('oops!!!');
      return;
    }
  }, [modelPaths.length]);

  useEffect(() => {
    return () => {
      modelPaths.forEach((path) => window.URL.revokeObjectURL(path.url));
    };
  }, [modelPaths]);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <LeftLayout
        onSelectSingleFile={handleFileChange}
        onSave={handleSave}
        onModelClisk={(url) => appendModelPath({ type: 'remote', url })}
        onDownloadScenePicture={handleDownloadScenePicture}
      />
      <Canvas
        ref={canvasRef}
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
              // position={[0, 10, 0]}
              ref={orbitRef}
            />
            <directionalLight position={[0, 0, 10]} />
            <pointLight position={[0, 0, 10]} />
            <EnvBackground orbitRef={orbitRef} />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} />
            </GizmoHelper>
          </group>

          {modelPaths.map((path, i) => (
            <Suspense fallback={<Loading />} key={i}>
              <LocalModal {...path} orbitRef={orbitRef} />
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
      <p>{progress.toFixed(2)} % loaded</p>
    </Html>
  );
};
