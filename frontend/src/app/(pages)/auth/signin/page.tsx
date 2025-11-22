"use client";

import Link from "next/link";
import { SigninForm } from "@/components/forms/SigninForm/SigninForm";

export default function Signin() {
  return (
    <>
      <SigninForm />
      <div className="flex w-full justify-center gap-4">
        <p>아이디 찾기</p> <p>비밀번호 찾기</p>{" "}
        <Link href="/auth/signup">
          <p>회원가입</p>
        </Link>
      </div>
    </>
  );
}
