import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ placeholder, type = "text", ...props }: InputProps) => {
  return (
    <div
      className="px-4 py-1.5 flex justify-start items-center gap-2.5
        overflow-hidden"
    >
      <input
        type={type}
        placeholder={placeholder}
        className="text-black text-sm font-normal flex-1 outline-none"
        {...props}
      />
    </div>
  );
};
