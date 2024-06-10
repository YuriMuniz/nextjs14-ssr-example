import { Input } from "@nextui-org/react";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

type InputComponentProps = {
  type: string;
  name: string;
  register: UseFormRegister<any>;
  errors: Partial<FieldErrorsImpl<any>>;
  label: string;
};

export default function InputComponent({
  type,
  name,
  register,
  errors,
  label,
}: InputComponentProps) {
  const error = errors[name]?.message as string;
  return (
    <div className="flex flex-col">
      <label data-testid={name} htmlFor={name}>
        {label}
      </label>
      <input
        aria-label={name}
        id={name}
        className="text-[#000] rounded-lg h-12 p-6"
        type={type}
        {...register(name)}
      />
      {error && (
        <p
          role="alert"
          data-testid={`${name}-error`}
          className="text-red-500 text-[12px] mt-2"
        >
          {error}
        </p>
      )}
    </div>
  );
}
