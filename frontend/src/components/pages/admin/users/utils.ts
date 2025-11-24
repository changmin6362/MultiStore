import type { RawUser, UserResponse } from "./types";

/**
 * camelCase 데이터를 UserResponse 형태로 변환
 */
export const convertUser = (raw: RawUser): UserResponse => ({
  userId: raw.userId,
  emailAddress: raw.emailAddress,
  nickName: raw.nickName,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt || raw.createdAt,
  deletedAt: raw.deletedAt || null
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
