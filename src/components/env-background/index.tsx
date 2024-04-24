import { FC } from 'react';
import { useEnvironment, Environment } from '@react-three/drei';

export const EnvBackground: FC = () => {
  // https://github.com/pmndrs/drei?tab=readme-ov-file#useenvironment
  const envMap = useEnvironment({
    files: '/hdris/hochsal_field_1k.hdr',
  });

  return <Environment map={envMap} background />;
};

// useGLTF.preload('/v212/models/armchair-transformed.glb');