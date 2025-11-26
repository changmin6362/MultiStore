/**
 * API 응답 결과 타입 (성공 케이스)
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  error: null;
  status: number;
}

/**
 * API 응답 결과 타입 (실패 케이스)
 */
export interface ApiFailure {
  success: false;
  data: null;
  error: ApiErrorResponse;
  status: number;
}

/**
 * API 응답 결과 타입 (성공 | 실패)
 */
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  error: string;
  status: number;
  message?: string;
}

/**
 * Fetch 옵션
 */
export interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: unknown;
}

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
 * RBAC 역할 DTO
 */
export interface RoleDto {
  roleId: number;
  roleName: string;
  roleDescription: string;
}

/**
 * 역할 목록 응답 타입
 */
export interface RolesResponse {
  success: boolean;
  roles: RoleDto[];
}

/**
 * 역할 할당 응답 타입
 */
export interface AssignedResponse {
  success: boolean;
  assigned: boolean;
}

/**
 * 역할 제거 응답 타입
 */
export interface RemovedResponse {
  success: boolean;
  removed: boolean;
}

/**
 * 권한 DTO
 */
export interface PermissionDto {
  permissionId: number;
  permissionName: string;
  permissionDescription?: string;
  resourceType: string;
  actionType: string;
}

/**
 * 권한 목록 응답 타입
 */
export interface PermissionsResponse {
  success: boolean;
  permissions: PermissionDto[];
}

/**
 * 역할 생성 요청
 */
export interface RoleCreateRequest {
  roleName: string;
  roleDescription?: string;
}

/**
 * 권한 생성 요청
 */
export interface PermissionCreateRequest {
  permissionName: string;
  permissionDescription?: string;
  resourceType: string;
  actionType: string;
}

/**
 * 역할 생성 응답
 */
export interface RoleResponse {
  success: boolean;
  role?: RoleDto;
  data?: RoleDto;
}

/**
 * 권한 생성 응답
 */
export interface PermissionResponse {
  success: boolean;
  permission?: PermissionDto;
  data?: PermissionDto;
}

/**
 * 권한 확인 응답
 */
export interface AllowedResponse {
  allowed: boolean;
}
