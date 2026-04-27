import { useState } from "react";

interface Props {
  label: string;
  type: string;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name:string
}

export default function InputField({
  label,
  type = "text",
  autoFocus = false,
  onChange,
  value,
  name
}: Props) {
  const [focused, setFocused] = useState(autoFocus);

  return (
    <div className="mb-4">
      <label
        className={`block text-xs font-medium mb-1 transition-colors duration-150 ${
          focused ? "text-indigo-700" : "text-gray-500"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-3 py-2 rounded border bg-white text-sm text-gray-800 outline-none transition-all duration-150 ${
          focused
            ? "border-indigo-400 ring-1 ring-indigo-300"
            : "border-gray-300"
        }`}
      />
    </div>
  );
}
