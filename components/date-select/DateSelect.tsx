import React, { PureComponent } from 'react';
import classnames from 'classnames';
import BaseDateSelectProps from './PropsType';

export interface DateSelectProps extends BaseDateSelectProps {
  prefixCls?: string;
  className?: string;
}

export default class DateSelect extends PureComponent<DateSelectProps, any> {
  static defaultProps: DateSelectProps = {
    prefixCls: 'za-date-select',
    mode: 'date',
    disabled: false,
    minuteStep: 1,
    valueMember: 'value',
    hasArrow: true,
    onCancel: () => {},
  };

  static getDerivedStateFromProps(props) {
    return {
      selectValue: props.value,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectValue: props.value,
    };
  }

  handleClick = () => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }
    this.setState({
      visible: true,
    });
  };

  onChange = (selected) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selected);
    }
  };

  onOk = (selected) => {
    const { onOk } = this.props;
    this.setState({
      visible: false,
      selectValue: selected,
    });

    if (typeof onOk === 'function') {
      onOk(selected);
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ visible: false });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  render() {
    const { prefixCls,  disabled, hasArrow } = this.props;
    const { selectValue } = this.state;

    const cls = classnames(prefixCls, {
      [`${prefixCls}--placeholder`]: !selectValue,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--arrow`]: hasArrow,
    });

    return (
      <div className={cls} onClick={this.handleClick}>
      </div>
    );
  }
}
