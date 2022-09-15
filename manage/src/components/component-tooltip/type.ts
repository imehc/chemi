import type { CSSProperties, ReactElement, ReactNode } from 'react';

type Trigger = 'hover' | 'click';
export type Direction = 'top' | 'bottom';

export interface TooltipProps {
  children: ReactElement;
  diretion?: Direction;
  style?: CSSProperties;
  className?: string;
  radius?: number | string;
  content?: ReactNode;
  trigger?: Trigger;
  color?: string;
  arrow?: boolean;
}
