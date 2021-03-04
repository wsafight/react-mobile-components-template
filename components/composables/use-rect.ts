import { useRef } from 'react';

function isWindow(val: unknown): val is Window {
  return val === window;
}

function makeDOMRect(width: number, height: number) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  } as DOMRect;
}

export const useRect = (elementRef: Element | Window | undefined) => {
  const element = useRef(elementRef);

  if (isWindow(element.current)) {
    const width = element.current.innerWidth;
    const height = element.current.innerHeight;
    return makeDOMRect(width, height);
  }

  if (element.current && element.current.getBoundingClientRect) {
    return element.current.getBoundingClientRect();
  }

  return makeDOMRect(0, 0);
};
