import "server-only";
import { redirect } from "next/navigation";
import { adminApi } from "@/lib/admin-api";
import { ApiError } from "@/lib/api";
import type { Cocktail, CocktailOrder } from "./types";
async function read(path: string) {
  try {
    return await adminApi(path);
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) redirect("/login");
    throw e;
  }
}
export async function getCatalogue(): Promise<{
  cocktails: Cocktail[];
}> {
  return read("/admin/cocktails");
}
export async function getOrders(): Promise<CocktailOrder[]> {
  return read("/admin/cocktail-orders");
}
