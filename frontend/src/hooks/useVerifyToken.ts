import { cookies } from "next/headers";

/**
 * 서버 컴포넌트에서 Access Token을 검증하는 함수
 * HttpOnly 쿠키에서 토큰을 읽어 백엔드에서 검증
 * @returns {Promise<boolean>} 토큰 검증 성공 여부
 */
export async function verifyToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    console.log(
      "[verifyToken] Access token from cookie:",
      accessToken ? "exist" : "not exist"
    );

    if (!accessToken) {
      console.log("[verifyToken] No access token found");
      return false;
    }

    // 백엔드에 직접 요청 (Authorization 헤더로 토큰 전달)
    const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

    console.log("[verifyToken] Sending verify request to", BACKEND_URL);
    const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log("[verifyToken] Response status:", response.status);
    return response.ok;
  } catch (error) {
    console.error("[verifyToken] Token verification failed:", error);
    return false;
  }
}
