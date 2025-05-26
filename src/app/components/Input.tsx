import React, { FC } from "react";

type CustomInputProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  required?: boolean;
  error?: string;
  textArea?: boolean;
};

const Input: FC<CustomInputProps> = (props) => {
  return (
    <div>
      <label className="block text-sm font-normal leading-none mb-3 text-primary">
        {props.label}
        {props.required && <span className="text-dark-red">*</span>}
      </label>
      {props.textArea ? (
        <textarea
          rows={4}
          {...props}
          className="w-full border border-ligth-grey rounded px-3 py-2"
        />
      ) : (
        <input
          {...props}
          className="w-full border border-ligth-grey rounded px-3 py-2"
        />
      )}
      {props.error && (
        <p className="text-dark-red text-sm mt-1">{props.error}</p>
      )}
    </div>
  );
};

export default Input;
