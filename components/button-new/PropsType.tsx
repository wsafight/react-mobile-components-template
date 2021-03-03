import { ReactNode } from 'react';

export type ButtonSize = 'large' | 'normal' | 'small' | 'mini';

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export type ButtonShape = 'radius' | 'rect' | 'round' | 'circle';

export default interface PropsType {
  text: string;
  icon?: string;
  color?: string;
  block?: boolean;
  plain?: boolean;
  round?: boolean;
  square?: boolean;
  loading?: boolean;
  hairline?: boolean;
  disabled?: boolean;
  iconPrefix?: string;
  loadingText?: string;
  loadingType?: string;
  tag?: keyof HTMLElementTagNameMap;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: string;
  loadingSize: string;
  iconPosition: 'left' | 'right';
  children: ReactNode;
  onClick?: any;
}
