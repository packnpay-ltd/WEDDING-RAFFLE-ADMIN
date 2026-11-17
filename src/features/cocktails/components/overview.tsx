import Link from "next/link";
import { adminApi } from "@/lib/admin-api";
export async function CocktailOverview() {
  const counts: { total: number; pending: number; delivered: number } =
    await adminApi("/admin/cocktail-counts");
  return (
    <section className="section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Coca-Cola cocktail bar</p>
          <h2>At the bar.</h2>
        </div>
        <Link href="/cocktail-orders">Manage orders →</Link>
      </div>
      <div className="stats">
        {[
          [counts.total, "Incoming orders"],
          [counts.pending, "Pending orders"],
          [counts.delivered, "Delivered orders"],
        ].map(([count, label]) => (
          <div className="stat" key={label}>
            <span className="eyebrow">{label}</span>
            <span className="number">{count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
