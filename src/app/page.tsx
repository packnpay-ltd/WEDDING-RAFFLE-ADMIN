import { Suspense } from "react";
import { AdminPage } from "@/features/raffle";
export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="shell">
          <p>Loading the celebration…</p>
        </main>
      }
    >
      <AdminPage />
    </Suspense>
  );
}
