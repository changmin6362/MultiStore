import type { RawUser, UserResponse } from "./types";

/**
 * snake_case를 camelCase로 변환
 */
export const convertUser = (raw: RawUser): UserResponse => ({
  userId: raw.user_id,
  emailAddress: raw.email_address,
  nickName: raw.nick_name,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  deletedAt: raw.deleted_at
});

/**
 * 사용자 목록을 검색어로 필터링
 */
export const filterUsers = (
  users: UserResponse[],
  searchQuery: string
): UserResponse[] => {
  if (!searchQuery.trim()) {
    return users;
  }

  const lowercaseQuery = searchQuery.toLowerCase();
  return users.filter(
    (user) =>
      user.emailAddress.toLowerCase().includes(lowercaseQuery) ||
      user.nickName.toLowerCase().includes(lowercaseQuery) ||
      user.userId.toString().includes(lowercaseQuery)
  );
};
