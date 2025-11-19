import { Input } from "@/components/ui/Input/Input";
import { Divider } from "@/components/ui/Divider/Divider";
import type { UserProfileData } from "../types";
import { getDisplayData, calculateLabelWidth } from "./utils/dataDisplayUtils";

interface DataSectionListProps {
  data: UserProfileData;
  onChange: (updatedData: UserProfileData) => void;
}

// 사용자 프로필 정보 표시 컴포넌트
export const DataSectionList = ({ data, onChange }: DataSectionListProps) => {
  const displayData = getDisplayData(data);
  const labelWidth = calculateLabelWidth(displayData);

  const handleInputChange = (key: keyof UserProfileData, value: string) => {
    onChange({
      ...data,
      [key]: value
    });
  };

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
                      handleInputChange("gender", e.target.value)
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
                      handleInputChange("gender", e.target.value)
                    }
                    hasBorder={false}
                  />
                  <span>여</span>
                </label>
              </div>
            ) : (
              <Input
                value={item.value}
                onChange={(e) =>
                  handleInputChange(
                    item.key as keyof UserProfileData,
                    e.target.value
                  )
                }
                hasBorder={false}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
