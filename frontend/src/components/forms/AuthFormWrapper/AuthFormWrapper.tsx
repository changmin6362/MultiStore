interface AuthFormWrapperProps {
  children: React.ReactNode;
}

export const AuthFormWrapper = ({ children }: AuthFormWrapperProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-10 pt-12 md:px-30 lg:px-60">
      <div className="justify-first flex w-full flex-col items-center gap-6 rounded-2xl border border-gray-400 px-4 py-6">
        {children}
      </div>
    </div>
  );
};
