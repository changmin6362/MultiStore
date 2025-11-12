import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({
  label = "이메일 주소",
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div
      className="px-1.5 py-1.5 flex justify-start items-center gap-2.5
        overflow-hidden"
    >
      <p className="text-[#8c8c8c] text-xs font-normal">{label}</p>

      <input
        type="text"
        placeholder={placeholder}
        className="text-black text-sm font-normal flex-1 outline-none"
        {...props}
      />
    </div>
  );
};
