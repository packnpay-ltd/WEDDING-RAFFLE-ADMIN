import { AdminShell } from "@/components/admin-shell";
import { getAdminData } from "../data";
export async function AdminLayout({ children }: { children: React.ReactNode }) {
  const data = await getAdminData();
  return (
    <AdminShell
      couple={data.settings.names}
      registrationOpen={!!data.settings.registrationOpen}
    >
      {children}
    </AdminShell>
  );
}
