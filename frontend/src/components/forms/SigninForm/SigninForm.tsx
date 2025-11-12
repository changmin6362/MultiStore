import { useState } from "react";
import { Input } from "../../ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";

// form 디자인용 div
const Divider = () => {
  return <div className="w-full border-b border-gray-400" />;
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
    <div className="justify-first flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-2">
        <div className="rounded-lg border border-gray-400 focus-within:border-black">
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
        <p className="text-sm text-red-500">{errorMessage}</p>
        {/* 체크박스 */}
        <Checkbox label="로그인 상태 유지" />
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
