import Image from "next/image";
import { ActionForm } from "@/components/ui/action-form";
import { DrawRequest } from "./draw-request";
import { Input } from "@/components/ui/input";
import { mutate } from "../actions/raffle.actions";
import { Entries } from "./entries.client";
import { AdminShell } from "@/components/admin-shell";
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
export function Dashboard({ data }: { data: DashboardData }) {
  return (
    <AdminShell
      couple={data.settings.names}
      registrationOpen={!!data.settings.registrationOpen}
    >
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
      <div className="section">
        <Entries entries={data.entries} />
      </div>
      <div className="grid-2 section" id="draw">
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
        <section className="panel">
          <div className="panel-head">
            <span className="eyebrow">Prize catalogue</span>
            <h2>Add a prize.</h2>
          </div>
          <div className="panel-body">
          <ActionForm action={mutate} label="Add prize">
            <input type="hidden" name="kind" value="prize" />
            <label>
              Prize name
              <Input name="name" required minLength={2} maxLength={120} />
            </label>
            <label>
              Description
              <textarea name="description" maxLength={1000} />
            </label>
            <label>
              Upload prize image
              <Input
                name="imageFile"
                type="file"
                accept="image/png,image/jpeg,image/webp"
              />
              <span className="hint">PNG, JPEG or WebP, up to 700 KB</span>
            </label>
            <label>
              Image URL
              <Input name="image" type="url" placeholder="https://…" />
            </label>
            <label>
              Quantity
              <Input
                name="quantity"
                type="number"
                min={1}
                max={1000}
                defaultValue={1}
                required
              />
            </label>
            <label className="check">
              <input type="checkbox" name="published" defaultChecked /> Publish
              for draw
            </label>
          </ActionForm>
          </div>
        </section>
      </div>
      <section className="panel section" id="prizes">
        <div className="panel-head">
          <span className="eyebrow">Catalogue</span>
          <h2>Prizes.</h2>
        </div>
        <div className="prize-list">
          {data.prizes.map((p) => (
            <details className="prize" key={p.id}>
              <summary>
                {p.name} · {p.quantity} available ·{" "}
                {p.published ? "Published" : "Withdrawn"}
              </summary>
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={240}
                  height={160}
                  unoptimized
                  className="prize-image"
                />
              )}
              <p className="lede">
                Prizes can be edited before their first draw.
              </p>
              <ActionForm action={mutate} label="Update prize">
                <input type="hidden" name="kind" value="prize" />
                <input type="hidden" name="id" value={p.id} />
                <label>
                  Name
                  <Input name="name" defaultValue={p.name} required />
                </label>
                <label>
                  Description
                  <textarea name="description" defaultValue={p.description} />
                </label>
                <label>
                  Image URL
                  <Input
                    name="image"
                    type={p.image.startsWith("data:") ? "hidden" : "url"}
                    defaultValue={p.image}
                  />
                </label>
                <label>
                  Quantity
                  <Input
                    name="quantity"
                    type="number"
                    min={1}
                    max={1000}
                    defaultValue={p.quantity}
                  />
                </label>
                <label className="check">
                  <input
                    name="published"
                    type="checkbox"
                    defaultChecked={!!p.published}
                  />{" "}
                  Published
                </label>
              </ActionForm>
            </details>
          ))}
        </div>
      </section>
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
    </AdminShell>
  );
}
