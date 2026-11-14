import React from 'react';
import { soundFx } from '../../utils/audio';

export const Card = ({
  children,
  className = '',
  interactive = false,
  onClick,
  style = {},
  ...props
}) => {
  const handleClick = (e) => {
    if (interactive && onClick) {
      soundFx.play('click');
      onClick(e);
    }
  };

  const handleMouseEnter = () => {
    if (interactive) soundFx.play('hover');
  };

  return (
    <div
      className={`space-card ${interactive ? 'space-card-interactive' : ''} ${className}`}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </div>
  );
};
