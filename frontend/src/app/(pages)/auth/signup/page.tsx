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
    <div className="flex flex-col items-center justify-center gap-6 px-10 pt-12 md:px-30 lg:px-60">
      <SignupForm handleSignup={handleSignup} />
      <div className="flex w-full justify-center gap-4">
        <p>아이디 찾기</p> <p>비밀번호 찾기</p>{" "}
        <Link href="/auth/signin">
          <p>로그인</p>
        </Link>
      </div>
    </div>
  );
}
