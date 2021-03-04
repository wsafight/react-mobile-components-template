import { useRect } from '@vant/use';
import { useEffect, useRef } from 'react';

export const useHeight = (element: Element | undefined) => {
  const height = useRef<number>();

  useEffect(() => {
    setTimeout(() => {
      height.current = useRect(element).height;
    });
  });

  return height.current;
};
