import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  useRopeJoint,
  useSphericalJoint,
  Physics,
  RigidBody,
  RapierRigidBody,
  BallCollider,
  CuboidCollider,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useMemo, useRef, useState } from 'react';
import { CatmullRomCurve3, DoubleSide, Mesh, Vector3 } from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

/**
 * @see https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber
 */
export const Demo0302 = () => {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      <Physics debug interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
    </Canvas>
  );
};

const Band = () => {
  const band = useRef<Mesh>(null),
    fixed = useRef<RapierRigidBody>(null),
    j1 = useRef<RapierRigidBody>(null),
    j2 = useRef<RapierRigidBody>(null),
    j3 = useRef<RapierRigidBody>(null),
    card = useRef<RapierRigidBody>(null);
  const { vec, ang, rot, dir } = useMemo(
    () => ({
      vec: new Vector3(),
      ang: new Vector3(),
      rot: new Vector3(),
      dir: new Vector3(),
    }),
    []
  );
  const { width, height } = useThree((state) => state.size);
  const curve = useMemo(() => {
    return new CatmullRomCurve3([
      new Vector3(),
      new Vector3(),
      new Vector3(),
      new Vector3(),
    ]);
  }, []);
  const [dragged, drag] = useState<false | Vector3>(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      // Calculate catmul curve
      curve.points[0].copy(j3.current!.translation() as Vector3);
      curve.points[1].copy(j2.current!.translation() as Vector3);
      curve.points[2].copy(j1.current!.translation() as Vector3);
      curve.points[3].copy(fixed.current!.translation() as Vector3);
      (band.current!.geometry as any).setPoints(curve.getPoints(32));
      // Tilt it back towards the screen
      ang.copy(card.current!.angvel() as Vector3);
      rot.copy(card.current!.rotation() as unknown as Vector3);
      card.current!.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        false
      );
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          angularDamping={2}
          linearDamping={2}
          type="fixed"
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2.0, 0, 0]}
          ref={card}
          angularDamping={2}
          linearDamping={2}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <mesh
            onPointerUp={(e) => (
              (e.target as unknown as Element)?.releasePointerCapture(
                e.pointerId
              ),
              drag(false)
            )}
            onPointerDown={(e) => (
              (e.target as unknown as Element)?.setPointerCapture(e.pointerId),
              drag(
                new Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation() as Vector3))
              )
            )}
          >
            <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
            <meshBasicMaterial
              transparent
              opacity={0.25}
              color="white"
              side={DoubleSide}
            />
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          opacity={0.25}
          color="white"
          depthTest={false}
          resolution={[width, height]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
};

export default Demo0302;
