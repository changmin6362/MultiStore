type ButtonType = "primary" | "secondary";
type State = "cancel" | "submit" | "negative" | "positive" | "navigation";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  buttonType?: ButtonType;
  state?: State;
}

export const Button = ({
  label,
  onClick,
  buttonType = "primary",
  state = "cancel",
  ...props
}: ButtonProps) => {
  const isPrimary = buttonType === "primary";

  return (
    <button
      type="submit"
      className={` /* 기본 스타일 */ relative flex w-full cursor-pointer flex-col
        items-center justify-center overflow-hidden rounded-[5px] border
        border-solid px-1.5 py-1.5 transition-opacity hover:opacity-90
        active:opacity-80 /* 상태별 색상 로직 */ ${
          state === "cancel" &&
          (isPrimary
            ? "bg-gray-400 text-white border-gray-400"
            : "border-gray-400 text-gray-400 bg-transparent")
        } ${
          state === "submit" &&
          (isPrimary
            ? "bg-blue-500 text-white border-blue-500"
            : "border-blue-500 text-blue-500 bg-transparent")
        } ${
          state === "negative" &&
          (isPrimary
            ? "bg-yellow-500 text-black border-yellow-500"
            : "border-yellow-500 text-yellow-500 bg-transparent")
        } ${
          state === "positive" &&
          (isPrimary
            ? "bg-green-500 text-black border-green-500"
            : "border-green-500 text-green-500 bg-transparent")
        } ${
          state === "navigation" &&
          (isPrimary
            ? "bg-purple-500 text-white border-purple-500"
            : "border-purple-500 text-purple-500 bg-transparent")
        } `}
      {...props}
      onClick={onClick}
    >
      <span className="relative w-fit text-center whitespace-nowrap">
        {label}
      </span>
    </button>
  );
};
