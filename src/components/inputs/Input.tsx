"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

type InputProps = {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  errors: FieldErrors;
  type?: string;
  disabled: boolean;
};

const Input = ({
  id,
  label,
  register,
  required,
  errors,
  type = "text",
  disabled,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`
        block
        text-sm
        font-medium
        leading-6
        text-gray-900
      `}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
              form-input
              block
              w-full
              rounded-md
              border-0
              py-1.5
              text-gray-900
              shadow-sm
              ring-1
              ring-inset
              ring-gray-300
              placeholder:text-gray-400
              focus:ring-2
              focus:ring-inset
              focus:ring-orange-600
              sm:text-sm
              sm:leading-6
            `,
            errors[id] && "focus:ring-orange-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
