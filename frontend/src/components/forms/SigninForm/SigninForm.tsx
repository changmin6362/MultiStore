"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Button } from "@/components/ui/Button/Button";
import { Divider } from "@/components/ui/Divider/Divider";

import { AuthFormWrapper } from "../AuthFormWrapper/AuthFormWrapper";
import { useSigninForm } from "./hooks/useSigninForm";
import { useLogin } from "@/hooks/useLogin";
import { formatValidationErrors, getErrorMessage } from "./utils/errorUtils";

export const SigninForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const {
    formState,
    updateEmail,
    updatePassword,
    validateForm,
    isFormInvalid
  } = useSigninForm();

  const { login, loading, error: apiError } = useLogin();

  // 로그인 버튼 동작
  const handleLoginClick = async () => {
    if (validateForm()) {
      await login({
        emailAddress: formState.email,
        password: formState.password
      });
    }
  };

  // 에러 메시지 검증
  const validationErrorMessage = formatValidationErrors(
    formState.validationErrors
  );

  // 에러 메시지 표시 (폼 검증 에러 우선, API 에러 다음)
  const displayErrorMessage = getErrorMessage(
    validationErrorMessage,
    apiError || ""
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
            disabled={loading}
          />
          <Divider />
          {/* 비밀번호 입력창*/}
          <Input
            placeholder="비밀번호"
            type="password"
            value={formState.password}
            onChange={(e) => updatePassword(e.target.value)}
            hasBorder={false}
            disabled={loading}
          />
        </div>
        {displayErrorMessage && (
          <p className="text-sm text-red-500">{displayErrorMessage}</p>
        )}
        <Checkbox
          label="로그인 상태 유지"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
      </div>
      <Button
        label={loading ? "로그인 중..." : "로그인"}
        onClick={handleLoginClick}
        disabled={isFormInvalid || loading}
      />
    </AuthFormWrapper>
  );
};
