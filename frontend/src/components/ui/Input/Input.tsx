import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ placeholder, type = "text", ...props }: InputProps) => {
  return (
    <div className="flex items-center justify-start gap-2.5 overflow-hidden px-4 py-1.5">
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 text-sm font-normal text-black outline-none"
        {...props}
      />
    </div>
  );
};
