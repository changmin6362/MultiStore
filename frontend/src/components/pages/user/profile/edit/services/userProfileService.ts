import type { UserProfileData } from "../types";

// 공통: birthDate 정규화 (YYMMDD/YYYMMDD/ISO -> ISO or null)
const normalizeBirthDate = (v: string): string | null => {
  if (!v) return null;

  // 이미 ISO(LocalDate) 형태인 경우 그대로 사용 (YYYY-MM-DD)
  const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (isoPattern.test(v)) return v;

  // 숫자만 남겨서 8자리(YYYYMMDD)인 경우 ISO로 변환 (이전 호환)
  const onlyDigits = v.replace(/\D/g, "");
  if (onlyDigits.length === 8) {
    const y = onlyDigits.slice(0, 4);
    const m = onlyDigits.slice(4, 6);
    const d = onlyDigits.slice(6, 8);
    return `${y}-${m}-${d}`; // ISO LocalDate
  }

  // 6자리(YYMMDD)인 경우 세기 보정 후 ISO로 변환
  if (onlyDigits.length === 6) {
    const yy = parseInt(onlyDigits.slice(0, 2), 10);
    const m = onlyDigits.slice(2, 4);
    const d = onlyDigits.slice(4, 6);
    // 세기 추정 규칙: 30 이상은 1900대, 그 외는 2000대
    const century = yy >= 30 ? 1900 : 2000;
    const yyyy = (century + yy).toString();
    return `${yyyy}-${m}-${d}`;
  }

  // 그 외(자리수 부족 등)는 유효하지 않으므로 null로 전송
  return null;
};

const buildPayload = (userData: UserProfileData) => {
  const { profileImageUrl, ...dataToSend } = userData;
  return {
    ...dataToSend,
    birthDate: normalizeBirthDate(dataToSend.birthDate),
    profileImageUrl: typeof profileImageUrl === "string" ? profileImageUrl : ""
  };
};

// 사용자 프로필 생성 요청 서비스
export const createUserProfile = async (userData: UserProfileData) => {
  const payload = buildPayload(userData);
  const response = await fetch("/api/user-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("프로필 생성 실패");
  }
  return response.json();
};

// 사용자 프로필 수정 요청 서비스
export const submitUserProfile = async (userData: UserProfileData) => {
  const payload = buildPayload(userData);
  const response = await fetch("/api/user-profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  // PUT 실패 시(예: 404)에도 자동으로 POST로 전환하지 않음 —
  // 존재 여부 판단은 사전 GET(프론트 훅)에서 처리되어, 신규 생성은 POST 경로에서만 수행
  if (!response.ok) throw new Error("프로필 수정 실패");

  return response.json();
};

// 사용자 프로필 조회 서비스 (편의용)
export const fetchUserProfile = async () => {
  const res = await fetch("/api/user-profile", { method: "GET" });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("프로필 조회 실패");
  }
  return res.json();
};

// 사용자 프로필 삭제 서비스
export const deleteUserProfile = async () => {
  const response = await fetch("/api/user-profile", { method: "DELETE" });
  if (!response.ok) {
    throw new Error("프로필 삭제 실패");
  }
  return response.json();
};
