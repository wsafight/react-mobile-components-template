import React, { Component } from 'react';
import BaseDatePickerProps from './PropsType';
import Popup from '../popup';
import DatePickerView from '../date-picker-view';
import { parseState } from '../date-picker-view/utils/parseState';

export interface DatePickerProps extends BaseDatePickerProps {
  prefixCls?: string;
  className?: string;
}

export default class DatePicker extends Component<DatePickerProps, any> {
  static defaultProps: DatePickerProps = {
    mode: 'date',
    minuteStep: 1,
    prefixCls: 'za-date-picker',
    valueMember: 'value',
    maskClosable: true,
    onCancel: () => {},
    onInit: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { ...parseState(props), stopScroll: false };
  }

  onCancel = () => {
    const { onCancel } = this.props;
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  onOk = async () => {
    const { onOk } = this.props;
    this.setState({
      stopScroll: true,
    });

    setTimeout(() => {
      const { date } = this.state;

      if (typeof onOk === 'function') {
        onOk(date);
      }
    }, 0);
  };

  onInit = (selected) => {
    this.setState({
      date: selected,
    });
  };

  onValueChange = (newValue) => {
    const { onChange } = this.props;
    const { stopScroll } = this.state;
    const stateData = stopScroll ? { date: newValue, stopScroll: false } : { date: newValue };
    this.setState(stateData);

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  render() {
    const {
      prefixCls,
      className,
      title,
      okText,
      cancelText,
      locale,
      mountContainer,
      maskClosable,
      onOk,
      onCancel,
      onInit,
      visible,
      ...others
    } = this.props;
    const { date, stopScroll } = this.state;
    const noop = () => {};

    return (
      <Popup
        className={className}
        visible={visible}
        onMaskClick={maskClosable ? this.onCancel : noop}
        mountContainer={mountContainer}
        destroy
      >
        <div
          className={prefixCls}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${prefixCls}__header`}>
            <div className={`${prefixCls}__cancel`} onClick={this.onCancel}>
              {cancelText || locale!.cancelText}
            </div>
            <div className={`${prefixCls}__title`}>{title || locale!.title}</div>
            <div className={`${prefixCls}__submit`} onClick={this.onOk}>
              {okText || locale!.okText}
            </div>
          </div>
          <DatePickerView
            {...others}
            className={className}
            value={date}
            onInit={this.onInit}
            onChange={this.onValueChange}
            stopScroll={stopScroll}
          />
        </div>
      </Popup>
    );
  }
}
