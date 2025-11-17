"use client";

import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { AuthFormWrapper } from "../AuthFormWrapper/AuthFormWrapper";
import { useSigninForm } from "./hooks/useSigninForm";
import { formatValidationErrors, getErrorMessage } from "./utils/errorUtils";

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
  const {
    formState,
    updateEmail,
    updatePassword,
    validateForm,
    isFormInvalid
  } = useSigninForm();

  // 로그인 버튼 동작
  const handleLoginClick = () => {
    if (validateForm()) {
      onSignin({
        email: formState.email,
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
    <AuthFormWrapper
      errorMessage={displayErrorMessage}
      buttonLabel="로그인"
      onSubmit={handleLoginClick}
      isDisabled={isFormInvalid}
      additionalContent={<Checkbox label="로그인 상태 유지" />}
    >
      {/* 이메일 입력창*/}
      <Input
        placeholder="이메일 주소"
        type="email"
        value={formState.email}
        onChange={(e) => updateEmail(e.target.value)}
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
    </AuthFormWrapper>
  );
};
