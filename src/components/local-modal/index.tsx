import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useGLTF,
  TransformControls,
  TransformControlsProps,
} from '@react-three/drei';
import { AnimationMixer, Object3D } from 'three';
import {
  TransformControls as TransformControlsImpl,
  OrbitControls as OrbitControlsImpl,
} from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { useKeyPress } from 'ahooks';
import { IPath, useConfigStore } from '~/store';

interface Props extends IPath {
  orbitRef: ReturnType<typeof useRef<OrbitControlsImpl | null>>;
}

export const LocalModal: FC<Props> = ({ url, type }) => {
  const transformRef = useRef<TransformControlsImpl>(null);
  const {
    currentModelConfig,
    updateCurrentModelConfig,
    appendModelConfig,
    setCurrentModel,
  } = useConfigStore();

  const { scene, animations } = useGLTF(url);
  const mixer = useMemo(() => new AnimationMixer(scene), [scene]);

  type IParams = Parameters<typeof appendModelConfig>[number];

  useEffect(() => {
    const params = {
      uuid: scene.uuid,
      path: { url, type },
      info: {
        position: scene.position.clone(),
        rotation: scene.rotation.clone(),
        scale: scene.scale.clone(),
      },
    } satisfies IParams;
    appendModelConfig(params);
  }, [
    appendModelConfig,
    scene.position,
    scene.rotation,
    scene.scale,
    scene.uuid,
    type,
    url,
  ]);

  const isSelect = useMemo(
    () => currentModelConfig?.uuid === scene.uuid,
    [currentModelConfig?.uuid, scene.uuid]
  );
  // Press the tab key to switch the control type
  // "scale" , "rotate", "translate"
  const [mode, setMode] = useState<TransformControlsProps['mode']>();

  useEffect(() => {
    const { current: transform } = transformRef;
    if (!transform) return;

    return () => {
      transform.dispose();
    };
  }, []);

  useEffect(() => {
    if (animations.length) {
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }
  }, [animations, mixer]);

  useKeyPress('tab', (e) => {
    e.preventDefault();
    let tmp = mode;
    switch (tmp) {
      case 'scale':
        tmp = 'rotate';
        break;
      case 'rotate':
        tmp = 'translate';
        break;
      default:
        tmp = 'scale';
        break;
    }
    setMode(tmp);
  });

  useFrame((_, delta) => {
    mixer?.update(delta);
  });

  const onControlChange = useCallback(() => {
    const { current: transform } = transformRef;
    if (!transform || !currentModelConfig) return;
    const { position, scale, rotation } = transform['object'] as Object3D;
    updateCurrentModelConfig({
      ...currentModelConfig,
      info: { position, scale, rotation },
    });
  }, [currentModelConfig, updateCurrentModelConfig]);

  return (
    <TransformControls
      ref={transformRef}
      showX={isSelect}
      showY={isSelect}
      showZ={isSelect}
      mode={mode}
      onMouseUp={onControlChange}
    >
      <primitive object={scene} onClick={() => setCurrentModel(scene.uuid)} />
    </TransformControls>
  );
};
