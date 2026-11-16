import type { DashboardData } from "../types";
import { ActionForm } from "@/components/ui/action-form";
import { Input } from "@/components/ui/input";
import { mutate } from "../actions/raffle.actions";
export function SettingsSection({ data }: { data: DashboardData }) {
  return (
    <section className="panel section" id="settings">
      <div className="panel-head">
        <span className="eyebrow">The evening</span>
        <h2>Wedding and raffle settings.</h2>
      </div>
      <div className="panel-body">
        <ActionForm action={mutate} label="Save settings">
          <input type="hidden" name="kind" value="settings" />
          <label>
            Couple’s names
            <Input name="names" defaultValue={data.settings.names} required />
          </label>
          <label>
            Wedding date
            <Input
              name="date"
              defaultValue={data.settings.date}
              placeholder="e.g. December 20, 2026"
            />
          </label>
          <label>
            Duplicate-entry rule
            <select
              name="duplicateRule"
              defaultValue={data.settings.duplicateRule}
            >
              <option value="either">Match email or phone (recommended)</option>
              <option value="email">Match email only</option>
              <option value="phone">Match phone only</option>
              <option value="none">Allow repeat entries</option>
            </select>
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="registrationOpen"
              defaultChecked={!!data.settings.registrationOpen}
            />{" "}
            Registration open
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="excludeWinners"
              defaultChecked={!!data.settings.excludeWinners}
            />{" "}
            Exclude previous winners from future draws
          </label>
        </ActionForm>
      </div>
    </section>
  );
}
