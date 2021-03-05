import React from 'react';
import classnames from 'classnames';
import Header from '@site/web/components/Header';
import './style.scss';

const Container = ({ className, children, ...others }) => {
  const cls = classnames('app-container', className);

  return (
    <div className={cls} {...others}>
      <Header>{children}</Header>
    </div>
  );
};

export default Container;
