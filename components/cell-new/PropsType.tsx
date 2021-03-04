import { ReactNode } from 'react';

export type CellArrowDirection = 'up' | 'down' | 'left' | 'right';

export interface CellProps {
  icon: string;
  size: string;
  title: number | string;
  value: number | string;
  label?: number | string;
  center?: boolean;
  isLink?: boolean;
  required?: boolean;
  iconPrefix?: string;
  valueClass?: any;
  labelClass?: any;
  titleClass?: any;
  titleStyle?: any;
  arrowDirection?: string;
  border?: boolean;
  clickable?: boolean;
  children?: ReactNode;
}
