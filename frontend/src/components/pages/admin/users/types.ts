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
  users: RawUser[];
}
