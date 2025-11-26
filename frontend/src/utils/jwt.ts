/**
 * JWT 토큰을 decode하여 userId를 추출하는 유틸 함수
 * AuthService에서 JWT의 subject로 userId를 저장하므로 이를 추출합니다
 */
export const decodeJwtUserId = (token: string): string | null => {
  try {
    console.log("[decodeJwtUserId] Token received, length:", token.length);

    // JWT 포맷: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error(
        "[decodeJwtUserId] Invalid JWT format, parts:",
        parts.length
      );
      return null;
    }

    // Base64 디코딩 (payload는 두 번째 부분)
    const payload = parts[1];
    console.log("[decodeJwtUserId] Payload part length:", payload.length);

    let decoded: string;

    // 서버 환경 (Node.js)과 클라이언트 환경(브라우저) 구분
    if (typeof window === "undefined") {
      // 서버 환경: Buffer 사용
      console.log("[decodeJwtUserId] Using server-side decoding (Buffer)");
      decoded = Buffer.from(payload, "base64").toString("utf-8");
    } else {
      // 클라이언트 환경: atob 사용
      console.log("[decodeJwtUserId] Using client-side decoding (atob)");
      const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
      decoded = atob(padded);
    }

    const claims = JSON.parse(decoded);

    // subject에 userId가 저장되어 있음
    const userId = claims.sub;
    console.log("[decodeJwtUserId] Extracted userId:", userId);
    return userId || null;
  } catch (err) {
    console.error("[decodeJwtUserId] Error decoding JWT:", err);
    console.error("[decodeJwtUserId] Token info:", {
      tokenLength: token?.length,
      tokenStart: token?.substring(0, 50)
    });
    return null;
  }
};

/**
 * 클라이언트 쿠키에서 accessToken을 가져오는 함수
 * (비HttpOnly 쿠키는 클라이언트에서 직접 접근, HttpOnly는 불가능)
 * 실제로는 HttpOnly 쿠키이므로 이 방법은 작동하지 않음
 * 대신 서버 라우트를 통해 처리해야 함
 */
export const getAccessTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  try {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      if (
        cookie.startsWith("access_token=") ||
        cookie.startsWith("accessToken=")
      ) {
        return cookie.substring(cookie.indexOf("=") + 1);
      }
    }
    return null;
  } catch {
    return null;
  }
};
