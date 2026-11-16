import type { DashboardData } from "../types";
import { ActionForm } from "@/components/ui/action-form";
import { mutate } from "../actions/raffle.actions";
function when(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return (
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(date) + " UTC"
  );
}
export function WinnersSection({ data }: { data: DashboardData }) {
  return (
    <section className="panel section" id="winners">
      <div className="panel-head">
        <span className="eyebrow">Collection</span>
        <h2>Winners and collection.</h2>
      </div>
      <div className="panel-body">
        <div className="winner-grid">
          {data.draws
            .filter((d) => d.revealed)
            .map((d) => (
              <div className="winner" key={d.id}>
                <p className="eyebrow">{d.prizeName}</p>
                <h3>{d.name}</h3>
                <p className="mono">R-{String(d.entryId).padStart(4, "0")}</p>
                {d.collected ? (
                  <p>✓ Prize collected</p>
                ) : (
                  <ActionForm action={mutate} label="Confirm collection">
                    <input type="hidden" name="kind" value="collect" />
                    <input type="hidden" name="id" value={d.id} />
                  </ActionForm>
                )}
                <p className="quiet">{when(d.created)}</p>
              </div>
            ))}
        </div>
        {!data.draws.length && <p className="empty">No draws yet.</p>}
      </div>
    </section>
  );
}
