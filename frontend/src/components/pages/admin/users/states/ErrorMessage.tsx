interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{message}</div>
  );
};
