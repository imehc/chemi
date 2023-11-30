import { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { useKeyboard } from './useKeyboard';
import { Mesh } from 'three';

interface Props extends MeshProps {
  selected?: boolean;
  keyMap: ReturnType<typeof useKeyboard>;
}

export const Box: React.FC<Props> = ({
  selected: _selected = false,
  keyMap,
  ...props
}) => {
  const ref = useRef<Mesh>(null);
  const [selected, setSelected] = useState(_selected);

  useFrame((_, delta) => {
    if (!ref.current) return;
    keyMap['KeyA'] && selected && (ref.current.position.x -= 1 * delta);
    keyMap['KeyD'] && selected && (ref.current.position.x += 1 * delta);
    keyMap['KeyW'] && selected && (ref.current.position.z -= 1 * delta);
    keyMap['KeyS'] && selected && (ref.current.position.z += 1 * delta);
  });

  return (
    <mesh
      ref={ref}
      {...props}
      onPointerDown={(e) => {
        e.stopPropagation();
        setSelected(!selected);
      }}
    >
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={!selected} />
    </mesh>
  );
};
