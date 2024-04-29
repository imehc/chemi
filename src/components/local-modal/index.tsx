import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useGLTF,
  TransformControlsProps,
  TransformControls,
} from '@react-three/drei';
import { AnimationMixer, Group, Object3D } from 'three';
import {
  TransformControls as TransformControlsImpl,
  OrbitControls as OrbitControlsImpl,
} from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { useKeyPress } from 'ahooks';
import gsap from 'gsap';
import { IState, useConfigStore } from '~/store';
import { duration } from '~/views/home';

type IPathInfo = IState['modelPaths'][number];

interface Props extends IPathInfo {
  orbitRef: ReturnType<typeof useRef<OrbitControlsImpl | null>>;
}

export const LocalModal: FC<Props> = ({ path, info }) => {
  // TODO: 如果有相关模型信息，就还原之前的模型位置
  const transformRef = useRef<TransformControlsImpl>(null);
  const groupRef = useRef<Group>(null);
  const {
    currentModelConfig,
    updateCurrentModelConfig,
    appendModelConfig,
    setCurrentModel,
  } = useConfigStore();

  const { scene: node, animations } = useGLTF(path.url);
  const mixer = useMemo(() => new AnimationMixer(node), [node]);

  // Press the tab key to switch the control type
  // "scale" , "rotate", "translate"
  const [mode, setMode] = useState<TransformControlsProps['mode']>();
  const [enable, setEnable] = useState<boolean>(false);

  type IParams = Parameters<typeof appendModelConfig>[number];

  const handleRestore = useCallback(
    ({ position, scale, rotation, quaternion }: NonNullable<typeof info>) => {
      const { current: transform } = transformRef;
      const { current: group } = groupRef;
      if (!group || !transform) return;
      gsap.fromTo(
        node.position,
        {
          x: 0,
          y: 0,
          z: -5,
        },
        {
          x: position?.[0] ?? 0,
          y: position?.[1] ?? 0,
          z: position?.[2] ?? 0,
          duration,
          onUpdate: () => {
            node.updateMatrix();
          },
          onComplete: () => {
            setEnable(true);
          },
        }
      );
      gsap.fromTo(
        node.scale,
        {
          x: 0.2,
          y: 0.2,
          z: 0.2,
        },
        {
          x: scale?.[0] ?? 1,
          y: scale?.[1] ?? 1,
          z: scale?.[2] ?? 1,
          duration,
          onUpdate: () => {
            node.updateMatrix();
          },
          onComplete: () => {
            setEnable(true);
          },
        }
      );
      gsap.fromTo(
        node.rotation,
        {
          x: 0,
          y: 0,
          z: -1,
          order: 'XYZ',
        },
        {
          x: rotation?.[0] ?? 0,
          y: rotation?.[1] ?? 0,
          z: rotation?.[2] ?? 0,
          order: rotation?.[3] ?? 'XYZ',
          duration,
          onUpdate: () => {
            node.updateMatrix();
          },
          onComplete: () => {
            setEnable(true);
          },
        }
      );
      gsap.fromTo(
        node.quaternion,
        {
          x: 0,
          y: 0,
          z: 0,
          2: 0,
        },
        {
          x: quaternion?.[0] ?? 0,
          y: quaternion?.[1] ?? 0,
          z: quaternion?.[2] ?? 0,
          w: quaternion?.[3] ?? 0,
          duration,
          onUpdate: () => {
            node.updateMatrix();
          },
          onComplete: () => {
            setEnable(true);
          },
        }
      );
    },
    [node]
  );

  useEffect(() => {
    if (info) {
      // 还原模型位置
      appendModelConfig({ uuid: node.uuid, path, info });
      handleRestore(info);
      return;
    }
    const { position, rotation, scale, quaternion, parent, uuid } = node;
    // 默认模型位置
    const params = {
      uuid,
      path,
      info: {
        position: position.toArray(),
        rotation: rotation.toArray(),
        quaternion: quaternion.toArray(),
        scale: scale.toArray(),
        parentId: parent?.id,
      },
    } satisfies IParams;
    setEnable(true);
    appendModelConfig(params);
  }, [appendModelConfig, handleRestore, info, node, path]);

  const isSelect = useMemo(
    () => currentModelConfig?.uuid === node.uuid,
    [currentModelConfig?.uuid, node.uuid]
  );

  useEffect(() => {
    const { current: transform } = transformRef;
    if (!transform) return;

    return () => {
      transform?.dispose?.();
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
    const { position, scale, rotation, quaternion, parent } = transform[
      'object'
    ] as Object3D;
    updateCurrentModelConfig({
      ...currentModelConfig,
      info: {
        position: position.toArray(),
        scale: scale.toArray(),
        rotation: rotation.toArray(),
        quaternion: quaternion.toArray(),
        parentId: parent?.id,
      },
    });
  }, [currentModelConfig, updateCurrentModelConfig]);

  return (
    <TransformControls
      object={node}
      enabled={enable}
      ref={transformRef}
      showX={isSelect}
      showY={isSelect}
      showZ={isSelect}
      mode={mode}
      onMouseUp={onControlChange}
    >
      <group ref={groupRef} dispose={null}>
        <primitive
          key={node.uuid}
          object={node}
          onClick={() => setCurrentModel(node.uuid)}
        />
      </group>
    </TransformControls>
  );
};
