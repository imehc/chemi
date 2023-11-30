import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useControls } from 'leva';
import { useGLTF } from '@react-three/drei';

interface Props {
  url: string;
}

export const Model: React.FC<Props> = ({ url }) => {
  const { scene } = useGLTF(url);

  return <primitive object={scene} />;
};
