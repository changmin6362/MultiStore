/**
 * 로그인 폼 검증 로직
 */

interface ValidationError {
  email?: string;
  password?: string;
}

/**
 * 이메일 유효성 검사
 */
export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "이메일을 입력해주세요";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "유효한 이메일 주소를 입력해주세요";
  }

  return undefined;
};

/**
 * 비밀번호 유효성 검사
 */
export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "비밀번호를 입력해주세요";
  }

  if (password.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다";
  }

  return undefined;
};

/**
 * 전체 폼 검증
 */
export const validateSigninForm = (
  email: string,
  password: string
): ValidationError => {
  const errors: ValidationError = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};

/**
 * 폼이 유효한지 확인
 */
export const isFormValid = (email: string, password: string): boolean => {
  const errors = validateSigninForm(email, password);
  return Object.keys(errors).length === 0;
};
