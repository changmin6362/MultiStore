"use client";

import { useState } from "react";
import { useUsersFetch } from "./hooks/useUsersFetch";
import { filterUsers } from "./utils";
import { SearchBar, UserStats } from "./ui";
import { ErrorMessage, LoadingState } from "./states";
import { UsersTable } from "./table";

export const UsersManagement = () => {
  const { users, loading, error } = useUsersFetch();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = filterUsers(users, searchQuery);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">사용자 관리</h1>

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
