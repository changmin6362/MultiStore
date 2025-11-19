import type { AddressAddData } from "../../types";

export interface DisplayItem {
  key: keyof AddressAddData;
  label: string;
  value: string;
}

// 주소 등록 정보를 화면에 표시할 형식으로 변환
export const getDisplayData = (data: AddressAddData): DisplayItem[] => [
  {
    key: "postalCode",
    label: "우편번호:",
    value: data.postalCode
  },
  {
    key: "addressDefault",
    label: "기본 주소:",
    value: data.addressDefault
  },
  {
    key: "addressDetail",
    label: "상세 주소:",
    value: data.addressDetail
  },
  {
    key: "recepientName",
    label: "수령인 이름:",
    value: data.recepientName
  },
  {
    key: "recepientPhone",
    label: "수령인 전화번호:",
    value: data.recepientPhone
  }
];

// 라벨 내의 최대 글자 길이 계산
export const calculateLabelWidth = (displayData: DisplayItem[]): string => {
  const maxLabelLength = Math.max(
    ...displayData.map((item) => item.label.length)
  );
  return `${maxLabelLength * 0.7 + 1}em`;
};
