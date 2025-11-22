/**
 * User Entity Type Definition
 * 백엔드 User 테이블 구조와 대응
 */
export interface User {
  userId: number;
  emailAddress: string;
  passwordHash: string;
  nickName: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  deletedAt: string | null;
}

/**
 * User 응답 타입 (passwordHash 제외 - 민감한 정보)
 */
export interface UserResponse {
  userId: number;
  emailAddress: string;
  nickName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/**
 * User 목록 응답 타입
 */
export interface UserListResponse {
  data: UserResponse[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  error: string;
  status: number;
  message?: string;
}
