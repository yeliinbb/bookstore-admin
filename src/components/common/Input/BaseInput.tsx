import React, { InputHTMLAttributes } from 'react';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const BaseInput = ({ label, className, ...props }: BaseInputProps) => {
  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      {label ? (
        <label className="text-2xl font-medium w-fit min-w-40 text-white">
          {label}
        </label>
      ) : null}
      <input
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};
export default BaseInput;
