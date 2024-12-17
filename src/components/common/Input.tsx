import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label ? <label className="text-sm font-medium">{label}</label> : null}
      <input ref={ref} className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
