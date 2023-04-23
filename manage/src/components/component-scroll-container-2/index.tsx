import {
  type HTMLAttributes,
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import styled from '@emotion/styled';

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * 遮罩的高度
   * @default 30
   */
  maskHeight?: number;
  /**
   * 遮罩的颜色
   * @default #ffffff
   */
  maskColor?: string;
}

export const ScrollContainer2: React.FC<Props> = ({
  maskHeight = 30,
  maskColor = '#ffffff',
  className,
  style,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isScroll, setIsScroll] = useState<boolean>(() => false);
  const [maskTop, setMaskTop] = useState<number>(() => 0);
  const [maskBottom, setMaskBottom] = useState<number>(() => maskHeight);

  const handleScroll = useCallback(() => {
    const { current: container } = ref;
    if (!container || !isScroll) {
      return;
    }
    const { height } = container.getBoundingClientRect();
    const { scrollTop, scrollHeight } = container;
    setMaskTop(scrollTop);
    setMaskBottom(scrollHeight - (height + scrollTop));
  }, [isScroll]);

  useLayoutEffect(() => {
    const { current: container } = ref;
    if (!container) {
      return;
    }
    const { height } = container.getBoundingClientRect();
    const { scrollHeight } = container;
    if (height !== scrollHeight) {
      setIsScroll(true);
      return;
    }
    setIsScroll(false);
  }, []);

  return (
    <ContainerWrap
      maskHeight={maskHeight}
      bg={maskColor}
      maskTop={maskTop}
      maskBottom={maskBottom}
      isScroll={isScroll}
      className={className}
      style={style}
    >
      <div
        {...props}
        ref={ref}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-auto"
      >
        {children}
      </div>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div<{
  maskHeight: number;
  maskTop: number;
  maskBottom: number;
  isScroll: boolean;
  bg: string;
}>`
  overflow: hidden;
  & > div {
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: ${({ maskHeight, maskTop, isScroll }) => {
      if (isScroll) {
        if (-maskHeight + maskTop >= 0) {
          return 0;
        }
        return -maskHeight + maskTop + 'px';
      }
      return -maskHeight + 'px';
    }};
    left: 0;
    width: 100%;
    height: ${({ maskHeight }) => maskHeight + 'px'};
    background: ${({ bg }) =>
      'linear-gradient(180deg, ' + bg + ', transparent)'};
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    position: absolute;
    bottom: ${({ maskHeight, maskBottom, isScroll }) => {
      if (isScroll) {
        if (-maskHeight + maskBottom >= 0) {
          return 0;
        }
        return -maskHeight + maskBottom + 'px';
      }
      return -maskHeight + 'px';
    }};
    left: 0;
    width: 100%;
    height: ${({ maskHeight }) => maskHeight + 'px'};
    background: ${({ bg }) =>
      'linear-gradient(180deg, transparent, ' + bg + ')'};
    pointer-events: none;
  }
`;
