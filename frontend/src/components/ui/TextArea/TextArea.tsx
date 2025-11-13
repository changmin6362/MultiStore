interface TextAreaProps {
  placeholder?: string;
  rows?: number; // textarea가 표시할 고정 줄 높이
  hasBorder?: boolean; // border 유무 선택
}

export const TextArea = ({
  placeholder,
  rows = 4,
  hasBorder = true,
  ...props
}: TextAreaProps) => {
  return (
    <div
      className={`flex justify-start gap-2.5 overflow-hidden ${
        // hasBorder 값에 따른 조건부 스타일 적용
        hasBorder
          ? "rounded-lg border border-gray-300"
          : "rounded-lg border border-transparent"
      } px-4 py-1.5`}
    >
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="flex-1 resize-none bg-transparent text-sm font-normal text-black outline-none"
        {...props}
      />
    </div>
  );
};
