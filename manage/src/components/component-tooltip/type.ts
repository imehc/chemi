import type { CSSProperties, ReactElement, ReactNode } from 'react';

type Trigger = 'hover' | 'click';
export type Direction = 'top' | 'bottom';

export interface TooltipProps {
  children: ReactElement;
  diretion?: Direction;
  style?: CSSProperties;
  className?: string;
  render?: ReactNode;
  title: ReactNode;
  trigger?: Trigger;
  color?: string;
}
