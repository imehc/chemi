import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  useGLTF,
  TransformControls,
  TransformControlsProps,
} from '@react-three/drei';
import { Group, AnimationMixer } from 'three';
import {
  TransformControls as TransformControlsImpl,
  OrbitControls as OrbitControlsImpl,
} from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { useKeyPress } from 'ahooks';

interface Props {
  orbitRef: ReturnType<typeof useRef<OrbitControlsImpl | null>>;
  url: string;
  select: string | undefined;
  onSelect(uuid: string): void;
}

export const LocalModal: FC<Props> = ({ url, orbitRef, select, onSelect }) => {
  const onSelectRef = useRef(onSelect);
  const transformRef = useRef<TransformControlsImpl>(null);
  const groupRef = useRef<Group>(null);

  const { scene, animations } = useGLTF(url);
  const mixer = useMemo(() => new AnimationMixer(scene), [scene]);
  useEffect(() => {
    onSelectRef.current(scene.uuid);
  }, [scene.uuid]);

  const isSelect = useMemo(() => select === scene.uuid, [scene.uuid, select]);
  // Press the tab key to switch the control type
  // "scale" , "rotate", "translate"
  const [mode, setMode] = useState<TransformControlsProps['mode']>();

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
    orbitRef.current?.update();
    mixer?.update(delta);
  });

  return (
    <TransformControls
      ref={transformRef}
      showX={isSelect}
      showY={isSelect}
      showZ={isSelect}
      mode={mode}
    >
      <group ref={groupRef} onClick={() => onSelectRef.current(scene.uuid)}>
        <primitive object={scene} />
      </group>
    </TransformControls>
  );
};
