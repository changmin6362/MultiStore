import type { StoreRegisterData } from "../types";

export interface ValidationError {
  field: keyof StoreRegisterData;
  message: string;
}

const FIELD_LABELS: Record<keyof StoreRegisterData, string> = {
  storeName: "스토어 이름",
  storeDescription: "스토어 설명"
};

const VALIDATION_RULES = {
  storeName: {
    minLength: 2,
    message: "스토어명은 2글자 이상이어야 합니다"
  },
  storeDescription: {
    minLength: 10,
    message: "스토어 설명은 10글자 이상이어야 합니다"
  }
};

export const validateMerchantData = (
  data: StoreRegisterData
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

    if ("pattern" in rule && "pattern" in rule && rule.pattern) {
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

export const isValidStoreData = (data: StoreRegisterData): boolean => {
  return validateMerchantData(data).length === 0;
};
