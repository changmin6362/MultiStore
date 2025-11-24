interface UserStatsProps {
  filteredCount: number;
  totalCount: number;
}

export const UserStats = ({ filteredCount, totalCount }: UserStatsProps) => {
  return (
    <div className="mb-4 text-sm text-gray-600">
      총 {filteredCount}명 / {totalCount}명
    </div>
  );
};
