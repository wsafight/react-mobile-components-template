import { useRect } from './use-rect';
import { useEffect, useRef } from 'react';

export const useHeight = (element: Element | undefined): number => {
  const height = useRef<number>(0);

  useEffect(() => {
    setTimeout(() => {
      height.current = useRect(element).height;
    });
  });

  return height.current;
};
