import styled from '@emotion/styled';
import {
  cloneElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { findDOMNode } from 'react-dom';
import { EMPTY, fromEvent, switchMap, of } from 'rxjs';
import type { TooltipProps, Direction } from './type';

export const ToolTip: React.FC<TooltipProps> = (props): JSX.Element => {
  const {
    children: child,
    diretion = 'bottom',
    /**展示的组件 */
    content,
    /**触发方式 */
    trigger = 'hover',
    color = '#f5f5f5',
    radius,
    /**是否需要箭头 */
    arrow = false,
    ...otherProps
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleClick, setVisibleClick] = useState<Event>();

  const tooltipRef = useRef(null);
  useEffect(() => {
    const watchAllClick = fromEvent(document, 'click')
      .pipe(
        switchMap((e) => {
          if (!tooltipRef.current) return EMPTY;
          const isContains = findDOMNode(tooltipRef.current)?.contains(
            e.target as Node
          );
          if (!isContains && e.target !== visibleClick?.target) {
            setVisible(false);
            return of(true);
          }
          return EMPTY;
        })
      )
      .subscribe();

    return () => watchAllClick.unsubscribe();
  }, [visible, visibleClick?.target]);

  const children =
    trigger === 'click'
      ? cloneElement(child, {
          onClick: (e: Event) => {
            setVisibleClick(e);
            setVisible(true);
          },
        })
      : cloneElement(child, {
          onMouseEnter: () => setVisible(true),
          onMouseLeave: () => setVisible(false),
        });
  const handleContent = useCallback((ctt: ReactNode) => {
    if (typeof ctt === 'number' || typeof ctt === 'string') {
      return <BaseTooltip>{ctt}</BaseTooltip>;
    }
    return ctt;
  }, []);

  return (
    <TooltipBox>
      {children}
      {visible && (
        <TooltipContent
          {...otherProps}
          diretion={diretion}
          color={color}
          radius={radius}
          onMouseEnter={() => trigger !== 'click' && setVisible(true)}
          onMouseLeave={() => trigger !== 'click' && setVisible(false)}
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
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
`;
const TooltipContent = styled.div`
  top: ${(props: {
    diretion: Direction;
    radius: number | string | undefined;
  }) => {
    if (props.diretion === 'bottom') {
      return '130%';
    }
    return 'auto';
  }};
  bottom: ${(props: {
    diretion: Direction;
    radius: number | string | undefined;
  }) => {
    if (props.diretion === 'top') {
      return '130%';
    }
    return 'auto';
  }};
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  min-width: 35px;
  min-height: 20px;
  border-radius: ${(props: {
    diretion: Direction;
    radius: number | string | undefined;
  }) => {
    if (props.radius !== undefined) {
      return props.radius;
    }
    return 0;
  }};
  background-color: ${(props: {
    diretion: Direction;
    color: string;
    radius: number | string | undefined;
  }) => {
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
