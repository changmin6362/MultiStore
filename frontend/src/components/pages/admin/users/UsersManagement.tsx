"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { useUsersFetch } from "./hooks/useUsersFetch";
import { filterUsers } from "./utils";
import { SearchBar, UserStats } from "./ui";
import { ErrorMessage, LoadingState } from "./states";
import { UsersTable } from "./table";

export const UsersManagement = () => {
  const router = useRouter();
  const { users, loading, error } = useUsersFetch();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = filterUsers(users, searchQuery);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">사용자 관리</h1>
        </div>
        <Button
          label="역할 및 권한 관리"
          onClick={() => router.push("/admin/roles")}
          state="Navigation"
        />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          disabled={loading}
        />

        {error && <ErrorMessage message={error} />}

        {loading && <LoadingState />}

        {!loading && (
          <>
            <UserStats
              filteredCount={filteredUsers.length}
              totalCount={users.length}
            />
            <UsersTable users={filteredUsers} searchQuery={searchQuery} />
          </>
        )}
      </div>
    </div>
  );
};
