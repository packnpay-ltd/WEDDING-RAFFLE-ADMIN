import { Suspense } from "react";
import { AdminLayout, AdminLayoutSkeleton } from "@/features/raffle";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AdminLayoutSkeleton />}>
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  );
}
