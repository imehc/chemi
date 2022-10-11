import React, { useEffect, useRef, useState } from 'react';
import { useInfinite } from '~/hooks';
import { lazyLoaded } from '~/utils/lazy-loaded';

export const IntersectionObserverDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<Element>();
  useEffect(() => {
    const e = document.getElementById('footer');
    e && setElement(e);
  }, []);
  useInfinite(element!, () => {
    console.log('滚动到底部。。。');
  });
  useEffect(() => {
    const { current: element } = ref;
    if (!element) return;
    lazyLoaded(element);
  }, []);

  type abc = {
    btn: string;
    ctn: string;
    dtn: string;
  };
  type bcd = {
    one: string;
    two: string;
    three: string;
  };
  const types: BEM<keyof abc, ['price', 'coin'], [keyof bcd]> = 'btn_price-one';
  console.log(types,'types')

  return (
    <div ref={ref} style={{ height: '2000px' }}>
      IntersectionObserver
    </div>
  );
};
