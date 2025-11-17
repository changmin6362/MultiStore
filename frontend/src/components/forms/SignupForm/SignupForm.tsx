"use client";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Divider } from "@/components/ui/Divider/Divider";

import { AuthFormWrapper } from "../AuthFormWrapper/AuthFormWrapper";
import { useSignupForm } from "./hooks/useSignupForm";
import { formatValidationErrors, getErrorMessage } from "./utils/errorUtils";

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
  const {
    formState,
    updateEmail,
    updateNickname,
    updatePassword,
    validateForm,
    isFormInvalid
  } = useSignupForm();

  // 회원가입 버튼 동작
  const handleSignupClick = () => {
    if (validateForm()) {
      onSignup({
        email: formState.email,
        nickname: formState.nickname,
        password: formState.password
      });
    }
  };

  // 에러 메시지 검증
  const validationErrorMessage = formatValidationErrors(
    formState.validationErrors
  );

  // 에러 메시지 표시
  const displayErrorMessage = getErrorMessage(
    validationErrorMessage,
    errorMessage
  );

  return (
    <AuthFormWrapper>
      <div className="flex w-full flex-col gap-2">
        <div className="rounded-lg border border-gray-400">
          {/* 이메일 입력창*/}
          <Input
            placeholder="이메일 주소"
            type="email"
            value={formState.email}
            onChange={(e) => updateEmail(e.target.value)}
            hasBorder={false}
          />
          <Divider />
          {/* 닉네임 입력창*/}
          <Input
            placeholder="닉네임"
            type="text"
            value={formState.nickname}
            onChange={(e) => updateNickname(e.target.value)}
            hasBorder={false}
          />
          <Divider />
          {/* 비밀번호 입력창*/}
          <Input
            placeholder="비밀번호"
            type="password"
            value={formState.password}
            onChange={(e) => updatePassword(e.target.value)}
            hasBorder={false}
          />
        </div>
        {displayErrorMessage && (
          <p className="text-sm text-red-500">{displayErrorMessage}</p>
        )}
      </div>
      <Button
        label="회원가입"
        onClick={handleSignupClick}
        disabled={isFormInvalid}
      />
    </AuthFormWrapper>
  );
};
