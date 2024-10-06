import React from "react";
import clsx from "clsx";
import { FieldValues } from "react-hook-form";

interface InputProps extends FieldValues {
  label: string;
  id: string;
  icon?: React.ReactNode;
  placeholder: string;
  errors: FieldValues;
  disabled?: boolean;
  register: any;
}

export const Input = ({
  label,
  id,
  type = "text",
  required = false,
  register,
  errors,
  disabled = false,
  icon: Icon,
  placeholder
}: InputProps) => {
  const autoCompleteValue = type === "password" ? "new-password" : "off";

  return (
    <div className="form-control">
      <label htmlFor={id.toString()} className="label pt-0">
        <span className="label-text">{label}</span>
      </label>
      <div
        className={clsx(
          "input input-bordered flex items-center gap-x-3 pr-0",
          type === "file" && "p-0 w-fit"
        )}
      >
        {Icon}

        <input
          placeholder={placeholder}
          type={type}
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `w-full h-full px-2`,
            !Icon && "px-0",
            type === "file" ? "file-input file-input-bordered w-fit px-0" : "",
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
          autoComplete={autoCompleteValue}
        />
      </div>
      {errors[id] && (
        <span className="text-red ml-3 mt-2">{errors[id].message}</span>
      )}
    </div>
  );
};
