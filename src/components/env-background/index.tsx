import { FC, useCallback, useEffect, useRef } from 'react';
import { PerspectiveCamera as PerspectiveCameraImpl } from 'three';
import { useEnvironment, Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import gsap from 'gsap';
import { useConfigStore, IState } from '~/store';
import { useThrottleFn } from 'ahooks';
import { duration } from '~/views/home';

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
    const handleStart = () => {
      orbit.enabled = false;
    };
    const handleEnd = () => {
      orbit.enabled = true;
    };
    gsap.to(camera.position, {
      x: _camera.position?.[0] ?? 0,
      y: _camera.position?.[1] ?? 0,
      z: _camera.position?.[2] ?? 0,
      duration,
      onStart: handleStart,
      onComplete: handleEnd,
    });
    gsap.to(orbit.target, {
      x: _controls.target?.[0] ?? 0,
      y: _controls.target?.[1] ?? 0,
      z: _controls.target?.[2] ?? 0,
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
      camera: { position: position.toArray(), near, far, fov },
      controls: { target: target.toArray(), zoom },
    });
  }, [camera, orbitRef, setSceneConfig]);

  const { run } = useThrottleFn(handleSetSceneConfig, { wait: 10000 });

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
