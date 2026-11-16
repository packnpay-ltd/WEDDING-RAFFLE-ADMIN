import type { DashboardData } from "../types";
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
export function AuditSection({ data }: { data: DashboardData }) {
  return (
    <section className="panel section" id="audit">
      <div className="panel-head">
        <span className="eyebrow">Record</span>
        <h2>Administrative audit history.</h2>
      </div>
      <ul className="audit-list">
        {data.audit.map((a) => (
          <li key={a.id}>
            {when(a.created)} · {a.action} · {a.subject}
          </li>
        ))}
        {!data.audit.length && <li>No administrative actions yet.</li>}
      </ul>
    </section>
  );
}
