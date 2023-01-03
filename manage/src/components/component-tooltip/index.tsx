import styled from '@emotion/styled';
import {
  cloneElement,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { findDOMNode } from 'react-dom';
import { EMPTY, fromEvent, switchMap, of } from 'rxjs';
import type { TooltipContentProps, TooltipProps } from './type';

export const ToolTip: React.FC<TooltipProps> = (props): JSX.Element => {
  const {
    children: child,
    diretion = 'bottom',
    content,
    trigger = 'all',
    color = 'transparent',
    arrow = true,
    className,
    style,
    ...otherProps
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleClick, setVisibleClick] = useState<Event>();
  const [clickvisible, setClickVisible] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);

  const tooltipRef = useRef(null);
  useEffect(() => {
    const watchAllClick = fromEvent(document, 'click')
      .pipe(
        switchMap((e) => {
          if (!tooltipRef.current) return EMPTY;
          if (num === 1 && visible) {
            setVisible(false);
            setClickVisible(false);
            setNum(0);
            return of(true);
          }
          const isContains = findDOMNode(tooltipRef.current)?.contains(
            e.target as Node
          );
          if (!isContains && e.target !== visibleClick?.target) {
            setClickVisible(false);
            setVisible(false);
            return of(true);
          }
          setNum(1);
          return EMPTY;
        })
      )
      .subscribe((next) => {
        if (visible) {
          setVisible(false);
        }
      });

    return () => watchAllClick.unsubscribe();
  }, [num, visible, visibleClick?.target]);

  const children = useMemo(
    () =>
      trigger === 'click'
        ? cloneElement(child, {
            onClick: (e: Event) => {
              setVisibleClick(e);
              setVisible(true);
            },
          })
        : trigger === 'hover'
        ? cloneElement(child, {
            onMouseEnter: () => setVisible(true),
            onMouseLeave: () => setVisible(false),
          })
        : cloneElement(child, {
            onMouseEnter: () => setVisible(true),
            onMouseLeave: () => {
              if (clickvisible) {
                return;
              }
              setClickVisible(false);
              setVisible(false);
            },
            onClick: (e: Event) => {
              if (!clickvisible) {
                setClickVisible(true);
              }
              setVisibleClick(e);
              setVisible(true);
            },
          }),
    [child, clickvisible, trigger]
  );

  const handleContent = useCallback((ctt: ReactNode) => {
    if (typeof ctt === 'number' || typeof ctt === 'string') {
      return <BaseTooltip>{ctt}</BaseTooltip>;
    }
    return ctt;
  }, []);
  return (
    <TooltipBox style={style}>
      {children}
      {visible && (
        <TooltipContent
          className={`h-full ${className}`}
          {...otherProps}
          diretion={diretion}
          color={color}
          onMouseEnter={() => trigger !== 'click' && setVisible(true)}
          onMouseLeave={() => {
            if (trigger !== 'click' && !clickvisible) {
              setClickVisible(false);
              setVisible(false);
            }
          }}
          ref={tooltipRef}
        >
          {diretion === 'bottom' && arrow && <TriangleByTop color={color} />}
          {diretion === 'top' && arrow && <TriangleByBottom color={color} />}
          {handleContent(content)}
        </TooltipContent>
      )}
    </TooltipBox>
  );
};

const TooltipBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
`;

const TooltipContent = styled.div<TooltipContentProps>`
  top: ${(props) => {
    if (props.diretion === 'bottom') {
      if (props?.distance) {
        return props.distance;
      }
      return '0';
    }
    return 'auto';
  }};
  bottom: ${(props) => {
    if (props.diretion === 'top') {
      if (props.distance) {
        return props.diretion;
      }
      return '100%';
    }
    return 'auto';
  }};
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  min-width: 35px;
  min-height: 20px;
  z-index: 10;
  border-radius: ${(props) => {
    if (props.radius !== undefined) {
      return props.radius;
    }
    return 0;
  }};
  background-color: ${(props) => {
    return props.color;
  }};
  box-shadow: 1px 1px 1px #f5f5f5;
`;
const TriangleByTop = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-bottom: 6px solid ${(props: { color: string }) => props.color};
  border-top: 6px solid transparent;
`;
const TriangleByBottom = styled(TriangleByTop)`
  bottom: 'auto';
  top: 100%;
  border-bottom: 6px solid transparent;
  border-top: 6px solid ${(props: { color: string }) => props.color};
`;
const BaseTooltip = styled.div`
  padding: 5px;
`;
