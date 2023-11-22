import * as THREE from 'three';
import React, { forwardRef, PropsWithChildren } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  useGLTF,
  View,
  Center,
  Environment,
  MapControls,
  OrbitControls,
  PivotControls,
  RandomizedLight,
} from '@react-three/drei';
import {
  PerspectiveCamera,
  OrthographicCamera,
  AccumulativeShadows,
} from '@react-three/drei';
import { Menu, Button } from '@mantine/core';
import useRefs from 'react-use-refs';
import { create } from 'zustand';
import './index.css?inline';

type Store = {
  projection: 'Perspective';
  top: keyof typeof positions; // 'Back';
  middle: keyof typeof positions; // 'Top';
  bottom: keyof typeof positions; // 'Right';
  setPanelView: (which: string, view: string) => void;
  setProjection: (projection: Store['projection']) => void;
};

const matrix = new THREE.Matrix4();
const positions = {
  Top: [0, 10, 0],
  Bottom: [0, -10, 0],
  Left: [-10, 0, 0],
  Right: [10, 0, 0],
  Back: [0, 0, -10],
  Front: [0, 0, 10],
};

const useStore = create<Store>((set) => ({
  projection: 'Perspective',
  top: 'Back',
  middle: 'Top',
  bottom: 'Right',
  setPanelView: (which, view) => set({ [which]: view }),
  setProjection: (projection) => set({ projection }),
}));

interface Props {
  url?: string;
}

export const MultipleView: React.FC<Props> = ({ url }) => {
  const [view1, view2, view3, view4] = useRefs<HTMLElement>(null);
  return (
    <div className="container">
      <Canvas
        shadows
        frameloop="demand"
        eventSource={document.getElementById('root') as HTMLDivElement}
        className="canvas"
      >
        {/** Each view tracks one of the divs above and creates a sandboxed environment that behaves
             as if it were a normal everyday canvas, <View> will figure out the gl.scissor stuff alone. */}
        <View index={1} track={view1 as any}>
          <CameraSwitcher />
          <PivotControls scale={0.4} depthTest={false} matrix={matrix} />
          <Scene background="aquamarine" matrix={matrix}>
            <AccumulativeShadows
              temporal
              frames={100}
              position={[0, -0.4, 0]}
              scale={14}
              alphaTest={0.85}
              color="orange"
              colorBlend={0.5}
            >
              <RandomizedLight
                amount={8}
                radius={8}
                ambient={0.5}
                position={[5, 5, -10]}
                bias={0.001}
              />
            </AccumulativeShadows>
          </Scene>
          <OrbitControls makeDefault />
        </View>
        <View index={2} track={view2 as any}>
          <PanelCamera which="top" />
          <PivotControls
            activeAxes={[true, true, false]}
            depthTest={false}
            matrix={matrix}
          />
          <Scene background="lightpink" matrix={matrix} />
          <MapControls makeDefault screenSpacePanning enableRotate={false} />
        </View>
        <View index={3} track={view3 as any}>
          <PanelCamera which="middle" />
          <PivotControls
            activeAxes={[true, false, true]}
            depthTest={false}
            matrix={matrix}
          />
          <Scene background="peachpuff" matrix={matrix} />
          <MapControls makeDefault screenSpacePanning enableRotate={false} />
        </View>
        <View index={4} track={view4 as any}>
          <PanelCamera which="bottom" />
          <PivotControls
            activeAxes={[false, true, true]}
            depthTest={false}
            matrix={matrix}
          />
          <Scene background="skyblue" matrix={matrix} />
          <MapControls makeDefault screenSpacePanning enableRotate={false} />
        </View>
      </Canvas>
      {/** Tracking div's, regular HTML and made responsive with CSS media-queries ... */}
      <MainPanel ref={view1} />
      <SidePanel ref={view2} which="top" />
      <SidePanel ref={view3} which="middle" />
      <SidePanel ref={view4} which="bottom" />
    </div>
  );
};

interface SceneProps extends PropsWithChildren {
  background: string;
  matrix: THREE.Matrix4;
}

const Scene: React.FC<SceneProps> = ({
  background = 'white',
  children,
  ...props
}) => {
  const gltf = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bricks/model.gltf'
  );

  return (
    <>
      <color attach="background" args={[background]} />
      <ambientLight />
      <directionalLight
        position={[10, 10, -15]}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={1024}
      />
      {/* <Environment preset="lobby" /> */}
      <group
        matrixAutoUpdate={false}
        // Why onUpdate and not just matrix={matrix} ?
        // This is an implementation detail, overwriting (most) transform objects isn't possible in Threejs
        // because they are defined read-only. Therefore Fiber will always call .copy() if you pass
        // an object, for instance matrix={new THREE.Matrix4()} or position={new THREE.Vector3()}
        // In this rare case we do not want it to copy the matrix, but refer to it.
        onUpdate={(self) => (self.matrix = matrix)}
        {...props}
      >
        <Center>
          <mesh
            castShadow
            geometry={(gltf as any).nodes.bricks.geometry}
            material={(gltf as any).materials['Stone.014']}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color="goldenrod"
              roughness={0}
              metalness={1}
            />
          </mesh>
        </Center>
        {children}
      </group>
    </>
  );
};

const CameraSwitcher: React.FC = () => {
  const projection = useStore((state) => state.projection);
  // Would need to remember the old coordinates to be more useful ...
  return projection === 'Perspective' ? (
    <PerspectiveCamera makeDefault position={[4, 4, 4]} fov={25} />
  ) : (
    <OrthographicCamera makeDefault position={[4, 4, 4]} zoom={280} />
  );
};

type OtherProps = keyof Omit<
  Store,
  'setPanelView' | 'setProjection' | 'projection'
>;

const PanelCamera: React.FC<{
  which: OtherProps;
}> = ({ which }) => {
  const view = useStore((state) => state[which]);
  return (
    <OrthographicCamera
      makeDefault
      position={positions[view] as any}
      zoom={100}
    />
  );
};

const MainPanel = forwardRef<HTMLElement>((props, fref) => {
  const projection = useStore((state) => state.projection);
  const setProjection = useStore((state) => state.setProjection);
  return (
    <div ref={fref as any} className="panel" style={{ gridArea: 'main' }}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>{projection}</Button>
        </Menu.Target>
        <Menu.Dropdown
          onClick={(e) => setProjection((e.target as any).innerText)}
        >
          <Menu.Item>Perspective</Menu.Item>
          <Menu.Item>Orthographic</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
});

const SidePanel = forwardRef<HTMLElement, { which: OtherProps }>(
  ({ which }, fref) => {
    const value = useStore((state) => state[which]);
    const setPanelView = useStore((state) => state.setPanelView);
    return (
      <div ref={fref as any} className="panel" style={{ gridArea: which }}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>{value}</Button>
          </Menu.Target>
          <Menu.Dropdown
            onClick={(e) => setPanelView(which, (e.target as any).innerText)}
          >
            <Menu.Item>Top</Menu.Item>
            <Menu.Item>Bottom</Menu.Item>
            <Menu.Item>Left</Menu.Item>
            <Menu.Item>Right</Menu.Item>
            <Menu.Item>Front</Menu.Item>
            <Menu.Item>Back</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    );
  }
);
