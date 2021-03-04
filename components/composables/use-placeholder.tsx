import React, { Ref } from 'react';
import { useHeight } from './use-height';
import type { BEM } from '../utils/create/bem';

export function usePlaceholder(contentRef: Ref<any>, bem: BEM) {
  const height = useHeight(contentRef.current);

  return (renderContent: () => JSX.Element) => (
    <div
      className={`${bem('placeholder')}`}
      style={{ height: height.value ? `${height.value}px` : undefined }}
    >
      {renderContent()}
    </div>
  );
}
