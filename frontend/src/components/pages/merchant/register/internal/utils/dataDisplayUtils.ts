import type { MerchantRegisterData } from "../../types";

export interface DisplayItem {
  key: keyof MerchantRegisterData;
  label: string;
  value: string;
}

// 판매자 등록 정보를 화면에 표시할 형식으로 변환
export const getDisplayData = (data: MerchantRegisterData): DisplayItem[] => [
  {
    key: "businessRegistrationNumber",
    label: "사업자 등록번호:",
    value: data.businessRegistrationNumber
  },
  {
    key: "telecomSalesNumber",
    label: "통신판매업 신고번호:",
    value: data.telecomSalesNumber
  },
  { key: "businessName", label: "상호명:", value: data.businessName },
  {
    key: "businessAddress",
    label: "사업장 주소:",
    value: data.businessAddress
  },
  { key: "postalCode", label: "우편번호:", value: data.postalCode },
  {
    key: "customerServicePhone",
    label: "고객센터 전화번호:",
    value: data.customerServicePhone
  },
  { key: "emailAddress", label: "이메일 주소:", value: data.emailAddress },
  {
    key: "representativeName",
    label: "대표자명:",
    value: data.representativeName
  }
];

// 라벨 내의 최대 글자 길이 계산
export const calculateLabelWidth = (displayData: DisplayItem[]): string => {
  const maxLabelLength = Math.max(
    ...displayData.map((item) => item.label.length)
  );
  return `${maxLabelLength * 0.7 + 1}em`;
};
