import { ChangeEventHandler } from "react";

interface TextInputProps {
  name: string;
  id?: string;
  label: string;
  placeholder: string;
  isPassword?: boolean;
  value?: string;
  onChange?: ChangeEventHandler;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  // If id not provided, defaults id to name
  id = name,
  label,
  placeholder,
  isPassword = false,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-2 w-full sm:text-lg">
      <label htmlFor={id}>{label}</label>
      <input
        type={isPassword ? "password" : type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="outline-2 outline-gray-400 rounded-md px-2 py-1"
      />
    </div>
  );
};

export default TextInput;
