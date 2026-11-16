import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import type { DashboardData } from "./types";

// Deduplicate the layout/page read within a request, never across sessions.
export const getAdminData = cache(async (): Promise<DashboardData> => {
  const token = (await cookies()).get("raffle_admin")?.value;
  if (!token) redirect("/login");
  try {
    return await api("/admin", undefined, token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    throw error;
  }
});
