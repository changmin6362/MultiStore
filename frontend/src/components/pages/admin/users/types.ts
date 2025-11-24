export interface RawUser {
  user_id: number;
  email_address: string;
  nick_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserResponse {
  userId: number;
  emailAddress: string;
  nickName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
