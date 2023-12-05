import { useMemo } from 'react';
import { Group, Object3DEventMap, Scene } from 'three';
import { Octree } from 'three/examples/jsm/math/Octree';

/**
 * 用于从三维场景中构建八叉树,以支持更高效的空间查询需求
 */
export const useOctree = (scene: Group<Object3DEventMap>) => {
  const octree = useMemo(() => {
    console.log('new Octree');
    return new Octree().fromGraphNode(scene);
  }, [scene]);

  return octree;
};
