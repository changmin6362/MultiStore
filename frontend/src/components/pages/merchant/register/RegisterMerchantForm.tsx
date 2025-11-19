"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { DataSectionList } from "./internal/DataSectionList";
import type { MerchantRegisterData } from "./types";
import { validateMerchantData } from "./utils/validationUtils";

export const RegisterMerchantForm = () => {
  const emptyData: MerchantRegisterData = {
    businessRegistrationNumber: "",
    telecomSalesNumber: "",
    businessName: "",
    businessAddress: "",
    postalCode: "",
    customerServicePhone: "",
    emailAddress: "",
    representativeName: ""
  };

  const [userData, setUserData] = useState<MerchantRegisterData>(emptyData);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleUserDataChange = (updatedData: MerchantRegisterData) => {
    setUserData(updatedData);

    // 실시간 검증
    const errors = validateMerchantData(updatedData);
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

      const response = await fetch("/api/merchant/register", {
        method: "PUT",
        body: formData
      });

      if (!response.ok) {
        throw new Error("판매자 등록 실패");
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
        label="판매자 등록하기"
        state="Submit"
        buttonType="Primary"
        href="/store/register"
        onClick={handleSubmit}
        disabled={isLoading || Object.keys(validationErrors).length > 0}
      />
    </div>
  );
};
