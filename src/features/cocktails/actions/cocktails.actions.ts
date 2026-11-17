"use server";
import { revalidatePath } from "next/cache";
import { adminApi } from "@/lib/admin-api";
import type { FormState } from "@/components/ui/action-form";
export async function saveCocktail(
  _: FormState,
  data: FormData,
): Promise<FormState> {
  try {
    const id = String(data.get("id") || "");
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
    const ingredients = data
      .getAll("ingredientKey")
      .map((key) => ({
        name: String(data.get(`ingredientName-${key}`) || ""),
        quantity: String(data.get(`ingredientQuantity-${key}`) || ""),
        productUrl: String(data.get(`ingredientUrl-${key}`) || ""),
        linkVerified: data.get(`ingredientVerified-${key}`) === "on",
      }));
    await adminApi(
      "/admin/cocktails" + (id ? "/" + encodeURIComponent(id) : ""),
      {
        name: data.get("name"),
        description: data.get("description"),
        image,
        ingredients,
        preparation: data.get("preparation"),
        allergens: data.get("allergens"),
        available: data.get("available") === "on",
        published: data.get("published") === "on",
        maxQuantity: Number(data.get("maxQuantity")),
      },
    );
    revalidatePath("/cocktails");
    revalidatePath("/cocktail-orders");
    return { ok: true, message: id ? "Cocktail updated." : "Cocktail added." };
  } catch (e) {
    return { message: (e as Error).message };
  }
}
export async function setAvailability(
  _: FormState,
  data: FormData,
): Promise<FormState> {
  try {
    await adminApi(
      `/admin/cocktails/${encodeURIComponent(String(data.get("id")))}/availability`,
      { available: data.get("available") === "true" },
    );
    revalidatePath("/cocktails");
    return { ok: true, message: "Availability updated." };
  } catch (e) {
    return { message: (e as Error).message };
  }
}
export async function updateOrder(
  _: FormState,
  data: FormData,
): Promise<FormState> {
  try {
    await adminApi(
      `/admin/cocktail-orders/${encodeURIComponent(String(data.get("id")))}`,
      {
        status: data.get("status"),
        assignedStaff: String(data.get("assignedStaff") || ""),
        version: Number(data.get("version")),
      },
    );
    revalidatePath("/cocktail-orders");
    revalidatePath("/");
    return { ok: true, message: "Order updated." };
  } catch (e) {
    return { message: (e as Error).message };
  }
}
