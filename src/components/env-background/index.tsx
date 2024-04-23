import { FC } from 'react';
import { useEnvironment, Environment } from '@react-three/drei';
import { useThree } from "@react-three/fiber";

export const EnvBackground: FC = () => {
  const { scene } = useThree()
  const envMap = useEnvironment({
    files: '/hdris/hochsal_field_1k.hdr',
  });

  return <Environment map={envMap} background />;
};
