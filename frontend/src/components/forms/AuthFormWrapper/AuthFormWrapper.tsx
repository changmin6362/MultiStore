import { Button } from "@/components/ui/Button/Button";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  errorMessage?: string;
  buttonLabel: string;
  onSubmit: () => void;
  isDisabled: boolean;
  additionalContent?: React.ReactNode;
}

export const AuthFormWrapper = ({
  children,
  errorMessage = "",
  buttonLabel,
  onSubmit,
  isDisabled,
  additionalContent
}: AuthFormWrapperProps) => {
  return (
    <div className="justify-first flex w-full flex-col items-center gap-6 rounded-2xl border border-gray-400 px-4 py-6">
      <div className="flex w-full flex-col gap-2">
        <div className="rounded-lg border border-gray-400">{children}</div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {additionalContent && <div>{additionalContent}</div>}
      </div>
      <Button
        label={buttonLabel}
        onClick={onSubmit}
        disabled={isDisabled}
        state="Submit"
      />
    </div>
  );
};
