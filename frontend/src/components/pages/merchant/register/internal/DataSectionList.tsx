import { Input } from "@/components/ui/Input/Input";
import { Divider } from "@/components/ui/Divider/Divider";
import type { MerchantRegisterData } from "../types";
import { getDisplayData, calculateLabelWidth } from "./utils/dataDisplayUtils";
import { getFirstError } from "../utils/errorUtils";

interface DataSectionListProps {
  data: MerchantRegisterData;
  onChange: (updatedData: MerchantRegisterData) => void;
  errors?: Record<string, string>;
}

// 판매자 등록 정보 표시 컴포넌트
export const DataSectionList = ({
  data,
  onChange,
  errors = {}
}: DataSectionListProps) => {
  const displayData = getDisplayData(data);
  const labelWidth = calculateLabelWidth(displayData);
  const fieldOrder = displayData.map((item) => item.key);
  const firstError = getFirstError(errors, fieldOrder);

  const handleInputChange = (
    key: keyof MerchantRegisterData,
    value: string
  ) => {
    onChange({
      ...data,
      [key]: value
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
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
              <Input
                value={item.value}
                onChange={(e) =>
                  handleInputChange(
                    item.key as keyof MerchantRegisterData,
                    e.target.value
                  )
                }
                hasBorder={false}
              />
            </div>
          </div>
        ))}
      </div>
      {firstError && (
        <p className="text-sm text-red-500">{firstError.message}</p>
      )}
    </div>
  );
};
