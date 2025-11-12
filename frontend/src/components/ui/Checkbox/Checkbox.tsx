import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = ({ label, id, ...props }: CheckboxProps) => {
  // id를 사용해서 label과 checkbox를 하나로 취급함
  const checkboxId = id || `checkbox-${label.replace(/\s/g, "-")}`;

  return (
    <div className="flex w-full items-center justify-start gap-1 p-1">
      <input
        id={checkboxId}
        type="checkbox"
        className="form-checkbox h-3 w-3 cursor-pointer"
        {...props}
      />
      <label htmlFor={checkboxId} className="cursor-pointer text-xs">
        {label}
      </label>
    </div>
  );
};
