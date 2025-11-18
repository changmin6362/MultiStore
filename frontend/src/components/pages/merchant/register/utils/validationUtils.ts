import type { MerchantRegisterData } from "../types";

export interface ValidationError {
  field: keyof MerchantRegisterData;
  message: string;
}

const FIELD_LABELS: Record<keyof MerchantRegisterData, string> = {
  businessRegistrationNumber: "사업자 등록번호",
  telecomSalesNumber: "통신판매업 신고번호",
  businessName: "상호명",
  businessAddress: "사업장 주소",
  postalCode: "우편번호",
  customerServicePhone: "고객센터 전화번호",
  emailAddress: "이메일 주소",
  representativeName: "대표자명"
};

const VALIDATION_RULES = {
  businessRegistrationNumber: {
    pattern: /^\d{3}-\d{2}-\d{5}$/,
    message: "사업자 등록번호는 000-00-00000 형식이어야 합니다"
  },
  telecomSalesNumber: {
    pattern: /^[\w가-힣\s]+ \d{4}-\d{4}$/,
    message:
      "통신판매업 신고번호는 '지역명 연도-일련번호' 형식이어야 합니다 (예: 서울특별시 2023-0001)"
  },
  businessName: {
    minLength: 2,
    message: "상호명은 2글자 이상이어야 합니다"
  },
  businessAddress: {
    minLength: 5,
    message: "사업장 주소는 5글자 이상이어야 합니다"
  },
  postalCode: {
    pattern: /^\d{5}$/,
    message: "우편번호는 5자리 숫자여야 합니다"
  },
  customerServicePhone: {
    pattern: /^0\d{1,2}-\d{3,4}-\d{4}$/,
    message:
      "고객센터 전화번호는 '0XX-XXX-XXXX' 또는 '0XX-XXXX-XXXX' 형식이어야 합니다 (예: 02-1234-5678, 010-1234-5678)"
  },
  emailAddress: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "이메일 형식이 올바르지 않습니다"
  },
  representativeName: {
    minLength: 2,
    message: "대표자명은 2글자 이상이어야 합니다"
  }
};

export const validateMerchantData = (
  data: MerchantRegisterData
): ValidationError[] => {
  const errors: ValidationError[] = [];

  (
    Object.keys(VALIDATION_RULES) as Array<keyof typeof VALIDATION_RULES>
  ).forEach((field) => {
    const value = data[field] as string;
    const rule = VALIDATION_RULES[field];
    const fieldLabel = FIELD_LABELS[field];

    if (!value || value.trim() === "") {
      errors.push({
        field,
        message: `${fieldLabel}은 필수 입력 항목입니다`
      });
      return;
    }

    if ("pattern" in rule && !rule.pattern.test(value)) {
      errors.push({
        field,
        message: rule.message
      });
    }

    if ("minLength" in rule && value.length < rule.minLength) {
      errors.push({
        field,
        message: rule.message
      });
    }
  });

  return errors;
};

export const isValidMerchantData = (data: MerchantRegisterData): boolean => {
  return validateMerchantData(data).length === 0;
};
