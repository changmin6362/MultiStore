import { NextResponse } from "next/server";
import { fetchBackendApi } from "../../.common/utils";

type BackendApiResponse<T> = {
  success: boolean;
  status?: number;
  message?: string;
  data?: T;
};

// GET /api/user/[userId] - 단일 사용자 조회 (백엔드 경로와 일치)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    if (!userId || !/^\d+$/.test(userId)) {
      return NextResponse.json(
        { error: "유효한 userId(숫자) 가 필요합니다" },
        { status: 400 }
      );
    }
    // 진단 로그 (개발 중 문제 파악용)
    console.debug(`[GET /api/user/${userId}] proxying to backend`);
    const result = await fetchBackendApi<BackendApiResponse<unknown>>({
      method: "GET",
      url: `/api/user/${userId}`
    });

    if (!result.success) {
      return NextResponse.json(result.error, { status: result.status });
    }

    // 백엔드 ApiResponse를 변형 없이 그대로 반환
    return NextResponse.json(result.data);
  } catch (e) {
    console.error("[GET /api/user/[userId]] Error:", e);
    return NextResponse.json(
      { error: "사용자 조회 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

// PUT /api/user/[userId] - 단일 사용자 수정 (emailAddress, nickName)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const emailAddress = (body?.emailAddress as string | undefined)?.trim();
    const nickName = (body?.nickName as string | undefined)?.trim();

    if (!emailAddress || !nickName) {
      return NextResponse.json(
        { error: "emailAddress와 nickName은 필수입니다" },
        { status: 400 }
      );
    }

    const result = await fetchBackendApi<BackendApiResponse<unknown>>({
      method: "PUT",
      url: `/api/user/${userId}`,
      body: { emailAddress, nickName }
    });

    if (!result.success) {
      return NextResponse.json(result.error, { status: result.status });
    }

    // 백엔드 ApiResponse를 변형 없이 그대로 반환
    return NextResponse.json(result.data);
  } catch (e) {
    console.error("[PUT /api/user/[userId]] Error:", e);
    return NextResponse.json(
      { error: "사용자 수정 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
