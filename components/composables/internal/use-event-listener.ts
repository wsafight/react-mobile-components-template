import { inBrowser } from '../../utils';
import { useEffect } from 'react';

// eslint-disable-next-line
export let supportsPassive = false;

if (inBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', null as any, opts);
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export type UseEventListenerOptions = {
  target?: EventTarget;
  capture?: boolean;
  passive?: boolean;
};

export function useEventListener(
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions = {},
) {
  if (!inBrowser) {
    return;
  }

  const { target = window, passive = false, capture = false } = options;

  let attached: boolean;

  const add = () => {
    const element = target;

    if (element && !attached) {
      element.addEventListener(type, listener, supportsPassive ? { capture, passive } : capture);
      attached = true;
    }
  };

  const remove = () => {
    const element = target;

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  useEffect(() => {
    add();
    return () => remove();
  }, []);
}
