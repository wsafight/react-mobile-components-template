import React, { createElement } from 'react';
import { createNamespace } from '../utils';
import { BORDER_SURROUND } from '../utils/constant';
import PropsType from './PropsType';
import './style/index.scss';

const [bem] = createNamespace('button');

export default function Button(props: PropsType) {
  const {
    type = 'default',
    size = 'normal',
    block,
    round,
    plain,
    square,
    loading = false,
    disabled,
    hairline,
    nativeType,
    tag = 'button',
    color,
    children,
    // iconPosition,
  } = props;
  // const renderLoadingIcon = () => {
  //   if (slots.loading) {
  //     return slots.loading();
  //   }
  //
  //   return (
  //     <Loading
  //       class={bem('loading')}
  //       size={props.loadingSize}
  //       type={props.loadingType}
  //       color='currentColor'
  //     />
  //   );
  // };

  // const renderIcon = () => {
  //   if (props.loading) {
  //     return renderLoadingIcon();
  //   }
  //
  //   if (props.icon) {
  //     return (
  //       <Icon
  //         name={props.icon}
  //         class={bem('icon')}
  //         classPrefix={props.iconPrefix}
  //       />
  //     );
  //   }
  // };

  const renderText = () => {
    let text;
    if (props.loading) {
      text = props.loadingText;
    } else {
      // text = slots.default ? slots.default() : props.text;
      text = props.text;
    }

    if (text) {
      return <span className={bem('text') as any}>{text}</span>;
    }
  };

  const getStyle = () => {
    if (color) {
      const style: Record<string, any> = {};

      style.color = plain ? color : 'white';

      if (!plain) {
        // Use background instead of backgroundColor to make linear-gradient work
        style.background = color;
      }

      // hide border when color is linear-gradient
      if (color.indexOf('gradient') !== -1) {
        style.border = 0;
      } else {
        style.borderColor = color;
      }

      return style;
    }
  };

  const onClick = (event: any) => {
    if (props.loading) {
      event.preventDefault();
    }
    if (!props.loading && !props.disabled) {
      // emit('click', event);
      props.onClick && props.onClick();
      // route();
    }
  };

  const classes = [
    bem([
      type,
      size,
      {
        plain,
        block,
        round,
        square,
        loading,
        disabled,
        hairline,
      },
    ]),
  ];
  if (hairline) {
    classes.concat([BORDER_SURROUND]);
  }

  return createElement(tag as string, {
    type: nativeType,
    className: classes,
    style: getStyle(),
    disabled,
    onClick,
    children: (
      <div className={bem('content') as any}>
        {/* {iconPosition === 'left' && renderIcon()} */}
        {renderText() || children}
        {/* {iconPosition === 'right' && renderIcon()} */}
      </div>
    ),
  });
}
