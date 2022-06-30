import styled from '@emotion/styled';
import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import type { TooltipProps, Direction } from './type';

export const ToolTip: React.FC<TooltipProps> = (props): JSX.Element => {
  const {
    children: child,
    diretion = 'bottom',
    render: renderChildren,
    title,
    trigger = 'hover',
    color = '#f5f5f5',
    ...otherProps
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const tooltipRef = useRef(null);
  useEffect(() => {
    document.addEventListener('click', (e) => clickCallback(e), false);
    return () => {
      return document.removeEventListener(
        'click',
        (e) => clickCallback(e),
        false
      );
    };
  }, []);
  const clickCallback = useCallback((e: MouseEvent) => {
    console.log(
      !findDOMNode(tooltipRef.current)?.contains(e.target as Node),
      '2324'
    );
    if (!findDOMNode(tooltipRef.current)?.contains(e.target as Node)) {
      console.log(visible, 'visible');
      visible && setVisible(false);
    }
  }, []);
  const children =
    trigger === 'click'
      ? cloneElement(child, {
          onClick: () => setVisible(true),
        })
      : cloneElement(child, {
          onMouseEnter: () => setVisible(true),
          onMouseLeave: () => setVisible(false),
        });
  return (
    <TooltipBox>
      {children}
      {visible && (
        <TooltipContent
          {...otherProps}
          diretion={diretion}
          color={color}
          onMouseEnter={() => trigger !== 'click' && setVisible(true)}
          onMouseLeave={() => trigger !== 'click' && setVisible(false)}
          ref={tooltipRef}
        >
          {diretion === 'bottom' && <TriangleByTop color={color} />}
          {diretion === 'top' && <TriangleByBottom color={color} />}
          {title}
          {renderChildren}
        </TooltipContent>
      )}
    </TooltipBox>
  );
};

const TooltipBox = styled.div`
  position: relative;
  display: inline-block;
`;
const TooltipContent = styled.div`
  top: ${(props: { diretion: Direction }) => {
    if (props.diretion === 'bottom') {
      return '130%';
    }
    return 'auto';
  }};
  bottom: ${(props: { diretion: Direction }) => {
    if (props.diretion === 'top') {
      return '130%';
    }
    return 'auto';
  }};
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  min-width: 80px;
  min-height: 100px;
  border-radius: 6px;
  background-color: ${(props: { diretion: Direction; color: string }) => {
    return props.color;
  }};
  box-shadow: 3px 3px 3px #cccccc;
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
