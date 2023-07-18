import { useEffect, useId, useRef, useState } from 'react';
import {
  useFloating,
  useClick,
  useInteractions,
  offset,
  size,
  flip,
  useDismiss,
} from '@floating-ui/react';
import dropDownIcon from './assets/drop-down.svg';
import pic星号 from './assets/星号.svg';
import styled from '@emotion/styled';
import clsx from 'clsx';

interface Props<T = unknown> {
  /**
   * 如果为true，将占满整个宽度
   * @default false
   */
  fullWidth?: boolean;
  placeholder?: string;
  /**
   * 传入的数据，格式为数组
   */
  options: T[] | readonly T[];
  /**
   * 指定显示的数据
   */
  filterOption?: (evt: T) => string;
  /**
   * 禁止选择项
   */
  disabledOptions?: T[];
  onChange?: (evt: T) => void;
  value?: T;
  icon?: string;
  type?: 'basic' | 'back-transparent' | 'date' | 'form';
  fontSize?: number;
  /**
   * 只读
   * @default false
   */
  readonly?: boolean;
  label?: string;
  error?: string;
  required?: boolean;
}

/**
 * 当前滚动条的位置
 * @param top 有滚动条但未滚动
 * @param bottom 有滚动条且滚动到底部
 * @param center 有滚动条且离顶部和底部都有一段距离
 * @param none 没有滚动条
 */
type ScrollState = 'top' | 'bottom' | 'center' | 'none';

export const SelectV1 = <T,>({
  fullWidth = false,
  placeholder = '请选择',
  options = [],
  filterOption = (d) => d as string,
  onChange,
  value,
  icon = dropDownIcon,
  type = 'basic',
  disabledOptions = [],
  fontSize,
  readonly = false,
  label,
  error,
  required,
}: Props<T>): JSX.Element => {
  const id = useId();
  const onChangeRef = useRef(onChange);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(5),
      flip(),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            width: `${rects.reference.width}px`,
            zIndex: 9999,
          });
        },
      }),
    ],
  });

  const [scrollState, setScrollState] = useState<ScrollState>('none');
  const [isScroll, setIsScroll] = useState<boolean>(() => false);

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  useEffect(() => {
    setIsScroll(false);
  }, [isOpen]);

  return (
    <>
      {label && type === 'form' && (
        <label
          htmlFor={label}
          className="text-[#787c82] text-sm mb-2 flex items-center"
        >
          <span>{label}</span>
          {required && <img src={pic星号} className="ml-1" alt="" />}
        </label>
      )}
      <SelectWrap
        className={clsx(
          'rounded-lg leading-10 inline-flex justify-between items-center relative cursor-pointer',
          [
            type === 'date'
              ? 'pl-2 h-7'
              : type === 'form'
              ? 'px-3 h-11'
              : type === 'back-transparent'
              ? 'px-1 h-10'
              : 'px-5 h-10 pr-[10px]',
          ],
          { 'border border-solid border-[#DCDEEA]': type === 'date' },
          { 'border border-solid border-[#E6E6E6]': type === 'form' },
          { 'border border-solid border-[#FF9090]': type === 'form' && !!error }
        )}
        fullWidth={fullWidth}
        tabIndex={0}
        ref={refs.setReference}
        aria-labelledby="select-label"
        aria-autocomplete="none"
        style={{
          margin: 'auto',
          outline: 0,
          backgroundColor:
            type === 'back-transparent'
              ? 'transparent'
              : type === 'form' && !!error
              ? '#FBF4F4'
              : '#F4F6FB',
        }}
        {...getReferenceProps()}
      >
        <p
          className={clsx(
            'text-ellipsis whitespace-nowrap text-base overflow-hidden',
            [
              type === 'back-transparent'
                ? 'text-xl text-[#040F1F] w-48'
                : type === 'date'
                ? 'text-sm text-[#040F1F]'
                : type === 'form'
                ? value
                  ? 'text-lg text-theme-black'
                  : 'text-lg text-[#9ca3af]'
                : value
                ? 'text-theme-black'
                : 'text-theme-grey',
            ],
            {
              'font-bold': !!value,
              'opacity-30': readonly,
            }
          )}
          style={{ fontSize }}
          title={value ? filterOption(value) : placeholder}
        >
          {value ? filterOption(value) : placeholder}
        </p>
        <img
          src={icon}
          alt=""
          className={clsx('w-6 h-6 duration-300', [
            isOpen && !readonly ? 'rotate-180' : 'rotate-0',
          ])}
        />
      </SelectWrap>
      {isOpen && !readonly && (
        <Card
          className="bg-white rounded-lg overflow-hidden z-10"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <Wrap
            className={clsx(
              'w-full h-full overflow-y-auto',
              [isOpen ? 'block' : 'hidden'],
              [
                type === 'date'
                  ? 'top-[34.5px] max-h-[182px]'
                  : 'top-12 max-h-[216px]',
              ]
            )}
            state={scrollState}
            onScroll={(event) => {
              setIsScroll(true);
              const parent = event.target as HTMLDivElement;
              if (!parent) {
                return;
              }
              const { height } = parent.getBoundingClientRect();
              const { scrollHeight, scrollTop } = parent;
              if (scrollTop === 0) {
                setScrollState('top');
                return;
              }
              if (scrollTop > 0 && scrollTop < scrollHeight - height) {
                setScrollState('center');
                return;
              }
              if (scrollTop + height === scrollHeight) {
                setScrollState('bottom');
                return;
              }
              setScrollState('none');
            }}
          >
            {options.map((item, i) => (
              <Option
                ref={(child) => {
                  if (!value || !filterOption || isScroll) {
                    return;
                  }
                  if (filterOption(item) === filterOption(value)) {
                    const parent = child?.parentElement as HTMLDivElement;
                    if (!child || !parent) {
                      return;
                    }
                    const top =
                      child.offsetTop -
                      parent.clientHeight +
                      parent.clientHeight / 2 +
                      child.clientHeight / 2;
                    parent.scrollTo({
                      top,
                      behavior: 'smooth',
                    });
                  }
                }}
                key={id + i}
                type={type}
                disabled={disabledOptions.some(
                  (item2) => filterOption?.(item) === filterOption?.(item2)
                )}
                className="overflow-hidden bolck text-ellipsis whitespace-nowrap cursor-pointer"
                checked={item === value}
                onClick={() => {
                  onChangeRef.current?.(item);
                  setIsOpen(false);
                }}
              >
                {filterOption(item)}
              </Option>
            ))}
          </Wrap>
        </Card>
      )}
      {label && type === 'form' && (
        <p className="text-[#FF5F5F] h-5 flex justify-start items-center text-sm">
          {error}
        </p>
      )}
    </>
  );
};

