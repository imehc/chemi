import styled from '@emotion/styled';
import clsx from 'clsx';
import { type ReactNode, type FC, useRef, useEffect, useState } from 'react';

interface Props {
  children?: ReactNode;
}

export const ScrollWrap: FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = useState<boolean>(false);
  const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(false);

  useEffect(() => {
    const { current: dom } = ref;
    if (!dom) {
      return;
    }
    // 是否可滚动
    if (!(dom.scrollHeight > dom.clientHeight)) {
      hasScroll && setHasScroll(false);
      return;
    }

    !hasScroll && setHasScroll(true);

    const hander = () => {
      const clientHeight = dom.clientHeight;
      const scrollTop = dom.scrollTop;
      const scrollHeight = dom.scrollHeight;
      if (clientHeight + scrollTop === scrollHeight) {
        !isScrollToBottom && setIsScrollToBottom(true);
        return;
      }
      isScrollToBottom && setIsScrollToBottom(false);
    };
    dom.addEventListener('scroll', hander);

    return () => {
      dom.removeEventListener('scroll', hander);
    };
  }, [hasScroll, isScrollToBottom]);

  console.log(hasScroll, isScrollToBottom, 'hasScroll');

  return (
    <Outer
      className="w-full h-full relative bg-orange-100 overflow-hidden"
      isScrollToBottom={!isScrollToBottom}
    >
      <Wrap ref={ref} className="overflow-y-auto w-full h-full">
        {children}
      </Wrap>
    </Outer>
  );
};

const Outer = styled.div<{ isScrollToBottom?: boolean }>`
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    pointer-events: none;
    background: ${(props) =>
      props?.isScrollToBottom
        ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));'
        : 'transparent'};
  }
`;

const Wrap = styled.div`
  overflow: -moz-hidden-unscrollable;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  /* width: calc(100vw + 18px); */
  overflow: auto;
`;
