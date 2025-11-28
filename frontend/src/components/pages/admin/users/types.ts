export interface RawUser {
  userId: number;
  emailAddress: string;
  nickName: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface UserResponse {
  userId: number;
  emailAddress: string;
  nickName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UsersApiResponse {
  success: boolean;
  // 백엔드 ApiResponse 스키마 변경 반영: data가 바로 사용자 배열을 담습니다.
  // 하위 호환을 위해 훅에서 data.users도 함께 처리합니다.
  data: RawUser[];
}
