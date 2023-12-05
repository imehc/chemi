import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Easing, Tween } from '@tweenjs/tween.js';
import { button, useControls } from 'leva';
import { GLTFResult } from '~/types/use_gltf';
import annotations from './annotations.json';

interface Props {
  controls: any;
}

export const Arena: React.FC<Props> = ({ controls }) => {
  const { nodes, materials } = useGLTF(
    '/models/collision-world.glb'
  ) as GLTFResult;
  const { camera } = useThree();

  useControls('Camera', () => {
    console.log('creating buttons');
    const _buttons = annotations.reduce(
      (acc, { title, position, lookAt }) =>
        Object.assign(acc, {
          [title]: button(() => {
            new Tween(controls.current.target)
              .to(
                {
                  x: lookAt.x,
                  y: lookAt.y,
                  z: lookAt.z,
                },
                2100
              )
              .easing(Easing.Cubic.Out)
              .start();

            new Tween(camera.position)
              .to(
                {
                  x: position.x,
                  y: position.y,
                  z: position.z,
                },
                2100
              )
              .easing(Easing.Cubic.Out)
              .start();
          }),
        }),
      {}
    );
    return _buttons;
  });

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Cube004.geometry}
        material={materials['Material.001']}
        position={[7.68, -5.59, 26.38]}
        scale={0.5}
        castShadow
        receiveShadow
        material-envMapIntensity={0.4}
        onDoubleClick={({ point }) => {
          new Tween(controls.current.target)
            .to(
              {
                x: point.x,
                y: point.y,
                z: point.z,
              },
              1000
            )
            .easing(Easing.Cubic.Out)
            .start();
        }}
      ></mesh>
    </group>
  );
};
