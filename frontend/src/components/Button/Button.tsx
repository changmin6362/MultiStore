interface MyButtonProps {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}

export const MyButton = ({
  label,
  primary = false,
  ...props
}: MyButtonProps) => {
  const mode = primary ? "bg-blue-500 text-white" : "bg-gray-200 text-black";
  return (
    <button
      type="submit"
      className={`pt-var(--size-space-150) relative flex cursor-pointer flex-col items-center gap-(--size-space-0) overflow-hidden rounded-[5px] border border-solid border-[#0088ff] bg-[#0088ff] px-6 pb-(--size-space-150) transition-colors hover:bg-[#0077ee] focus:ring-2 focus:ring-[#0088ff] focus:ring-offset-2 focus:outline-none active:bg-[#0066dd] ${mode}`}
      {...props}
    >
      <span className="font-m3-body-small-emphasized text-colors-miscellaneous-text-field-BG relative mt-px w-fit text-center leading-(--m3-body-small-emphasized-line-height) font-(--m3-body-small-emphasized-font-weight) tracking-(--m3-body-small-emphasized-letter-spacing) whitespace-nowrap text-(--m3-body-small-emphasized-font-size) [font-style:var(--m3-body-small-emphasized-font-style)]">
        {label}
      </span>
      <div className="p-8">
        {/* 기본 폰트 (Noto Sans KR + Inter) */}
        <h1 className="font-sans text-4xl font-bold">안녕하세요 Hello World</h1>

        {/* Inter만 사용 */}
        <p className="font-inter text-lg">This text uses Inter font</p>

        {/* Noto Sans KR만 사용 */}
        <p className="font-noto text-lg">
          이 텍스트는 Noto Sans KR 폰트를 사용합니다
        </p>

        {/* 코드 블록 */}
        <code className="rounded bg-gray-100 px-2 py-1 font-mono">
          const hello = `world`;
        </code>
      </div>
    </button>
  );
};
