import "server-only";
import { cookies } from "next/headers";
import { api, ApiError } from "./api";
export async function adminApi(path: string, body?: unknown) {
  const token = (await cookies()).get("raffle_admin")?.value;
  if (!token) throw new ApiError("Please sign in again.", 401);
  return api(path, body, token);
}
