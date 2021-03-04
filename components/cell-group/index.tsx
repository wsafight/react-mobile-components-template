import React from 'react';
import { createNamespace } from '../utils';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { CellGroupProps } from './PropsType';

const [bem] = createNamespace('cell-group');

export default function CellGroup(props: CellGroupProps) {
  const { children, attrs, border, title } = props;

  const renderGroup = () => (
    <div className={[bem(), { [BORDER_TOP_BOTTOM]: border }]} {...attrs}>
      {children}
    </div>
  );

  const renderTitle = () => <div className={`${bem('title')}`}>{title}</div>;

  if (title) {
    return (
      <>
        {renderTitle()}
        {renderGroup()}
      </>
    );
  }
  return renderGroup();
}
