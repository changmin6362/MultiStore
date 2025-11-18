import type { StoreRegisterData } from "../../types";

export interface DisplayItem {
  key: keyof StoreRegisterData;
  label: string;
  value: string;
}

// 스토어 등록 정보를 화면에 표시할 형식으로 변환
export const getDisplayData = (data: StoreRegisterData): DisplayItem[] => [
  {
    key: "storeName",
    label: "스토어 명:",
    value: data.storeName
  },
  {
    key: "storeDescription",
    label: "스토어 설명:",
    value: data.storeDescription
  }
];

// 라벨 내의 최대 글자 길이 계산
export const calculateLabelWidth = (displayData: DisplayItem[]): string => {
  const maxLabelLength = Math.max(
    ...displayData.map((item) => item.label.length)
  );
  return `${maxLabelLength * 0.7 + 1}em`;
};
