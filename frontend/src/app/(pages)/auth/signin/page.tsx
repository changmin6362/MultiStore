"use client";

import { SigninForm } from "@/components/forms/SigninForm/SigninForm";

export default function Signin() {
  const handleSignin = (data: { email: string; password: string }) => {
    // TODO: 백엔드에 로그인 요청
    console.log("Sign in:", data);
  };

  return (
    <div className="flex flex-col px-10 pt-6">
      <SigninForm onSignin={handleSignin} errorMessage="" />
    </div>
  );
}
