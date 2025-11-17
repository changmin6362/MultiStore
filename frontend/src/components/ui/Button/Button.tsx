export const Buttons = ["Primary", "Secondary"] as const;
export const States = ["Submit", "Negative", "Positive", "Navigation"] as const;

type ButtonType = (typeof Buttons)[number];
type State = (typeof States)[number];

interface ButtonProps {
  label: string;
  onClick?: () => void;
  buttonType?: ButtonType;
  state?: State;
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  buttonType = Buttons[0], // Primary
  state = States[0], // Submit
  disabled = false,
  ...props
}: ButtonProps) => {
  const isPrimary = buttonType === Buttons[0]; // Primary

  return (
    <button
      type="submit"
      disabled={disabled}
      // 공통적으로 적용될 버튼의 기본 스타일
      className={`flex w-full flex-1 flex-col items-center justify-center rounded-[5px] border px-1.5 py-1.5 ${
        disabled
          ? // disabled가 true일 때 적용된 스타일
            "cursor-not-allowed border-gray-400 bg-gray-400 text-white"
          : // disabled가 false일 때 적용될 스타일
            `cursor-pointer transition-opacity hover:opacity-90 active:opacity-80`
      } ${
        // disabled가 아닐 때 state에 따라 적용될 스타일

        !disabled &&
        state === States[0] && // Submit
        (isPrimary
          ? "border-blue-500 bg-blue-500 text-white"
          : "border-blue-500 bg-transparent text-blue-500")
      } ${
        !disabled &&
        state === States[1] && // Negative
        (isPrimary
          ? "border-yellow-500 bg-yellow-500 text-black"
          : "border-yellow-500 bg-transparent text-yellow-500")
      } ${
        !disabled &&
        state === States[2] && // Positive
        (isPrimary
          ? "border-green-500 bg-green-500 text-black"
          : "border-green-500 bg-transparent text-green-500")
      } ${
        !disabled &&
        state === States[3] && // Navigatoin
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
