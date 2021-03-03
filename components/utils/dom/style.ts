import { useRef } from 'react';

export function useIsHidden(elementRef: HTMLElement | undefined) {
  const el = useRef<any>(elementRef);
  if (!el.current) {
    return false;
  }

  const style = window.getComputedStyle(el.current);
  const hidden = style.display === 'none';

  // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed
  const parentHidden = el.current.offsetParent === null && style.position !== 'fixed';

  return hidden || parentHidden;
}
