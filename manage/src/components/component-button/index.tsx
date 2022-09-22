import styled from '@emotion/styled';
import clsx from 'clsx';
import React, {
  HtmlHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
  start?: React.ReactNode;
  children: React.ReactNode;
  size?: 'default' | 'small';
  theme?: 'primary' | 'second' | 'hover-primary' | 'delete';
}

type StyledButtonType = Required<Pick<Props, 'size' | 'theme'>>;

export const CustomButton: React.FC<Props> = ({
  start,
  children,
  size = 'default',
  theme = 'primary',
  ...props
}): JSX.Element => {
  const ref = useRef(null);

  const btnId = useMemo(() => 'custom-btn', []);

  useEffect(() => {
    if (!ref.current || theme === 'second') {
      return;
    }
    let timer: ReturnType<typeof setTimeout>;

    const generateRipples = (e: MouseEvent) => {
      const { left, top } = searchElement(e);
      let ripples = document.createElement('div');
      ripples.setAttribute('id', 'custom-btn-mask');
      ripples.style.left = left + 'px';
      ripples.style.top = top + 'px';
      dom.appendChild(ripples);
      timer = setTimeout(() => {
        dom.removeChild(ripples);
      }, 1000);
    };
    const dom: HTMLButtonElement = ref.current;
    dom.addEventListener('click', generateRipples);

    return () => {
      dom.removeEventListener('click', generateRipples);
      timer && clearTimeout(timer);
    };
  }, [ref]);

  const searchElement = useCallback(
    (e: MouseEvent): { left: number; top: number } => {
      const r = {
        left: 0,
        top: 0,
      };
      console.log(e.target, '1234...');
      console.log((e.target as any).offsetParent, '123...');
      const attr = (e.target as Element).getAttribute('id');
      if (attr && attr === btnId) {
        console.log('222');
        r.left = e.offsetX;
        r.top = e.offsetY;
      }
      // else {
      //   searchElement((e.target as any).offsetParent);
      // }
      return r;
    },
    []
  );

  const style = useMemo(() => {
    return `
      #custom-btn-mask {
        position: absolute;
        z-index: 999;
        background: #fff;
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-radius: 50%;
        animation: animate 1s linear infinite;
      }
    `;
  }, []);

  return (
    <Button id={btnId} ref={ref} theme={theme} size={size} {...props}>
      <style>{style}</style>
      {start && <span className="shrink-0">{start}</span>}
      <span
        className={clsx(
          'shrink overflow-hidden whitespace-nowrap text-ellipsis',
          { 'ml-2': !!start }
        )}
      >
        {children}
      </span>
    </Button>
  );
};

const Button = styled.button`
  height: ${(props: StyledButtonType) => {
    if (props.size === 'default') {
      return '2.5rem';
    }
    return '1.75rem';
  }};
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: ${(props: StyledButtonType) => {
    if (props.theme === 'second' || props.theme === 'hover-primary') {
      return '0.0625rem solid #DCDEEA';
    }
    return 'none';
  }};
  color: ${(props: StyledButtonType) => {
    switch (props.theme) {
      case 'second':
      case 'hover-primary':
        return '#9A9FA5';
      default:
        return '#ffffff;';
    }
  }};
  font-weight: 400;
  outline: none;
  user-select: none;
  overflow: hidden;
  background: ${(props: StyledButtonType) => {
    const bg = 'linear-gradient(to bottom right, #6f88ff,#4c4de2)';
    switch (props.theme) {
      case 'primary':
        return bg;
      case 'delete':
        return '#FF5F5F';
      default:
        return '#ffffff;';
    }
  }};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props: StyledButtonType) => {
    const sd =
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)';
    switch (props.theme) {
      case 'second':
      case 'hover-primary':
        return 'none';
      default:
        return sd;
    }
  }};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    box-shadow: ${(props: StyledButtonType) => {
      const sd =
        '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)';
      switch (props.theme) {
        case 'second':
        case 'hover-primary':
          return 'none';
        default:
          return sd;
      }
    }};
    background: ${(props: StyledButtonType) => {
      const bg = 'linear-gradient(to bottom right, #6f88ff,#4c4de2)';
      const bgHover = 'linear-gradient(to bottom right, #5f88ff,#3c4de2)';
      switch (props.theme) {
        case 'primary':
          return bgHover;
        case 'delete':
          return '#EF5F5F';
        case 'hover-primary':
          return bg;
        default:
          return 'rgba(25, 118, 210, 0.04)';
      }
    }};
    border: ${(props: StyledButtonType) => {
      if (props.theme === 'second') {
        return '0.0625rem solid #DCDEEA';
      }
      return 'none';
    }};
    color: ${(props: StyledButtonType) => {
      if (props.theme === 'second') {
        return '#9A9FA5';
      }
      return '#ffffff';
    }};
  }
  @keyframes animate {
    0% {
      width: 0px;
      height: 0px;
      opacity: 0.5;
    }
    100% {
      width: 10rem;
      height: 10rem;
      opacity: 0;
    }
  }
`;
