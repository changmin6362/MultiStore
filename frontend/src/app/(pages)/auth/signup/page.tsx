"use client";

import Link from "next/link";
import { SignupForm } from "@/components/forms/SignupForm/SignupForm";

export default function Signup() {
  const handleSignup = (data: {
    email: string;
    nickname: string;
    password: string;
  }) => {
    // TODO: 백엔드에 로그인 요청
    console.log("Sign in:", data);
  };
  return (
    <>
      <SignupForm onSignup={handleSignup} />
      <div className="flex w-full justify-center gap-4">
        <p>아이디 찾기</p> <p>비밀번호 찾기</p>{" "}
        <Link href="/auth/signin">
          <p>로그인</p>
        </Link>
      </div>
    </>
  );
}
