import type { RoleDto } from "@/app/api/.common/types";

interface RoleTagProps {
  role: RoleDto;
  onRemove?: (roleId: number) => void;
  isRemoving?: boolean;
}

export const RoleTag = ({
  role,
  onRemove,
  isRemoving = false
}: RoleTagProps) => {
  return (
    <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
      <span>{role.roleName}</span>
      {onRemove && (
        <button
          onClick={() => onRemove(role.roleId)}
          disabled={isRemoving}
          className="ml-2 hover:text-blue-900 disabled:opacity-50"
          title={role.description}
        >
          ✕
        </button>
      )}
    </div>
  );
};
