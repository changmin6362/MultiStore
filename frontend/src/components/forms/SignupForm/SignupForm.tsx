import { useState } from "react";
import { Input } from "../../ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";

// form 디자인용 div
const Divider = () => {
  return <div className="w-full border-b border-gray-400" />;
};

interface SignupFormProps {
  onSignup: (data: {
    email: string;
    nickname: string;
    password: string;
  }) => void;
  errorMessage?: string;
}

export const SignupForm = ({
  onSignup,
  errorMessage = ""
}: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const isFormInvalid = !email || !password;

  const handleLoginClick = () => {
    onSignup({ email, nickname, password });
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
          {/* 닉네임 입력창*/}
          <Input
            placeholder="닉네임"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
      </div>
      {/* form의 submit 버튼 */}
      <Button
        label="회원가입"
        onClick={handleLoginClick}
        disabled={isFormInvalid}
        state="Submit"
      />
    </div>
  );
};
