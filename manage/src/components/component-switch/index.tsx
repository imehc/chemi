import { useState, type CSSProperties, type FC } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';

interface Props {
  backGround?: string;
  activeBackGround?: string;
  activeText?: string;
  inactiveText?: string;
  disabled?: boolean;
  size?: 'large' | 'default' | 'small';
  width?: number;
  onChange?: (result: boolean) => void;
  checked?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const CustomSwitch: FC<Props> = ({
  activeBackGround = 'linear-gradient(to bottom right,#6F88FF,#4C4DE2)',
  backGround = '#9A9FA5',
  activeText = 'ON',
  inactiveText = 'OFF',
  disabled = false,
  size = 'default',
  width = 50,
  onChange,
  checked: defaultChecked = false,
  className = '',
  style,
}): JSX.Element => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <SwitchBox
      activeBackGround={activeBackGround}
      width={width}
      size={size}
      backGround={backGround}
      select={checked}
      className={`relative ${className} ${
        disabled ? 'grayscale cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={style}
      onClick={() => {
        if (disabled || !onChange) {
          return;
        }

        setChecked(!checked);
        onChange(!checked);
      }}
    >
      <Circle
        size={size}
        className={clsx(
          'absolute top-[3px] transition-all',
          checked ? 'right-[3px]' : 'left-[3px]'
        )}
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
  overflow: hidden;
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
