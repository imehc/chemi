import {
  type CSSProperties,
  useEffect,
  useState,
  type FC,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import { useStatic } from '~/hooks';

interface Props {
  backGround?: string;
  activeBackGround?: string;
  activeText?: string;
  inactiveText?: string;
  disabled?: boolean;
  size?: 'large' | 'default' | 'small';
  width?: number;
  onChange?: (result: boolean) => void;
  value?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Switch: FC<Props> = ({
  activeBackGround = 'linear-gradient(to bottom right,#6F88FF,#4C4DE2)',
  backGround = '#9A9FA5',
  activeText = 'ON',
  inactiveText = 'OFF',
  disabled = false,
  size = 'default',
  width = 50,
  onChange,
  value = false,
  className = '',
  style,
}): JSX.Element => {
  const switchBoxRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useStatic(onChange);

  const [left, setLeft] = useState<number>(3);

  const [select, setSelect] = useState<boolean>(value);
  useEffect(() => {
    setSelect(value);
  }, [value]);

  useEffect(() => {
    const { current: switchBox } = switchBoxRef;
    const { current: circle } = circleRef;
    if (!switchBox || !circle) {
      return;
    }
    const { clientWidth: switchBoxWidth } = switchBox;
    const { clientWidth: circleWidth } = circle;
    let l = left;
    if (select) {
      l = switchBoxWidth - circleWidth - 3;
    } else {
      l = 3;
    }
    if (l !== left) {
      setLeft(l);
    }
  }, [switchBoxRef, circleRef, select, left, disabled]);

  useEffect(() => {
    const { current: change } = onChangeRef;
    if (change) {
      change(select);
    }
  }, [onChangeRef, select]);

  return (
    <SwitchBox
      activeBackGround={activeBackGround}
      width={width}
      size={size}
      backGround={backGround}
      select={select}
      className={`relative overflow-hidden ${className} ${
        disabled ? 'grayscale cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={style}
      ref={switchBoxRef}
      onClick={() => !disabled && setSelect(!select)}
    >
      <Circle
        size={size}
        className="absolute top-[3px] transition-all"
        style={{ left: left + 'px' }}
        ref={circleRef}
      >
        <span className="z-1 absolute top-[50%] translate-y-[-50%] right-5 text-[10px] text-white select-none">
          {activeText}
        </span>
        <span className="z-1 absolute top-[50%] translate-y-[-50%] left-4 text-[10px] text-white select-none">
          {inactiveText}
        </span>
      </Circle>
    </SwitchBox>
  );
};

interface SwitchBoxProps {
  activeBackGround: Props['activeBackGround'];
  backGround?: Props['backGround'];
  width?: Props['width'];
  size?: Props['size'];
  select: boolean;
}
const SwitchBox = styled.div<SwitchBoxProps>`
  display: inline-block;
  width: ${(props) => props.width + 'px'};
  height: ${(props) => {
    switch (props.size) {
      case 'small':
        return '15px';
      case 'large':
        return '25px';
      default:
        return '20px';
    }
  }};
  background: ${(props) =>
    props.select ? props.activeBackGround : props.backGround};
  border-radius: ${(props) => {
    switch (props.size) {
      case 'small':
        return '15px';
      case 'large':
        return '25px';
      default:
        return '20px';
    }
  }};
`;

interface CircleProps {
  size?: Props['size'];
}
const Circle = styled.div<CircleProps>`
  width: ${(props) => {
    switch (props.size) {
      case 'small':
        return '9px';
      case 'large':
        return '19px';
      default:
        return '14px';
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case 'small':
        return '9px';
      case 'large':
        return '19px';
      default:
        return '14px';
    }
  }};
  border-radius: 50%;
  background-color: #ffffff;
`;
