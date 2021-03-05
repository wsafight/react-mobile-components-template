import React, { Component } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import BasePickerViewProps from './PropsType';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';
import removeFnFromProps from './utils/removeFnFromProps';

export interface PickerViewProps extends BasePickerViewProps {
  prefixCls?: string;
  className?: string;
}

export default class PickerView extends Component<PickerViewProps, any> {
  static defaultProps = {
    prefixCls: 'za-picker-view',
    dataSource: [],
    cols: Infinity,
    valueMember: 'value',
    itemRender: (data) => data.label,
    disabled: false,
  };

  state: any = parseProps.getSource(this.props);

  // TODO: is this method still be used?
  static getDerivedStateFromProps(props, state) {
    if (
      !isEqual(
        removeFnFromProps(props, ['onChange']),
        removeFnFromProps(state.prevProps, ['onChange']),
      )
    ) {
      return {
        prevProps: props,
        ...parseProps.getSource(props),
      };
    }

    return null;
  }

  onValueChange = (selected: any, level: number) => {
    const value = this.state.value.slice();
    const { dataSource, onChange, valueMember, cols } = this.props;

    if (isCascader({ dataSource })) {
      value.length = level + 1;
    }
    value[level] = selected;
    const newState = parseProps.getSource({ dataSource, value, valueMember, cols });
    this.setState(newState);
    if (typeof onChange === 'function') {
      onChange(newState.objValue, level);
    }
  };

  renderWheel = () => {
    const { dataSource } = this.state;

    return dataSource.map((_item, index) => <div key={+index} />);
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(prefixCls, className);
    return (
      <div className={cls}>
        <div className={`${prefixCls}__content`}>{this.renderWheel()}</div>
        <div className={`${prefixCls}__mask ${prefixCls}__mask--top`} />
        <div className={`${prefixCls}__mask ${prefixCls}__mask--bottom`} />
      </div>
    );
  }
}
