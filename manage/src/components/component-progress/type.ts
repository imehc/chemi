import type { CSSProperties, ReactNode } from 'react';
export interface ProgressProps {
  /**
   * @scope 0 - 100
   */
  value: number;
  baseColor?: string | string[]
  color?: string | string[];
  width: number;
  height: number;
  round?: boolean;
  indicator?: boolean;
  style?: CSSProperties;

}