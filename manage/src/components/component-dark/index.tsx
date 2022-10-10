import { useEffect, useRef } from 'react';
import { useColor } from '~/hooks';

export const DarkDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current: dom } = ref;
    if (!dom) {
      return undefined;
    }
    let media = window.matchMedia('(prefers-color-scheme:dark)');
    if (media.matches) {
      dom.innerText = '监听到模式: 黑暗';
    } else {
      dom.innerText = '监听到模式: 亮色';
    }
  }, []);
  const color = useColor();
  console.log(color, 'color...');
  return <div ref={ref}></div>;
};
