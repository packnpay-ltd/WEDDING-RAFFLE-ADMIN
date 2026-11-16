import type { DashboardData } from "../types";
import { Entries } from "./entries.client";
export function EntriesSection({ data }: { data: DashboardData }) {
  return (
    <div className="section">
      <Entries entries={data.entries} />
    </div>
  );
}