const SelectWrap = styled.div<Pick<Props, 'fullWidth'>>`
  display: ${(props) => (props.fullWidth ? 'flex' : 'inline-flex')};
`;

const Card = styled.div`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

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
          return '-40px';
      }
    }};
    left: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0), #fff);
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
          return '-40px';
      }
    }};
    left: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
    transition: all ease-in 0.3s;
  }
`;

/**
 * `type`为`date`的样式
 */
const styledWithDate = {
  fontSize: '14px',
  background: 'linear-gradient(to bottom right, #6F88FF, #4C4DE2)',
  color: '#ffffff',
  fontWeight: 'bold',
};
/**
 * `type`不为`date`的样式
 */
const styledWithOther = {
  color: '#040F1F',
  background: '#F4F6FB',
  fontWeight: 'bold',
  paddingLeft: '16px',
  paddingRight: '16px',
};

const Option = styled.div<{
  type: Props['type'];
  disabled?: boolean;
  checked?: boolean;
}>`
  opacity: ${(props) => (props?.disabled ? 0.5 : 1)};

  text-align: ${(props) => (props.type === 'date' ? 'center' : 'start')};
  height: ${(props) => (props.type === 'date' ? '28px' : '40px')};
  line-height: ${(props) => (props.type === 'date' ? '28px' : '40px')};

  &:hover {
    font-size: ${(props) => (props.disabled ? 'normal' : 'bold')};
  }

  ${(props) => {
    if (props.type === 'date') {
      if (props.checked) {
        return styledWithDate;
      }
      return {
        fontSize: '14px',
        color: '#9A9FA5',
        fontWeight: 'normal',
        background: 'transparent',
      };
    }
    if (props.checked) {
      return styledWithOther;
    }
    return {
      lineHeight: '40px',
      paddingLeft: '16px',
      paddingRight: '16px',
      background: 'transparent',
    };
  }}
  &:hover {
    ${(props) => {
      if (props?.disabled) {
        return {
          cursor: 'not-allowed',
        };
      }
      if (props?.type === 'date') {
        return styledWithDate;
      }
      return styledWithOther;
    }}
  }
`;
