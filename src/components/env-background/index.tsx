import { FC, useCallback } from 'react';
import { PerspectiveCamera } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three-stdlib';
import { useConfigStore, IState } from '~/store';
import { useThrottleFn } from 'ahooks';
import { ISceneBackground } from './ISceneBackground';

export interface EnvBackgroundProps {
  scene?: IState['sceneConfig'];
}

export const EnvBackground: FC<EnvBackgroundProps> = (props) => {
  // TODO: 如果有info相关信息，就设置场景位置
  const [sceneConfig, setSceneConfig] = useConfigStore((state) => [
    state.sceneConfig,
    state.setSceneConfig,
  ]);
  const { camera, controls } = useThree();

  const handleSetSceneConfig = useCallback(() => {
    const controls_ = controls as OrbitControls;
    if (!controls_) return;
    const { position, near, far, fov } = camera as PerspectiveCamera;
    const {
      target,
      object: { zoom },
    } = controls_;
    setSceneConfig({
      ...sceneConfig,
      camera: { position: position.toArray(), near, far, fov },
      controls: { target: target.toArray(), zoom },
    });
  }, [camera, controls, sceneConfig, setSceneConfig]);

  const { run } = useThrottleFn(handleSetSceneConfig, { wait: 10000 });

  useFrame(() => {
    const controls_ = controls as OrbitControls;
    if (!controls_) return;
    run();
  });

  return (
    <>
      <ISceneBackground {...props} />
    </>
  );
};
