import React from 'react';
import { soundFx } from '../../utils/audio';

export const Button = ({
  children,
  variant = 'blue', // 'blue' | 'gold' | 'teal' | 'coral' | 'purple' | 'ghost'
  size = 'md',      // 'sm' | 'md' | 'lg'
  icon = null,
  onClick,
  className = '',
  sound = 'click',
  disabled = false,
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled) return;
    if (sound) soundFx.play(sound);
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    if (!disabled) soundFx.play('hover');
  };

  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = `btn-${variant}`;

  return (
    <button
      type="button"
      className={`btn-chunky ${variantClass} ${sizeClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon text-xl">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
