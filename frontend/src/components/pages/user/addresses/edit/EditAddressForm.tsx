"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { DataSectionList } from "./internal/DataSectionList";
import type { AddressAddData } from "./types";
import { validateAddressData } from "./utils/validationUtils";

export const EditAddressForm = () => {
  const emptyData: AddressAddData = {
    postalCode: "07554",
    addressDefault: "강서구 공항대로 61길 60",
    addressDetail: "101동 1001호",
    recepientName: "김창민",
    recepientPhone: "010-1234-1234"
  };

  const [userData, setUserData] = useState<AddressAddData>(emptyData);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleUserDataChange = (updatedData: AddressAddData) => {
    setUserData(updatedData);

    // 실시간 검증
    const errors = validateAddressData(updatedData);
    const errorMap = errors.reduce(
      (acc, error) => {
        acc[error.field] = error.message;
        return acc;
      },
      {} as Record<string, string>
    );
    setValidationErrors(errorMap);
  };

  const handleSubmit = async () => {
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(userData));

      const response = await fetch("/api/store/register", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("스토어 등록 실패");
      }

      window.location.href = "/user/profile";
    } catch (error) {
      console.error("에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 px-1.5 py-2">
      <div className="justify-first flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col gap-2">
          <DataSectionList
            data={userData}
            onChange={handleUserDataChange}
            errors={validationErrors}
          />
        </div>
      </div>

      <Button
        label="주소 수정하기"
        state="Submit"
        buttonType="Primary"
        href="/user/addresses"
        onClick={handleSubmit}
        disabled={isLoading || Object.keys(validationErrors).length > 0}
      />
    </div>
  );
};
