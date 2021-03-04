import React from 'react';
// Utils
import { createNamespace, isDef } from '../utils';

// Composition
// import { useRoute, routeProps } from '../composables/use-route';

// Components
// import Icon from '../icon';
import { CellProps } from './PropsType';

const [bem] = createNamespace('cell');

export default function Cell(props: CellProps) {
  const { size, center, border, isLink, required, children, titleClass, labelClass } = props;
  const renderLabel = () => {
    const showLabel = isDef(props.label);

    if (showLabel) {
      return <div className={`${bem('label')} ${labelClass}`}>props.label</div>;
    }
  };

  const renderTitle = () => {
    if (isDef(props.title)) {
      return (
        <div className={`${bem('title')} ${titleClass}`} style={props.titleStyle}>
          <span>{props.title}</span>
          {renderLabel()}
        </div>
      );
    }
  };

  const renderValue = () => {
    const hasTitle = isDef(props.title);
    const hasValue = isDef(props.value);

    if (hasValue) {
      return (
        <div className={`${bem('value', { alone: !hasTitle })} ${props.valueClass}`}>
          {children ?? <span>{props.value}</span>}
        </div>
      );
    }
  };

  const renderLeftIcon = () => {
    return null;
    // if (slots.icon) {
    //   return slots.icon();
    // }
    //
    // if (props.icon) {
    //   return <Icon name={props.icon} class={bem('left-icon')} classPrefix={props.iconPrefix}/>;
    // }
  };

  const renderRightIcon = () => {
    return null;
    // if (slots['right-icon']) {
    //   return slots['right-icon']();
    // }
    //
    // if (props.isLink) {
    //   const name = props.arrowDirection ? `arrow-${props.arrowDirection}` : 'arrow';
    //   return <Icon name={name} class={bem('right-icon')}/>;
    // }
  };

  const clickable = props.clickable ?? isLink;

  const classes: Record<string, boolean | undefined> = {
    center,
    required,
    clickable,
    borderless: !border,
  };
  if (size) {
    classes[size] = !!size;
  }

  return (
    <div
      className={bem(classes) as any}
      role={clickable ? 'button' : undefined}
      // @ts-ignore
      tabindex={clickable ? 0 : undefined}
      // onClick={route}
    >
      {renderLeftIcon()}
      {renderTitle()}
      {renderValue()}
      {renderRightIcon()}
    </div>
  );
}
