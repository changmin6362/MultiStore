export default function Home() {
  return (
    <div>
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
    </div>
  );
}
