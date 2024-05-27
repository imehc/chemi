import type { AttributifyAttributes } from 'unocss/preset-attributify';
import type { Object3DNode, MaterialNode } from '@react-three/fiber';

/**
 * unocss docs
 * @link https://venerable-strudel-d42cce.netlify.app/presets/attributify.html
 */
declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}
