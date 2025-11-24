import type { UserResponse } from "../types";
import { UserRow } from "./UserRow";

interface UsersTableProps {
  users: UserResponse[];
  searchQuery: string;
}

export const UsersTable = ({ users, searchQuery }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-gray-500">
        {searchQuery ? "검색 결과가 없습니다" : "사용자가 없습니다"}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              이메일
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              닉네임
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              가입일
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              수정일
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              상태
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <UserRow key={user.userId} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
