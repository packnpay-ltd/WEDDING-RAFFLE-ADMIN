import type { DashboardData } from "../types";
export function OverviewSection({ data }: { data: DashboardData }) {
  return (
    <section className="section" id="overview">
      <div className="page-heading">
        <div>
          <p className="eyebrow">A day to remember</p>
          <h1>The celebration, at a glance.</h1>
          <p>Guest entries, the live draw, and the prizes still to award.</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat">
          <span className="eyebrow">Guest entries</span>
          <span className="number">{data.entries.length}</span>
          <small>People on the list</small>
        </div>
        <div className="stat">
          <span className="eyebrow">Eligible tickets</span>
          <span className="number">{data.eligible}</span>
          <small>Each ticket has an equal chance</small>
        </div>
        <div className="stat">
          <span className="eyebrow">Prizes awarded</span>
          <span className="number">{data.draws.length}</span>
          <small>Saved before they are revealed</small>
        </div>
      </div>
    </section>
  );
}
