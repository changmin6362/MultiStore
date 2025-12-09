import { NextResponse } from "next/server";
import { extractUserIdFromJwt } from "@/lib/auth/extractUserIdFromJwt";
import { fetchBackendApi } from "../.common/utils";

/**
 * GET /api/user-profile - 사용자 프로필 조회
 */
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
      url: `/api/user-profile?userId=${userId}`
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    // 백엔드 ApiResponse가 data=null일 때 @JsonUnwrapped로 인해 {}가 올 수 있으므로
    // 프로필 미존재로 간주하고 404를 반환하여 프론트가 POST 흐름을 타도록 한다.
    const data = result.data as unknown;
    const isEmptyObject =
      data &&
      typeof data === "object" &&
      Object.keys(data as object).length === 0;
    if (data == null || isEmptyObject) {
      return NextResponse.json({ error: "프로필이 없습니다" }, { status: 404 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("[GET /api/user-profile] Error:", error);
    return NextResponse.json(
      { error: "프로필 조회 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user-profile - 사용자 프로필 생성
 */
export async function POST(request: Request) {
  try {
    const { userId, error } = await extractUserIdFromJwt();

    if (!userId || error) {
      return NextResponse.json(
        { error: error || "사용자 ID를 찾을 수 없습니다" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const result = await fetchBackendApi({
      method: "POST",
      url: `/api/user-profile?userId=${userId}`,
      body
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("[POST /api/user-profile] Error:", error);
    return NextResponse.json(
      { error: "프로필 생성 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user-profile - 사용자 프로필 수정
 */
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

    const result = await fetchBackendApi({
      method: "PUT",
      url: `/api/user-profile?userId=${userId}`,
      body
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("[PUT /api/user-profile] Error:", error);
    return NextResponse.json(
      { error: "프로필 수정 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user-profile - 사용자 프로필 삭제
 */
export async function DELETE() {
  try {
    const { userId, error } = await extractUserIdFromJwt();

    if (!userId || error) {
      return NextResponse.json(
        { error: error || "사용자 ID를 찾을 수 없습니다" },
        { status: 401 }
      );
    }

    const result = await fetchBackendApi({
      method: "DELETE",
      url: `/api/user-profile?userId=${userId}`
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("[DELETE /api/user-profile] Error:", error);
    return NextResponse.json(
      { error: "프로필 삭제 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
