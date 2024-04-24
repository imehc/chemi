import { FC } from 'react';
import { useEnvironment, Environment } from '@react-three/drei';
import { useThree } from "@react-three/fiber";

export const EnvBackground: FC = () => {
  const { scene } = useThree()
  // https://github.com/pmndrs/drei?tab=readme-ov-file#useenvironment
  const envMap = useEnvironment({
    files: '/hdris/hochsal_field_1k.hdr',
  });

  return <Environment map={envMap} background />;
};

// useGLTF.preload('/v212/models/armchair-transformed.glb');