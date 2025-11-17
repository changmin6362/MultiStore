import { Input } from "@/components/ui/Input/Input";
import { Divider } from "./Divider";
import type { UserProfileData } from "../types";

interface DataSectionListProps {
  data: UserProfileData;
  onChange: (updatedData: UserProfileData) => void;
}

interface DisplayItem {
  key: keyof UserProfileData;
  label: string;
  value: string;
}

export const DataSectionList = ({ data, onChange }: DataSectionListProps) => {
  const displayData: DisplayItem[] = [
    { key: "nickname", label: "닉네임:", value: data.nickname },
    { key: "password", label: "비밀번호:", value: data.password },
    { key: "lastName", label: "성:", value: data.lastName },
    { key: "firstName", label: "이름:", value: data.firstName },
    { key: "phone", label: "전화번호(- 없이):", value: data.phone },
    { key: "birthDate", label: "생년월일(8자리):", value: data.birthDate },
    { key: "gender", label: "성별:", value: data.gender }
  ];

  const handleInputChange = (key: keyof UserProfileData, value: string) => {
    onChange({
      ...data,
      [key]: value
    });
  };

  // 가장 긴 label의 길이를 구함
  const maxLabelLength = Math.max(
    ...displayData.map((item) => item.label.length)
  );
  // 한 글자당 약 0.6em, 패딩 고려
  const labelWidth = `${maxLabelLength * 0.6 + 1}em`;

  return (
    <div className="rounded-lg border border-gray-400 text-gray-400">
      {displayData.map((item, index) => (
        <div key={index}>
          {index > 0 && <Divider />}
          <div className="flex w-full gap-4 px-4 py-1.5">
            <div
              className="flex shrink-0 items-center justify-start"
              style={{ width: labelWidth }}
            >
              {item.label}
            </div>
            {item.key === "gender" ? (
              <div className="flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <Input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={data.gender === "M"}
                    onChange={(e) =>
                      handleInputChange(item.key, e.target.value)
                    }
                    hasBorder={false}
                  />
                  <span>남</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <Input
                    type="radio"
                    name="gender"
                    value="W"
                    checked={data.gender === "W"}
                    onChange={(e) =>
                      handleInputChange(item.key, e.target.value)
                    }
                    hasBorder={false}
                  />
                  <span>여</span>
                </label>
              </div>
            ) : (
              <Input
                value={item.value}
                onChange={(e) => handleInputChange(item.key, e.target.value)}
                hasBorder={false}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
