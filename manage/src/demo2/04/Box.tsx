import { useEffect, useMemo, useRef, useState } from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { Color, Mesh, MeshStandardMaterial } from 'three';
import { Text } from '@react-three/drei';

export const Box: React.FC<MeshProps> = (props) => {
  const ref = useRef<Mesh>(null);
  const [count, setCount] = useState(0);
  const black = useMemo(() => new Color('black'), []);

  console.log('Box ' + props.name + ' count=' + count);

  useEffect(() => {
    if (!ref.current) return;
    (ref.current.material as MeshStandardMaterial).color.set(0x00ff00);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    (ref.current.material as MeshStandardMaterial).color.lerp(black, 0.1);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={(e) => {
        //e.stopPropagation()
        setCount(count + 1);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial />
      <Text fontSize={0.5} font="monospace" position-z={0.501}>
        {count}
      </Text>
      {props.children}
    </mesh>
  );
};
