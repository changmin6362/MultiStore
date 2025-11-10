export const Buttons = ["Primary", "Secondary"] as const;
export const States = [
  "Cancel",
  "Submit",
  "Negative",
  "Positive",
  "Navigation"
] as const;

type ButtonType = (typeof Buttons)[number];
type State = (typeof States)[number];

interface ButtonProps {
  label: string;
  onClick?: () => void;
  buttonType?: ButtonType;
  state?: State;
}

export const Button = ({
  label,
  onClick,
  buttonType = Buttons[0],
  state = States[0],
  ...props
}: ButtonProps) => {
  const isPrimary = buttonType === Buttons[0];

  return (
    <button
      type="submit"
      className={` /* 기본 스타일 */ relative flex w-full cursor-pointer flex-col
        items-center justify-center overflow-hidden rounded-[5px] border
        border-solid px-1.5 py-1.5 transition-opacity hover:opacity-90
        active:opacity-80 /* 상태별 색상 로직 */ ${
          state === States[0] &&
          (isPrimary
            ? "bg-gray-400 text-white border-gray-400"
            : "border-gray-400 text-gray-400 bg-transparent")
        } ${
          state === States[1] &&
          (isPrimary
            ? "bg-blue-500 text-white border-blue-500"
            : "border-blue-500 text-blue-500 bg-transparent")
        } ${
          state === States[2] &&
          (isPrimary
            ? "bg-yellow-500 text-black border-yellow-500"
            : "border-yellow-500 text-yellow-500 bg-transparent")
        } ${
          state === States[3] &&
          (isPrimary
            ? "bg-green-500 text-black border-green-500"
            : "border-green-500 text-green-500 bg-transparent")
        } ${
          state === States[4] &&
          (isPrimary
            ? "bg-purple-500 text-white border-purple-500"
            : "border-purple-500 text-purple-500 bg-transparent")
        } `}
      {...props}
      onClick={onClick}
    >
      <span className="relative text-center whitespace-nowrap font-bold">
        {label}
      </span>
    </button>
  );
};
