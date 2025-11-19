/**
 * 로그인 폼 상태 관리 훅
 * 책임: 폼 상태(이메일, 비밀번호, 유효성 검사 에러) 관리
 */

import { useState } from "react";
import { validateSigninForm } from "../utils/validation";

export interface SigninFormState {
  email: string;
  password: string;
  validationErrors: {
    email?: string;
    password?: string;
  };
}

export const useSigninForm = () => {
  const [formState, setFormState] = useState<SigninFormState>({
    email: "",
    password: "",
    validationErrors: {}
  });

  const updateEmail = (value: string) => {
    setFormState((prev) => {
      const newState = { ...prev, email: value };
      const errors = validateSigninForm(value, prev.password);
      return {
        ...newState,
        validationErrors: errors
      };
    });
  };

  const updatePassword = (value: string) => {
    setFormState((prev) => {
      const newState = { ...prev, password: value };
      const errors = validateSigninForm(prev.email, value);
      return {
        ...newState,
        validationErrors: errors
      };
    });
  };

  const validateForm = () => {
    const errors = validateSigninForm(formState.email, formState.password);
    setFormState((prev) => ({
      ...prev,
      validationErrors: errors
    }));
    return Object.keys(errors).length === 0;
  };

  // 버튼 비활성화: 필드가 비어있거나 유효성 검사 에러가 있을 때
  const isFormInvalid =
    !formState.email ||
    !formState.password ||
    Object.keys(formState.validationErrors).length > 0;

  return {
    formState,
    updateEmail,
    updatePassword,
    validateForm,
    isFormInvalid
  };
};
