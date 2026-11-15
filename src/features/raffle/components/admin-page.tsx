import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { Login, logout } from "@/features/auth";
import { Dashboard } from "./dashboard";
import { Button } from "@/components/ui/button";
export async function AdminPage() {
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
      <main className="shell">
        <h2>Unable to load your dashboard</h2>
        <p className="my-5">{error}</p>
        <form action={logout}>
          <Button type="submit">Return to sign-in</Button>
        </form>
      </main>
    );
  return <Dashboard data={data} />;
}
