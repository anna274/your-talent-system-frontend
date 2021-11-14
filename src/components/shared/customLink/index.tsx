import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './style.scss';

interface Props {
  classes?: string;
  to: string;
  children?: React.ReactNode;
  clickCallback?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

export const CustomLink: React.FC<Props> = ({ classes = '', to, children, clickCallback }) => {
  const linkClasses = classNames({
    link: true,
    [classes]: classes,
  });
  return (
    <Link className={linkClasses} to={to} onClick={clickCallback as React.MouseEventHandler}>
      {children}
    </Link>
  );
};
