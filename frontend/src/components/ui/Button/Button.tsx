import Link from "next/link";
import { ButtonElement } from "./internal/ButtonElement";

export const Buttons = ["Primary", "Secondary"] as const;
export const States = ["Submit", "Negative", "Positive", "Navigation"] as const;

type ButtonType = (typeof Buttons)[number];
type State = (typeof States)[number];

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  buttonType?: ButtonType;
  state?: State;
  href?: string;
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  buttonType = Buttons[0], // Primary
  state = States[0], // Submit
  href,
  disabled = false,
  ...props
}: ButtonProps) => {
  return href ? (
    <Link href={href} className="w-full">
      <ButtonElement
        label={label}
        onClick={onClick}
        buttonType={buttonType}
        state={state}
        disabled={disabled}
        {...props}
      />
    </Link>
  ) : (
    <ButtonElement
      label={label}
      onClick={onClick}
      buttonType={buttonType}
      state={state}
      disabled={disabled}
      {...props}
    />
  );
};
