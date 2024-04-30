import { css } from '#/css';
import { FC, Suspense, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Html,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  useProgress,
  useGLTF,
} from '@react-three/drei';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { EnvBackground, LeftLayout, LocalModal } from '~/components';
import { useConfigStore } from '~/store';
import {
  IRemoteInfo,
  addInfoToRemote,
  removeInfoFromRemote,
} from '~/mock-remote';

/** 默认持续时间 */
export const duration = 3;

// https://polyhaven.com/
// https://sbcode.net/react-three-fiber/environment/
// https://sketchfab.com/3d-models/porsche-gt3-rs-e738eae819c34d19a31dd066c45e0f3d glb

interface Props {
  data?: IRemoteInfo;
}

export const Home: FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    modelPaths,
    modelConfigs,
    appendModelPath,
    clearModelConfigs,
    setModelPaths,
    sceneConfig,
  } = useConfigStore();

  const handleFileChange = (file?: File) => {
    if (!file) {
      toast.error('Unselected file');
      return;
    }
    if (modelPaths.length > 5) {
      toast.error('No more than five models');
      return;
    }
    // 应上传获取到远程链接
    appendModelPath({
      path: { type: 'local', url: window.URL.createObjectURL(file) },
    });
  };

  const handleSave = useCallback(async () => {
    // 模拟保存并上传到远程，这儿是保存到浏览器本地
    const success = await addInfoToRemote({
      scene: sceneConfig,
      models: modelConfigs,
    });
    if (success) {
      toast.success('Save success');
      return;
    }
    toast.error('Save fail');
  }, [modelConfigs, sceneConfig]);

  const handleReset = useCallback(async () => {
    clearModelConfigs();
    const res = await removeInfoFromRemote();
    if (!res) {
      toast.error('Reset fail');
      return;
    }
  }, [clearModelConfigs]);

  const handleDownloadScenePicture = useCallback(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) return;
    saveAs(canvas.toDataURL('image/jpeg'));
  }, []);

  useEffect(() => {
    const handle = () => {
      // handleSave();
      // TODO: 是否保存
    };

    window.addEventListener('beforeunload', handle);

    return () => {
      window.removeEventListener('beforeunload', handle);
    };
  }, [handleSave]);

  useEffect(() => {
    if (data?.models.length) {
      setModelPaths(data.models);
    }
  }, [data?.models, setModelPaths]);

  useEffect(() => {
    return () => {
      modelPaths.forEach(
        (item) =>
          item.path.type === 'local' &&
          window.URL.revokeObjectURL(item.path.url)
      );
    };
  }, [modelPaths]);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <LeftLayout
        onSelectSingleFile={handleFileChange}
        onSave={handleSave}
        onReset={handleReset}
        onModelClisk={(url) => {
          if (modelPaths.length > 5) {
            toast.error('No more than five models');
            return;
          }
          appendModelPath({ path: { type: 'remote', url } });
        }}
        onDownloadScenePicture={handleDownloadScenePicture}
      />
      <Canvas
        ref={canvasRef}
        className={css({
          backgroundColor: '#333',
          flex: '1',
          w: 'full',
          h: 'screen',
        })}
        gl={{
          preserveDrawingBuffer: true,
          pixelRatio: window.devicePixelRatio,
          antialias: true,
        }}
      >
        <Suspense fallback={<Loading />}>
          <group>
            <OrbitControls makeDefault />
            <EnvBackground scene={data?.scene} />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} />
            </GizmoHelper>
          </group>

          <Suspense fallback={<Loading />}>
            {modelPaths.map((item, i) => (
              <LocalModal key={i} {...item} />
            ))}
          </Suspense>
        </Suspense>
      </Canvas>
      {/* <Loader /> */}
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

useConfigStore.subscribe(
  (state) => state.defaultModelPaths,
  (state) => {
    state.forEach((item) => {
      // 预加载模型
      useGLTF.preload(item.path.url);
    });
  },
  {
    fireImmediately: true,
  }
);
