import type { AddressAddData } from "../types";

// 첫 번째 에러만 반환
export const getFirstError = (
  errors: Record<string, string>,
  displayOrder: Array<keyof AddressAddData>
): { field: keyof AddressAddData; message: string } | null => {
  for (const field of displayOrder) {
    if (errors[field as string]) {
      return {
        field,
        message: errors[field as string]
      };
    }
  }
  return null;
};
