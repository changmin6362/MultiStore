/**
 * 회원가입 요청 타입
 */
export interface SignupRequest {
  emailAddress: string;
  password: string;
  nickName: string;
}

/**
 * 로그인 요청 타입
 */
export interface LoginRequest {
  emailAddress: string;
  password: string;
}

/**
 * 인증 응답 타입 (토큰 포함)
 */
export interface AuthResponse {
  userId: number;
  emailAddress: string;
  nickName: string;
  accessToken: string;
  refreshToken?: string;
  createdAt: string;
}

/**
 * 인증 에러 타입
 */
export interface AuthError {
  error: string;
  status: number;
  message?: string;
}
