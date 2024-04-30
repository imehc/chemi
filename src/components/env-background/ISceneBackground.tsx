import { FC, useEffect } from 'react';
import { MathUtils, PerspectiveCamera } from 'three';
import { useThree } from '@react-three/fiber';
import { Environment, useEnvironment } from '@react-three/drei';
import gsap from 'gsap';
import { duration } from '~/views/home';
import { EnvBackgroundProps } from '.';
import { OrbitControls } from 'three-stdlib';

export const ISceneBackground: FC<EnvBackgroundProps> = ({
  scene: defaultScene,
}) => {
  const { camera, controls } = useThree();
  useEffect(() => {
    const controls_ = controls as OrbitControls;
    if (!controls_) return;
    controls_.maxDistance = 9;
    controls_.maxPolarAngle = MathUtils.degToRad(90);
  }, [controls]);

  useEffect(() => {
    const controls_ = controls as OrbitControls;
    if (!controls_) return;
    if (!defaultScene || !controls_) return;
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
      controls_.enabled = false;
    };
    const handleEnd = () => {
      controls_.enabled = true;
    };
    gsap.to(camera.position, {
      x: _camera.position?.[0] ?? 0,
      y: _camera.position?.[1] ?? 0,
      z: _camera.position?.[2] ?? 0,
      duration,
      onStart: handleStart,
      onComplete: handleEnd,
    });
    gsap.to(controls_.target, {
      x: _controls.target?.[0] ?? 0,
      y: _controls.target?.[1] ?? 0,
      z: _controls.target?.[2] ?? 0,
      duration,
      onUpdate: () => {
        controls_.update();
      },
      onStart: handleStart,
      onComplete: handleEnd,
    });
    gsap.to(camera as PerspectiveCamera, {
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
    gsap.to(controls_.object, {
      zoom: _controls.zoom,
      duration,
      onUpdate: () => {
        controls_.object.updateProjectionMatrix();
      },
      onStart: handleStart,
      onComplete: handleEnd,
    });

    return () => {
      controls_.dispose();
    };
  }, [camera, camera.position, controls, defaultScene]);

  // https://codesandbox.io/p/sandbox/environment-blur-and-transitions-pj7zjq?file=%2Fsrc%2FApp.js

  // https://github.com/pmndrs/drei?tab=readme-ov-file#useenvironment
  const envMap = useEnvironment({
    files: '/hdris/hochsal_field_4k.hdr',
  });
  return (
    <>
      <directionalLight position={[0, 0, 10]} />
      <pointLight position={[0, 0, 10]} />
      <Environment map={envMap} background />
      {/* <Environment preset="park" /> */}
    </>
  );
};
