import React from 'react';
import classNames from 'classnames';
import './style.scss';

interface Props {
  classes?: string;
  isRelative?: boolean;
}

export const Loader: React.FC<Props> = ({ classes = '', isRelative }) => {
  const loaderClasses = classNames({
    loader: true,
    [classes]: classes,
    loader_relative: isRelative,
  });
  return (
    <div className={loaderClasses}>
      <div className="loader__dot"></div>
      <div className="loader__dot"></div>
      <div className="loader__dot"></div>
      <div className="loader__dot"></div>
      <div className="loader__dot"></div>
      <div className="loader__dot"></div>
    </div>
  );
};
