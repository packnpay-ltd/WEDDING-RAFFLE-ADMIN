import type { DashboardData } from "../types";
import { ActionForm } from "@/components/ui/action-form";
import { mutate } from "../actions/raffle.actions";
import { DrawRequest } from "./draw-request";
export function DrawSection({ data }: { data: DashboardData }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <span className="eyebrow">Live draw</span>
        <h2>Run the live draw.</h2>
      </div>
      <div className="panel-body">
        <p className="lede">
          {data.eligible} eligible tickets. Each ticket has an equal chance. A
          winner is saved before being revealed.
        </p>
        <ActionForm action={mutate} label="Start draw">
          <input type="hidden" name="kind" value="draw" />
          <DrawRequest />
          <label>
            Select prize
            <select name="prizeId" required defaultValue="">
              <option value="" disabled>
                Choose a prize
              </option>
              {data.prizes
                .filter(
                  (p) =>
                    p.published &&
                    data.draws.filter((d) => d.prize === p.id).length <
                      p.quantity,
                )
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.quantity} total
                  </option>
                ))}
            </select>
          </label>
        </ActionForm>
        {data.draws
          .filter((d) => !d.revealed)
          .map((d) => (
            <div className="saved" key={d.id}>
              <p className="mb-4">
                {d.prizeName}: winner selected and securely saved.
              </p>
              <ActionForm action={mutate} label="Reveal winner to guests">
                <input type="hidden" name="kind" value="reveal" />
                <input type="hidden" name="id" value={d.id} />
              </ActionForm>
            </div>
          ))}
      </div>
    </section>
  );
}
