"use client";

import { SigninForm } from "@/components/forms/SigninForm/SigninForm";

export default function Signin() {
  const handleSignin = (data: { email: string; password: string }) => {
    // TODO: 백엔드에 로그인 요청
    console.log("Sign in:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-10 pt-12 md:px-30 lg:px-60">
      <SigninForm onSignin={handleSignin} />
      <div className="flex w-full justify-center gap-4">
        <p>아이디 찾기</p> <p>비밀번호 찾기</p> <p>회원가입</p>
      </div>
    </div>
  );
}
