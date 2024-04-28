import { FC, useCallback, useEffect, useRef } from 'react';
import { PerspectiveCamera as PerspectiveCameraImpl, Vector3 } from 'three';
import { useEnvironment, Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import gsap from 'gsap';
import { useConfigStore, IState } from '~/store';
import { useThrottleFn } from 'ahooks';

interface Props {
  orbitRef: ReturnType<typeof useRef<OrbitControlsImpl | null>>;
  scene?: IState['sceneConfig'];
}

export const EnvBackground: FC<Props> = ({ orbitRef, scene: defaultScene }) => {
  // TODO: 如果有info相关信息，就设置场景位置
  const setSceneConfig = useConfigStore((state) => state.setSceneConfig);
  const { camera } = useThree();

  useEffect(() => {
    const { current: orbit } = orbitRef;
    if (!orbit || !defaultScene) return;
    const { camera: _camera, controls: _controls } = defaultScene;
    const { x, y, z } = (_camera?.position ?? new Vector3(0, 0, 0)) as Vector3;
    const {
      x: x2,
      y: y2,
      z: z2,
    } = (_controls?.target ?? new Vector3(0, 0, 0)) as Vector3;
    // camera.position.set(x, y, z);
    // orbit.target.set(x2, y2, z2);
    // camera.near = _camera.near ?? 0.3;
    // camera.far = _camera.far ?? 100;
    // (camera as PerspectiveCameraImpl).fov = _camera.fov ?? 40;
    // camera.updateProjectionMatrix();
    // orbit.object.zoom = _controls.zoom ?? 1;
    // orbit.object.updateProjectionMatrix();
    // orbit.update();

    // 过渡动画
    // 将过渡动画的持续时间设置为3秒
    const duration = 3;
    const handleStart = () => {
      orbit.enabled = false;
    };
    const handleEnd = () => {
      orbit.enabled = true;
    };
    gsap.to(camera.position, {
      x,
      y,
      z,
      duration,
      onStart: handleStart,
      onComplete: handleEnd,
    });
    gsap.to(orbit.target, {
      x: x2,
      y: y2,
      z: z2,
      duration,
      onUpdate: () => {
        orbit.update();
      },
      onStart: handleStart,
      onComplete: handleEnd,
    });
    gsap.to(camera as PerspectiveCameraImpl, {
      near: _camera.near ?? 0.3,
      far: _camera.far ?? 100,
      fov: _camera.fov ?? 40,
      duration,
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
      onStart: handleStart,
      onComplete: handleEnd,
    });
    gsap.to(orbit.object, {
      zoom: _controls.zoom,
      duration,
      onUpdate: () => {
        orbit.object.updateProjectionMatrix();
      },
      onStart: handleStart,
      onComplete: handleEnd,
    });

    return () => {
      orbit.dispose();
    };
  }, [camera, camera.position, defaultScene, orbitRef]);

  // https://github.com/pmndrs/drei?tab=readme-ov-file#useenvironment
  const envMap = useEnvironment({
    files: '/hdris/hochsal_field_4k.hdr',
  });

  const handleSetSceneConfig = useCallback(() => {
    const { current: orbit } = orbitRef;
    if (!orbit) return;
    const { position, near, far, fov } = camera as PerspectiveCameraImpl;
    const {
      target,
      object: { zoom },
    } = orbit;
    setSceneConfig({
      camera: { position, near, far, fov },
      controls: { target, zoom },
    });
  }, [camera, orbitRef, setSceneConfig]);

  const { run } = useThrottleFn(handleSetSceneConfig, { wait: 100000 });

  useFrame(() => {
    const { current: orbit } = orbitRef;
    if (!orbit) return;
    run();
  });

  return (
    <>
      <Environment map={envMap} background />
    </>
  );
};

// useGLTF.preload('/v212/models/armchair-transformed.glb');
