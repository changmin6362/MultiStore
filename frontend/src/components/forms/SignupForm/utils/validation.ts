/**
 * 회원가입 폼 검증 로직
 */

interface ValidationError {
  email?: string;
  nickname?: string;
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
 * 닉네임 유효성 검사
 */
export const validateNickname = (nickname: string): string | undefined => {
  if (!nickname) {
    return "닉네임을 입력해주세요";
  }

  if (nickname.length < 2) {
    return "닉네임은 2자 이상이어야 합니다";
  }

  if (nickname.length > 20) {
    return "닉네임은 20자 이하여야 합니다";
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
export const validateSignupForm = (
  email: string,
  nickname: string,
  password: string
): ValidationError => {
  const errors: ValidationError = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const nicknameError = validateNickname(nickname);
  if (nicknameError) {
    errors.nickname = nicknameError;
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
export const isFormValid = (
  email: string,
  nickname: string,
  password: string
): boolean => {
  const errors = validateSignupForm(email, nickname, password);
  return Object.keys(errors).length === 0;
};
