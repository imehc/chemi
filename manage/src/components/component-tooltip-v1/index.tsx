import styled from "@emotion/styled";
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  useMemo,
  useId,
} from "react";
import { findDOMNode } from "react-dom";
import { EMPTY, fromEvent, switchMap, of } from "rxjs";

type Direction = "top" | "bottom";

interface TooltipProps {
  children: ReactElement;
  diretion?: Direction;
  style?: CSSProperties;
  className?: string;
  radius?: number | string;
  /**展示的组件 */
  content?: ReactNode;
  color?: string;
  /**是否需要箭头 */
  arrow?: boolean;
  /**触发DOM到Tootip的距离 */
  distance?: string;
}

export const ToolTipV1: React.FC<TooltipProps> = ({
  children: child,
  diretion = "bottom",
  content,
  color = "transparent",
  arrow = true,
  className,
  style,
  ...otherProps
}): JSX.Element => {
  const id = useId();

  const ref = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const watchAllClick = fromEvent(document, "click")
      .pipe(
        switchMap((e) => {
          if (!tooltipRef.current) return EMPTY;
          const isContains = findDOMNode(tooltipRef.current)?.contains(
            e.target as Node
          );
          if (!isContains && e.target !== ref.current) {
            return of(true);
          }
          return EMPTY;
        })
      )
      .subscribe((result) => {
        if (result) {
          setVisible(false);
        }
      });

    return () => watchAllClick.unsubscribe();
  }, [visible]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const task = fromEvent(ref.current, "click")
      .pipe(switchMap(() => of(true)))
      .subscribe((result) => setVisible(result));

    return () => task.unsubscribe();
  }, []);

  const children = useMemo(() => cloneElement(child, { ref }), [child]);

  const handleContent = useCallback((ctt: ReactNode) => {
    if (typeof ctt === "number" || typeof ctt === "string") {
      return <BaseTooltip>{ctt}</BaseTooltip>;
    }
    return ctt;
  }, []);
  return (
    <TooltipBox style={style} key={id}>
      {children}
      {visible && (
        <TooltipContent
          className={`h-full ${className}`}
          {...otherProps}
          diretion={diretion}
          color={color}
          ref={tooltipRef}
          onClick={() => setVisible(false)}
        >
          {diretion === "bottom" && arrow && <TriangleByTop color={color} />}
          {diretion === "top" && arrow && <TriangleByBottom color={color} />}
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

interface TooltipContentProps {
  diretion: Direction;
  color: string;
  radius?: number | string | undefined;
  distance?: string;
}

const TooltipContent = styled.div<TooltipContentProps>`
  top: ${(props) => {
    if (props.diretion === "bottom") {
      if (props?.distance) {
        return props.distance;
      }
      return "0";
    }
    return "auto";
  }};
  bottom: ${(props) => {
    if (props.diretion === "top") {
      if (props.distance) {
        return props.diretion;
      }
      return "100%";
    }
    return "auto";
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
const TriangleByTop = styled.span<{ color: string }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-bottom: 6px solid ${(props) => props.color};
  border-top: 6px solid transparent;
`;
const TriangleByBottom = styled(TriangleByTop)`
  bottom: "auto";
  top: 100%;
  border-bottom: 6px solid transparent;
  border-top: 6px solid ${(props) => props.color};
`;
const BaseTooltip = styled.div`
  padding: 5px;
`;
