import type { ButtonProps } from "../Button";
import { Buttons, States } from "../Button";

export const ButtonElement = ({
  label,
  onClick,
  buttonType,
  state,
  disabled,
  ...props
}: ButtonProps) => {
  const isPrimary = buttonType === Buttons[0]; // Primary

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`flex h-[60px] w-full items-center justify-center rounded-xl border px-1.5 py-1.5 ${
        disabled
          ? "cursor-not-allowed border-gray-400 bg-gray-400 text-white"
          : "cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
      } ${
        !disabled &&
        state === States[0] &&
        (isPrimary
          ? "border-blue-500 bg-blue-500 text-white"
          : "border-blue-500 bg-transparent text-blue-500")
      } ${
        !disabled &&
        state === States[1] &&
        (isPrimary
          ? "border-yellow-500 bg-yellow-500 text-black"
          : "border-yellow-500 bg-transparent text-yellow-500")
      } ${
        !disabled &&
        state === States[2] &&
        (isPrimary
          ? "border-green-500 bg-green-500 text-black"
          : "border-green-500 bg-transparent text-green-500")
      } ${
        !disabled &&
        state === States[3] &&
        (isPrimary
          ? "border-purple-500 bg-purple-500 text-white"
          : "border-purple-500 bg-transparent text-purple-500")
      } `}
      {...props}
      onClick={onClick}
    >
      <span className="relative text-center font-bold whitespace-nowrap">
        {label}
      </span>
    </button>
  );
};
