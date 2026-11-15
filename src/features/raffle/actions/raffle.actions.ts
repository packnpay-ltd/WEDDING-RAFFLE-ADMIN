"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { FormState } from "@/components/ui/action-form";
export async function mutate(_: FormState, data: FormData): Promise<FormState> {
  try {
    const token = (await cookies()).get("raffle_admin")?.value;
    if (!token) throw new Error("Please sign in again.");
    const kind = data.get("kind");
    let image = String(data.get("image") || "");
    const file = data.get("imageFile");
    if (file instanceof File && file.size) {
      if (
        file.size > 700000 ||
        !["image/png", "image/jpeg", "image/webp"].includes(file.type)
      )
        throw new Error("Use a PNG, JPEG or WebP image under 700 KB.");
      image = `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`;
    }
    let path: string, body: unknown;
    if (kind === "prize") {
      const id = data.get("id");
      path = id ? `/prizes/${encodeURIComponent(String(id))}` : "/prizes";
      body = {
        name: data.get("name"),
        description: data.get("description"),
        image,
        quantity: Number(data.get("quantity")),
        published: data.get("published") === "on",
      };
    } else if (kind === "draw") {
      path = "/draws";
      body = { prizeId: data.get("prizeId"), request: data.get("request") };
    } else if (kind === "reveal" || kind === "collect") {
      path = `/draws/${encodeURIComponent(String(data.get("id")))}/${kind}`;
      body = {};
    } else if (kind === "settings") {
      path = "/settings";
      body = {
        names: data.get("names"),
        date: data.get("date"),
        excludeWinners: data.get("excludeWinners") === "on",
        registrationOpen: data.get("registrationOpen") === "on",
        duplicateRule: data.get("duplicateRule"),
      };
    } else throw new Error("Unknown action");
    await api(path, body, token);
    revalidatePath("/");
    return {
      ok: true,
      message:
        kind === "draw"
          ? "Winner saved. Reveal when you are ready."
          : "Saved successfully.",
    };
  } catch (e) {
    return { message: (e as Error).message };
  }
}
