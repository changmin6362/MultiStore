import { useState } from "react";
import { Input } from "../../ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { ImageViewer } from "@/components/ui/ImageViewer/ImageViewer";
import check from "@public/check.svg";

// form 디자인용 div
const Divider = () => {
  return <div className="border-b border-gray-400 w-full" />;
};

interface SigninFormProps {
  onSignin: (data: { email: string; password: string }) => void;
  errorMessage?: string;
}

export const SigninForm = ({
  onSignin,
  errorMessage = ""
}: SigninFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormInvalid = !email || !password;

  const handleLoginClick = () => {
    onSignin({ email, password });
  };

  return (
    <div className="w-full flex flex-col justify-first items-center gap-6">
      <div className="w-full gap-2 flex flex-col">
        <div
          className="border rounded-lg border-gray-400
            focus-within:border-black"
        >
          {/* 이메일 입력창*/}
          <Input
            placeholder="이메일 주소"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Divider />
          {/* 비밀번호 입력창*/}
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* 에러 메시지 표시 */}
        <p className="text-red-500 text-sm">{errorMessage}</p>

        <div className="p-1 flex justify-start items-center gap-1">
          <ImageViewer imageSrc={check} alt="check" width={12} height={12} />
          <p className="text-xs">로그인 상태 유지</p>
        </div>
      </div>
      {/* form의 submit 버튼 */}
      <Button
        label="로그인"
        onClick={handleLoginClick}
        disabled={isFormInvalid}
        state="Submit"
      />
    </div>
  );
};
