interface TextInputProps {
  name: string;
  id?: string;
  label: string;
  placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  // If id not provided, defaults id to name
  id = name,
  label,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="nama-lengkap">{label}</label>
      <input
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        className="outline-2 outline-gray-400 rounded-md px-2 py-1"
      />
    </div>
  );
};

export default TextInput;
