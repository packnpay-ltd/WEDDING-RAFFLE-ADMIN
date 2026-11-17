"use client";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
export function useOrderRefresh() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    const refresh = () => {
      if (
        document.visibilityState === "visible" &&
        !document.querySelector("[data-order-editor]:focus-within")
      )
        router.refresh();
    };
    const timer = setInterval(refresh, 5000);
    window.addEventListener("focus", refresh);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [router]);
  return { pending, refresh: () => startTransition(() => router.refresh()) };
}
