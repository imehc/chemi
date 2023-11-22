import { Html, OrbitControls, Sky } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Box3, MOUSE, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls as OrbitControlsProps } from 'three/examples/jsm/controls/OrbitControls';

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
    <Canvas>
      <Sky />
      <Suspense
        fallback={
          <Html className="flex flex-col h-full items-center justify-center w-full">
            <p className="text-lg whitespace-nowrap">加载中...</p>
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

  const { scene } = useLoader(GLTFLoader, url, (progress) => {});
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsProps>(null);
  // 获取包围盒
  const box = useMemo(() => new Box3().setFromObject(scene), [scene]);

  // 获取中心点作为控制器目标
  const target = useMemo(
    () => new Vector3().copy(box.getCenter(new Vector3())),
    [box]
  );

  useEffect(() => {
    if (!controlsRef.current) {
      return;
    }
    // 计算相机与模型的距离
    const distance = box.getSize(new Vector3()).length();
    // 根据模型大小调整相机位置
    const offset =
      distance /
      Math.tan(
        (Math.PI / 180.0) * (camera as THREE.PerspectiveCamera).fov * 0.5
      );

    // 设置相机位置和目标点
    controlsRef.current.target.copy(target);
    controlsRef.current.object.position.set(
      target.x,
      target.y,
      target.z + offset
    );
    controlsRef.current.update();
  }, [box, camera, target]);

  return (
    <primitive object={scene}>
      <OrbitControls
        ref={controlsRef}
        target={target}
        enableDamping // 是否启用阻尼效果,默认为false
        dampingFactor={0.1} // 适中的缓动效果,范围是0到1
      />
    </primitive>
  );
};
