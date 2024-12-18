import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

const TextArea = ({ label, className, ...props }: TextAreaProps) => {
  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      {label ? (
        <label className="text-2xl font-medium w-fit min-w-40 text-white">
          {label}
        </label>
      ) : null}
      <textarea
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default TextArea;
