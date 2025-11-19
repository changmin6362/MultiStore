import type { AddressAddData } from "../types";

export interface ValidationError {
  field: keyof AddressAddData;
  message: string;
}

const FIELD_LABELS: Record<keyof AddressAddData, string> = {
  postalCode: "우편번호",
  addressDefault: "기본 주소",
  addressDetail: "상세 주소",
  recepientName: "수령인 이름",
  recepientPhone: "수령인 전화번호"
};

const VALIDATION_RULES = {
  postalCode: {
    pattern: /^\d{5}$/,
    message: "우편번호는 숫자 5자리여야 합니다"
  },
  addressDefault: {
    minLength: 10,
    message: "기본 주소는 10글자 이상이어야 합니다"
  },
  addressDetail: {
    minLength: 2,
    message: "상세 주소는 2글자 이상이어야 합니다"
  },
  recepientName: {
    minLength: 2,
    message: "수령인 이름은 2글자 이상이어야 합니다"
  },
  recepientPhone: {
    pattern: /^0\d{1,2}-?\d{3,4}-?\d{4}$/,
    message: "수령인 전화번호는 올바른 형식이어야 합니다 (예: 010-1234-5678)"
  }
};

export const validateAddressData = (
  data: AddressAddData
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

    if ("pattern" in rule && rule.pattern) {
      const pattern = rule.pattern as RegExp;
      if (!pattern.test(value)) {
        errors.push({
          field,
          message: rule.message
        });
      }
    }

    if (
      "minLength" in rule &&
      rule.minLength &&
      value.length < rule.minLength
    ) {
      errors.push({
        field,
        message: rule.message
      });
    }
  });

  return errors;
};

export const isValidAddressData = (data: AddressAddData): boolean => {
  return validateAddressData(data).length === 0;
};
