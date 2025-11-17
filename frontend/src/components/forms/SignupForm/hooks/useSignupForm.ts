/**
 * 회원가입 폼 상태 관리 훅
 * 책임: 폼 상태(이메일, 닉네임, 비밀번호, 유효성 검사 에러) 관리
 */

import { useState } from "react";
import { validateSignupForm } from "../utils/validation";

export interface SignupFormState {
  email: string;
  nickname: string;
  password: string;
  validationErrors: {
    email?: string;
    nickname?: string;
    password?: string;
  };
}

export const useSignupForm = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    email: "",
    nickname: "",
    password: "",
    validationErrors: {}
  });

  const updateEmail = (value: string) => {
    setFormState((prev) => {
      const newState = { ...prev, email: value };
      const errors = validateSignupForm(value, prev.nickname, prev.password);
      return {
        ...newState,
        validationErrors: errors
      };
    });
  };

  const updateNickname = (value: string) => {
    setFormState((prev) => {
      const newState = { ...prev, nickname: value };
      const errors = validateSignupForm(prev.email, value, prev.password);
      return {
        ...newState,
        validationErrors: errors
      };
    });
  };

  const updatePassword = (value: string) => {
    setFormState((prev) => {
      const newState = { ...prev, password: value };
      const errors = validateSignupForm(prev.email, prev.nickname, value);
      return {
        ...newState,
        validationErrors: errors
      };
    });
  };

  const validateForm = () => {
    const errors = validateSignupForm(
      formState.email,
      formState.nickname,
      formState.password
    );
    setFormState((prev) => ({
      ...prev,
      validationErrors: errors
    }));
    return Object.keys(errors).length === 0;
  };

  // 버튼 비활성화: 필드가 비어있거나 유효성 검사 에러가 있을 때
  const isFormInvalid =
    !formState.email ||
    !formState.nickname ||
    !formState.password ||
    Object.keys(formState.validationErrors).length > 0;

  return {
    formState,
    updateEmail,
    updateNickname,
    updatePassword,
    validateForm,
    isFormInvalid
  };
};
