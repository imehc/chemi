import type { CSSProperties, ReactElement, ReactNode } from "react";

export = Tooltip
export as namespace Tooltip;

declare namespace Tooltip {

  type Trigger = 'hover' | 'click' | 'all';
  type Direction = 'top' | 'bottom';

  interface TooltipProps {
    children: ReactElement;
    diretion?: Direction;
    style?: CSSProperties;
    className?: string;
    radius?: number | string;
    /**展示的组件 */
    content?: ReactNode;
    /**触发方式 */
    trigger?: Trigger;
    color?: string;
    /**是否需要箭头 */
    arrow?: boolean;
    /**触发DOM到Tootip的距离 */
    distance?: string;
  }

  interface TooltipContentProps {
    diretion: Direction;
    color: string;
    radius?: number | string | undefined;
    distance?: string;
  }
}
