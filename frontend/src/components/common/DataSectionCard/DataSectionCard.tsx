import { Fragment } from "react";
import { Divider } from "@/components/ui/Divider/Divider";

type DataPair = { label: string; value: string };
type StringSection = string[];
type PairSection = DataPair[];

type DataSection = StringSection | PairSection;

interface DataSectionCardProps {
  data: DataSection[];
}

export const DataSectionCard = ({ data }: DataSectionCardProps) => {
  return (
    <div className="justify-first flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-2">
        <div className="rounded-lg border border-gray-400 text-gray-400">
          {data.map((section, sectionIndex) => (
            <Fragment key={sectionIndex}>
              {/* 2개 이상의 섹션 사이에만 Divider 추가 */}
              {sectionIndex > 0 && <Divider />}

              {/* 섹션 렌더링 로직 */}
              {Array.isArray(section) && typeof section[0] === "string" ? (
                // Case 1: 세로 나열
                <div className="flex w-full flex-col gap-4 px-4 py-1.5">
                  {(section as StringSection).map((item, itemIndex) => (
                    <p key={itemIndex} className="truncate">
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                // Case 2: 가로 나열
                <div className="flex w-full gap-4 px-4 py-1.5">
                  {(section as PairSection).map((item, itemIndex) => (
                    <Fragment key={itemIndex}>
                      <div className="">{item.label}</div>
                      <div className="truncate">{item.value}</div>
                    </Fragment>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
