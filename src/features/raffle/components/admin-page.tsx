import { getAdminData } from "../data";
import type { AdminSection } from "../types";
import { OverviewSection } from "./overview-section";
import { EntriesSection } from "./entries-section";
import { DrawSection } from "./draw-section";
import { PrizesSection } from "./prizes-section";
import { WinnersSection } from "./winners-section";
import { SettingsSection } from "./settings-section";
import { AuditSection } from "./audit-section";
const sections = {
  overview: OverviewSection,
  entries: EntriesSection,
  draw: DrawSection,
  prizes: PrizesSection,
  winners: WinnersSection,
  settings: SettingsSection,
  audit: AuditSection,
};
export async function AdminPage({
  section = "overview",
}: {
  section?: AdminSection;
}) {
  const Section = sections[section];
  return <Section data={await getAdminData()} />;
}
