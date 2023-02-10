import { useId, useState } from 'react';
import styled from '@emotion/styled';

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'label'
  > {
  label?: string;
  /**
   * 文字左边圆圈的颜色,labelColor不为空生效
   */
  labelColor?: string;
  /**
   * 是否需要边框包裹
   */
  wrap?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox: React.FC<Props> = ({
  label,
  labelColor,
  checked,
  onChange,
  disabled,
  wrap = false,
  ...attr
}) => {
  const id = useId();
  const [check, setCheck] = useState<boolean>(!!checked);

  return (
    <WrapCheckbox
      disabled={!!disabled}
      label={label}
      id="whistle-checkbox"
      className="h-10 w-fit inline-flex select-none items-center justify-start overflow-hidden border rounded-lg border-solid px-[0.875rem]"
      style={{
        borderColor: wrap ? (check ? '#5C68EF' : '#DCDEEA') : 'transparent',
        transition: '0.2s',
      }}
    >
      <input
        {...attr}
        checked={checked}
        disabled={disabled}
        type="checkbox"
        id={id}
        onChange={(e) => {
          setCheck(e.target.checked);
          onChange?.(e);
        }}
      />
      <label htmlFor={id} id="checkbox"></label>
      <label htmlFor={id}>
        {!!labelColor && label && (
          <span
            className="inline-block w-[0.625rem] h-[0.625rem] rounded-full mr-[0.3125rem]"
            style={{ backgroundColor: labelColor }}
          ></span>
        )}
        <span
          className="text-sm"
          style={{
            color: check ? '#5C68EF' : '#787C82',
            cursor: disabled ? 'no-drop' : 'pointer',
          }}
        >
          {label}
        </span>
      </label>
    </WrapCheckbox>
  );
};

const WrapCheckbox = styled.div<{ disabled: boolean; label?: string }>`
  & input[type='checkbox'] {
    appearance: none;
  }
  & input[type='checkbox'] + #checkbox {
    width: 1em;
    height: 1em;
    background-color: #dcdeea;
    border-radius: 0.25rem;
    margin-right: ${(props) => (!!props?.label ? '0.625rem' : 0)};
    cursor: ${(props) => (props.disabled ? 'no-drop' : 'pointer')};
  }
  & input[type='checkbox']:checked + #checkbox {
    // TODO: 可使用图片
    /* background: url() center center no-repeat; */
    background: #a7f088;
    background-size: 1rem 1rem;
  }
`;
