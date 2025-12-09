"use server";

import { extractUserIdFromJwt } from "./extractUserIdFromJwt";

/**
 * Server Action 래퍼
 * 클라이언트 컴포넌트에서 Server Action을 통해 호출 가능
 */
export async function extractUserIdAction() {
  return extractUserIdFromJwt();
}
