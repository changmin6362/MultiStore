import { useState } from "react";
import type { RoleDto } from "@/app/api/.common/types";
import { RoleTag } from "./RoleTag";
import { RoleAssignModal } from "./RoleAssignModal";

interface UserRolesDisplayProps {
  roles: RoleDto[];
  onAssign: (roleId: number) => Promise<void>;
  onRemove: (roleId: number) => Promise<void>;
  loading?: boolean;
}

export const UserRolesDisplay = ({
  roles,
  onAssign,
  onRemove,
  loading = false
}: UserRolesDisplayProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removingRoleId, setRemovingRoleId] = useState<number | null>(null);

  const handleRemoveRole = async (roleId: number) => {
    setRemovingRoleId(roleId);
    try {
      await onRemove(roleId);
    } finally {
      setRemovingRoleId(null);
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">역할</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
          className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
        >
          역할 할당
        </button>
      </div>

      {roles.length === 0 ? (
        <p className="text-sm text-gray-500">할당된 역할이 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <RoleTag
              key={role.roleId}
              role={role}
              onRemove={handleRemoveRole}
              isRemoving={removingRoleId === role.roleId}
            />
          ))}
        </div>
      )}

      <RoleAssignModal
        assignedRoles={roles}
        onAssign={onAssign}
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </div>
  );
};
