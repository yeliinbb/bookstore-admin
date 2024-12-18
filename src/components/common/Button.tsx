import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  className,
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded text-white min-w-fit',
        disabled && 'cursor-not-allowed opacity-50 bg-gray-300',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
