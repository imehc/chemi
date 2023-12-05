import { useFrame } from '@react-three/fiber';
import { update } from '@tweenjs/tween.js';

export const Tween = () => {
  useFrame(() => {
    update();
  });

  return null;
};
