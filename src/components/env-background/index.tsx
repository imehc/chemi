import { FC, useCallback, useEffect, useRef } from 'react';
import { useEnvironment, Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useConfigStore } from '~/store';
import { useThrottleFn } from 'ahooks';

interface Props {
  orbitRef: ReturnType<typeof useRef<OrbitControlsImpl | null>>;
}

export const EnvBackground: FC<Props> = ({ orbitRef }) => {
  const setSceneConfig = useConfigStore((state) => state.setSceneConfig);
  const { camera } = useThree();

  useEffect(() => {
    const { current: orbit } = orbitRef;
    if (!orbit) return;
    orbit.position0 = camera.position;
  }, [camera.position, orbitRef]);

  // https://github.com/pmndrs/drei?tab=readme-ov-file#useenvironment
  const envMap = useEnvironment({
    files: '/hdris/hochsal_field_4k.hdr',
  });

  const handleSetSceneConfig = useCallback(() => {
    setSceneConfig({
      camera: {
        position: camera.position.clone(),
        rotation: camera.rotation.clone(),
        scale: camera.scale.clone(),
      },
    });
  }, [camera, setSceneConfig]);

  const { run } = useThrottleFn(handleSetSceneConfig, { wait: 100000 });

  useFrame(() => {
    const { current: orbit } = orbitRef;
    if (!orbit) return;
    run();
  });

  return <Environment map={envMap} background />;
};

// useGLTF.preload('/v212/models/armchair-transformed.glb');
