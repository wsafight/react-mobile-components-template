import React from 'react';
import { useHeight } from './use-height';
import type { BEM } from '../utils/create/bem';

export function usePlaceholder(contentRef: any, bem: BEM) {
  const height = useHeight(contentRef.current);

  return (renderContent: () => JSX.Element) => (
    <div className={`${bem('placeholder')}`} style={{ height: height ? `${height}px` : undefined }}>
      {renderContent()}
    </div>
  );
}
