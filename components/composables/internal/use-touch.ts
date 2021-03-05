import { useRef } from 'react';

const MIN_DISTANCE = 10;

type Direction = '' | 'vertical' | 'horizontal';

export interface UseTouchResult {
  move: any;
  start: any;
  reset: any;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  offsetX: number;
  offsetY: number;
  direction: string;
  isVertical: () => boolean;
  isHorizontal: () => boolean;
}

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}

export function useTouch(): UseTouchResult {
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const direction = useRef<Direction>('');

  const isVertical = () => direction.current === 'vertical';
  const isHorizontal = () => direction.current === 'horizontal';

  const reset = () => {
    deltaX.current = 0;
    deltaY.current = 0;
    offsetX.current = 0;
    offsetY.current = 0;
    direction.current = '';
  };

  const start = ((event: TouchEvent) => {
    reset();
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
  }) as EventListener;

  const move = ((event: TouchEvent) => {
    const touch = event.touches[0];
    deltaX.current = touch.clientX - startX.current;
    deltaY.current = touch.clientY - startY.current;
    offsetX.current = Math.abs(deltaX.current);
    offsetY.current = Math.abs(deltaY.current);

    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current);
    }
  }) as EventListener;

  return {
    move,
    start,
    reset,
    startX: startX.current,
    startY: startY.current,
    deltaX: deltaX.current,
    deltaY: deltaY.current,
    offsetX: offsetX.current,
    offsetY: offsetY.current,
    direction: direction.current,
    isVertical,
    isHorizontal,
  };
}
