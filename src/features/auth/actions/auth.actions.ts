"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { FormState } from "@/components/ui/action-form";
export async function login(_: FormState, data: FormData): Promise<FormState> {
  try {
    const result = await api("/auth/login", {
      email: data.get("email"),
      password: data.get("password"),
    });
    return {
      ok: true,
      message: "A verification code has been sent to your email.",
      challengeId: result.challengeId,
    };
  } catch (e) {
    return { message: (e as Error).message };
  }
}
export async function verify(_: FormState, data: FormData): Promise<FormState> {
  try {
    const result = await api("/auth/verify", {
      challengeId: data.get("challengeId"),
      code: data.get("code"),
    });
    (await cookies()).set("raffle_admin", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: result.expiresIn,
    });
    revalidatePath("/", "layout");
  } catch (e) {
    return { message: (e as Error).message };
  }
  redirect("/");
}
export async function logout() {
  const jar = await cookies(),
    token = jar.get("raffle_admin")?.value;
  try {
    await api("/auth/logout", {}, token);
  } catch {
    // Local sign-out remains available if the backend session already expired.
  } finally {
    jar.delete("raffle_admin");
    revalidatePath("/", "layout");
  }
  redirect("/login");
}
