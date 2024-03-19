import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type MessageInputProps = {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const MessageInput = ({
  id,
  placeholder,
  type,
  required,
  register,
}: MessageInputProps) => {
  return (
    <div className={`relative w-full`}>
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`w-full px-4 py-2 font-light text-black rounded-full bg-neutral-100 focus:outline-none`}
      />
    </div>
  );
};

export default MessageInput;
