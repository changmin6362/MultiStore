import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  hasBorder?: boolean; // border 유무 선택
}

export const Input = ({
  placeholder,
  type = "text",
  hasBorder = true,
  ...props
}: InputProps) => {
  return (
    <div
      className={`flex h-[60px] items-center justify-start gap-2.5 overflow-hidden ${
        // hasBorder 값에 따른 조건부 스타일 적용
        hasBorder
          ? "rounded-lg border border-gray-300"
          : "rounded-lg border border-transparent"
      } px-4 py-1.5`}
    >
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-lg font-normal text-black outline-none"
        {...props}
      />
    </div>
  );
};
