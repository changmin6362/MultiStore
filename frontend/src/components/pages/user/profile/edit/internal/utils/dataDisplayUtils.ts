import type { UserProfileData } from "../../types";

export interface DisplayItem {
  key: keyof UserProfileData;
  label: string;
  value: string;
}

// 사용자 프로필 정보를 화면에 표시할 형식으로 변환
export const getDisplayData = (data: UserProfileData): DisplayItem[] => [
  { key: "nickname", label: "닉네임:", value: data.nickname },
  { key: "password", label: "비밀번호:", value: data.password },
  { key: "lastName", label: "성:", value: data.lastName },
  { key: "firstName", label: "이름:", value: data.firstName },
  { key: "phone", label: "전화번호(- 없이):", value: data.phone },
  { key: "birthDate", label: "생년월일(8자리):", value: data.birthDate },
  { key: "gender", label: "성별:", value: data.gender }
];

// 라벨 내의 최대 글자 길이 계산
export const calculateLabelWidth = (displayData: DisplayItem[]): string => {
  const maxLabelLength = Math.max(
    ...displayData.map((item) => item.label.length)
  );
  return `${maxLabelLength * 0.7 + 1}em`;
};
