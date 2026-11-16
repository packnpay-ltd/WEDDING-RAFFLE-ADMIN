import { AdminShell } from "@/components/admin-shell";
import type { DashboardData } from "../types";
import { OverviewSection } from "./overview-section";
import { EntriesSection } from "./entries-section";
import { DrawSection } from "./draw-section";
import { PrizesSection } from "./prizes-section";
import { WinnersSection } from "./winners-section";
import { SettingsSection } from "./settings-section";
import { AuditSection } from "./audit-section";
export type AdminSection =
  "overview" | "entries" | "draw" | "prizes" | "winners" | "settings" | "audit";
const sections = {
  overview: OverviewSection,
  entries: EntriesSection,
  draw: DrawSection,
  prizes: PrizesSection,
  winners: WinnersSection,
  settings: SettingsSection,
  audit: AuditSection,
};
export function Dashboard({
  data,
  section,
}: {
  data: DashboardData;
  section: AdminSection;
}) {
  const Section = sections[section];
  return (
    <AdminShell
      couple={data.settings.names}
      registrationOpen={!!data.settings.registrationOpen}
    >
      <Section data={data} />
    </AdminShell>
  );
}
