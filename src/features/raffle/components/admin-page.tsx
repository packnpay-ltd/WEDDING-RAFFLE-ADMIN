import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { Login, logout } from "@/features/auth";
import { Dashboard, type AdminSection } from "./dashboard";
import { Button } from "@/components/ui/button";
export async function AdminPage({
  section = "overview",
}: {
  section?: AdminSection;
}) {
  const token = (await cookies()).get("raffle_admin")?.value;
  if (!token) return <Login />;
  let data, error;
  try {
    data = await api("/admin", undefined, token);
  } catch (e) {
    error = (e as Error).message;
  }
  if (error)
    return (
      <main className="gate">
        <div className="panel">
          <h2>Unable to load the desk</h2>
          <p className="my-5">{error}</p>
          <form action={logout}>
            <Button type="submit">Return to sign-in</Button>
          </form>
        </div>
      </main>
    );
  return <Dashboard data={data} section={section} />;
}
