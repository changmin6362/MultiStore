interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  disabled = false
}: SearchBarProps) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="이메일, 닉네임, ID로 검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
      />
    </div>
  );
};
