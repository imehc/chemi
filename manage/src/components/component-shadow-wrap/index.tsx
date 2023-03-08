import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

/**
 * 当前滚动条的位置
 * @param top 有滚动条但未滚动
 * @param bottom 有滚动条且滚动到底部
 * @param center 有滚动条且离顶部和底部都有一段距离
 * @param none 没有滚动条
 */
type ScrollState = 'top' | 'bottom' | 'center' | 'none';

export const ShadowWrap: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [scrollState, setScrollState] = useState<ScrollState>('none');

  useEffect(() => {
    const { current: wrap } = wrapRef;
    if (!wrap) {
      return;
    }
    const { scrollHeight, scrollTop, clientHeight } = wrap;

    if (scrollHeight < clientHeight) {
      setScrollState('none');
    }

    if (scrollHeight > clientHeight && scrollTop === 0) {
      setScrollState('top');
    }

    const hander = () => {
      const { scrollTop } = wrap;
      if (scrollTop + clientHeight === scrollHeight) {
        setScrollState('bottom');
        return;
      }
      if (scrollTop === 0) {
        setScrollState('top');
        return;
      }
      setScrollState('center');
    };

    wrap.addEventListener('scroll', hander);

    return () => {
      wrap.removeEventListener('scroll', hander);
    };
  }, []);

  return (
    <div className="relative inline-block overflow-hidden">
      <Wrap
        className="w-full h-full"
        ref={wrapRef}
        {...props}
        state={scrollState}
      />
    </div>
  );
};

const Wrap = styled.div<{ state?: ScrollState }>`
  /* Chrome Safari */
  ::-webkit-scrollbar {
    display: none;
  }
  /* firefox */
  scrollbar-width: none;
  /* IE 10+ */
  -ms-overflow-style: none;
  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: ${(props) => {
      switch (props?.state) {
        case 'bottom':
        case 'center':
          return 0;
        default:
          return "-10%";
      }
    }};
    left: 0;
    width: 100%;
    height: 10%;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    transition: all ease-in 0.3s;
  }
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    bottom: ${(props) => {
      switch (props?.state) {
        case 'top':
        case 'center':
          return 0;
        default:
          return "-10%";
      }
    }};
    left: 0;
    width: 100%;
    height: 10%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    transition: all ease-in 0.3s;
  }
`;
