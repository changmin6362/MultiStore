"use client";

import Link from "next/link";
import { SignupForm } from "@/components/forms/SignupForm/SignupForm";

export default function Signup() {
  return (
    <>
      <SignupForm />
      <div className="flex w-full justify-center gap-4">
        <p>아이디 찾기</p> <p>비밀번호 찾기</p>{" "}
        <Link href="/auth/signin">
          <p>로그인</p>
        </Link>
      </div>
    </>
  );
}
