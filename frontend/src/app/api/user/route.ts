import { NextResponse } from "next/server";
import { extractUserIdFromJwt } from "@/lib/auth/extractUserIdFromJwt";
import { fetchBackendApi } from "../.common/utils";

// GET /api/user - 현재 로그인한 사용자 정보 조회
export async function GET() {
  try {
    const { userId, error } = await extractUserIdFromJwt();
    if (!userId || error) {
      return NextResponse.json(
        { error: error || "사용자 ID를 찾을 수 없습니다" },
        { status: 401 }
      );
    }

    const result = await fetchBackendApi({
      method: "GET",
      url: `/api/user/${userId}`
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(result.data);
  } catch (e) {
    console.error("[GET /api/user] Error:", e);
    return NextResponse.json(
      { error: "사용자 조회 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

// PUT /api/user - 현재 로그인한 사용자 닉네임 수정
export async function PUT(request: Request) {
  try {
    const { userId, error } = await extractUserIdFromJwt();
    if (!userId || error) {
      return NextResponse.json(
        { error: error || "사용자 ID를 찾을 수 없습니다" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const nickName = (body?.nickName as string | undefined)?.trim();
    if (!nickName) {
      return NextResponse.json(
        { error: "nickName은 필수입니다" },
        { status: 400 }
      );
    }

    // 백엔드 PUT은 emailAddress와 nickName을 모두 요구하므로 먼저 현재 사용자 정보를 조회해서 emailAddress를 가져온다
    const current = await fetchBackendApi({
      method: "GET",
      url: `/api/user/${userId}`
    });
    if (!current.success) {
      return NextResponse.json(
        { error: current.error },
        { status: current.status }
      );
    }

    const emailAddress = current.data?.emailAddress as string | undefined;
    if (!emailAddress) {
      return NextResponse.json(
        { error: "현재 사용자 이메일을 확인할 수 없습니다" },
        { status: 500 }
      );
    }

    const updateResult = await fetchBackendApi({
      method: "PUT",
      url: `/api/user/${userId}`,
      body: { emailAddress, nickName }
    });

    if (!updateResult.success) {
      return NextResponse.json(
        { error: updateResult.error },
        { status: updateResult.status }
      );
    }

    return NextResponse.json(updateResult.data);
  } catch (e) {
    console.error("[PUT /api/user] Error:", e);
    return NextResponse.json(
      { error: "사용자 수정 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
