import { Suspense } from "react";
import { AdminPage } from "@/features/raffle";
export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="gate">
          <p className="mono">Opening the desk…</p>
        </main>
      }
    >
      <AdminPage section="entries" />
    </Suspense>
  );
}
