import styled from '@emotion/styled';
import clsx from 'clsx';
import { useId } from 'react';

export interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  startIcon?: React.ReactNode;
  children: React.ReactNode;
  /**
   * @default 'middle''
   */
  size?: 'large' | 'middle' | 'small';
  theme?: 'primary' | 'contained' | 'text' | 'outlined';
  color?: string | 'delete';
}

type ButtonProps = Required<Pick<Props, 'size' | 'theme' | 'disabled'>> &
  Pick<Props, 'color'>;

export const Button2: React.FC<Props> = ({
  startIcon,
  children,
  size = 'middle',
  theme = 'outlined',
  color,
  type = 'button',
  disabled = false,
  className,
  ...props
}) => {
  const id = useId();
  return (
    <WrapButton
      className={`relative inline-flex justify-center items-center px-[0.875rem] rounded-lg box-border overflow-hidden whitespace-nowrap text-base ${className}`}
      id={id}
      theme={theme}
      size={size}
      color={color}
      type={type}
      disabled={disabled}
      style={{ cursor: disabled ? 'no-drop' : 'pointer' }}
      {...props}
    >
      {startIcon && <span className="shrink-0">{startIcon}</span>}
      <span
        className={clsx(
          'shrink overflow-hidden whitespace-nowrap text-ellipsis',
          { 'ml-[0.3125rem]': !!startIcon }
        )}
      >
        {children}
      </span>
    </WrapButton>
  );
};

const WrapButton = styled.button<ButtonProps>`
  transition: 0.2s;

  height: ${(props) => {
    switch (props.size) {
      case 'large':
        return '2.75rem';
      case 'middle':
        return '2.5rem';
      default:
        return '1.875rem';
    }
  }};

  color: ${(props) => {
    switch (props.theme) {
      case 'contained':
      case 'outlined':
      case 'text':
        return '#9A9FA5';
      default:
        return '#ffffff';
    }
  }};

  ${(props) => {
    if (['contained', 'outlined'].includes(props.theme)) {
      return {
        border: '1px solid #DCDEEA',
      };
    }
  }};

  background: ${(props) => {
    switch (props.theme) {
      case 'contained':
      case 'outlined':
      case 'text':
        return '#ffffff';
      case 'primary':
        return props.color
          ? props.color === 'delete'
            ? '#FF5F5F'
            : props.color
          : 'linear-gradient(to bottom right, #6f88ff,#4c4de2)';
      default:
        return 'none';
    }
  }};
  
  &:hover {
    ${(props) => {
      if (['outlined', 'text'].includes(props.theme)) {
        return {
          background: '#f5f5f5',
        };
      }
      if (props.theme === 'contained') {
        return {
          color: '#ffffff',
          background: props?.color
            ? props.color === 'delete'
              ? '#FF5F5F'
              : props.color
            : 'linear-gradient(to bottom right, #6f88ff,#4c4de2)',
        };
      }
      if (props.theme === 'primary') {
        return {
          filter: 'brightness(1.1)',
        };
      }
    }}
  }

  &:active {
    ${(props) => {
      if (['outlined', 'text'].includes(props.theme)) {
        return {
          background: '#f6fafd',
        };
      }
      if (['contained', 'primary'].includes(props.theme)) {
        return { filter: 'brightness(.9)' };
      }
    }}
  }

  &:focus-visible {
    outline: 0;
  }
`;
