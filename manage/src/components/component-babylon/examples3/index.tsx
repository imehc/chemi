import { useEffect, useRef } from 'react';
import createScene from './config';

const Demo: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: canvas } = ref;
    if (!canvas) return undefined;
    createScene(canvas);
  }, []);

  return <canvas ref={ref} />;
};

export default Demo;
