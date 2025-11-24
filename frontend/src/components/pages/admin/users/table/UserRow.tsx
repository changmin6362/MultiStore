import type { UserResponse } from "../types";

interface UserRowProps {
  user: UserResponse;
}

export const UserRow = ({ user }: UserRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-900">{user.userId}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.emailAddress}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.nickName}</td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString("ko-KR")}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(user.updatedAt).toLocaleDateString("ko-KR")}
      </td>
      <td className="px-6 py-4 text-sm">
        {user.deletedAt ? (
          <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
            삭제됨
          </span>
        ) : (
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            활성
          </span>
        )}
      </td>
    </tr>
  );
};
