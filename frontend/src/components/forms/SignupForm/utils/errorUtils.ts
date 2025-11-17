/**
 * 에러 메시지 포맷팅 유틸
 * 책임: 유효성 검사 에러를 사용자 친화적인 메시지로 변환
 */

interface ValidationError {
  email?: string;
  nickname?: string;
  password?: string;
}

/**
 * 유효성 검사 에러를 하나의 메시지 문자열로 변환
 */
export const formatValidationErrors = (
  validationErrors: ValidationError
): string => {
  const messages: string[] = [];

  if (validationErrors.email) {
    messages.push(validationErrors.email);
  }

  if (validationErrors.nickname) {
    messages.push(validationErrors.nickname);
  }

  if (validationErrors.password) {
    messages.push(validationErrors.password);
  }

  return messages.join(", ");
};

/**
 * 표시할 에러 메시지 결정 (유효성 검사 에러 우선)
 */
export const getErrorMessage = (
  validationErrorMessage: string,
  serverErrorMessage: string
): string => {
  return validationErrorMessage || serverErrorMessage;
};
