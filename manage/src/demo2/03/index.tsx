import { Stats, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Box } from './Box';

/**
 * 嵌套组件
 */
export const Demoo003 = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <Box position-x={-2.5}>
        <Box position-x={1.25}>
          <Box position-x={1.25}>
            <Box position-x={1.25}>
              <Box position-x={1.25} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Canvas>
  );
};
