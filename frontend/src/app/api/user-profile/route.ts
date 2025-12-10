import { NextResponse } from "next/server";
import { extractUserIdFromJwt } from "@/lib/auth/extractUserIdFromJwt";
import { fetchBackendApi } from "../.common/utils";
import type { UserProfileResponse } from "@/app/api/.common/types";

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

    type BackendApiResponse = { success: boolean; data: UserProfileResponse | null };

    const result = await fetchBackendApi<BackendApiResponse>({
      method: "GET",
      url: `/api/user-profile?userId=${userId}`
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    // 래퍼 언랩: 순수 프로필 반환. 없으면 404
    const profile = result.data?.data ?? null;
    if (profile == null) {
      return NextResponse.json({ error: "프로필이 없습니다" }, { status: 404 });
    }

    return NextResponse.json(profile);
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

    type BackendApiResponse = { success: boolean; data: UserProfileResponse };
    const result = await fetchBackendApi<BackendApiResponse>({
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

    // 언랩하여 순수 프로필 반환
    return NextResponse.json(result.data?.data);
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

    type BackendApiResponse = { success: boolean; data: UserProfileResponse };
    const result = await fetchBackendApi<BackendApiResponse>({
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

    // 언랩하여 순수 프로필 반환
    return NextResponse.json(result.data?.data);
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
