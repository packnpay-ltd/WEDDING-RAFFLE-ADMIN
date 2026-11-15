import Image from "next/image";
import { randomUUID } from "node:crypto";
import { ActionForm } from "@/components/ui/action-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logout } from "@/features/auth";
import { mutate } from "../actions/raffle.actions";
import { Entries } from "./entries.client";
import type { DashboardData } from "../types";
export function Dashboard({ data }: { data: DashboardData }) {
  return (
    <main className="shell">
      <header className="flex justify-between items-center border-b pb-5">
        <span className="eyebrow">The wedding celebration · Admin</span>
        <form action={logout}>
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </header>
      <section className="py-10">
        <p className="eyebrow mb-3">A day to remember</p>
        <h1 className="text-5xl!">The celebration, at a glance.</h1>
        <div className="grid grid-cols-3 gap-3 mt-7">
          {[
            [data.entries.length, "Guest entries"],
            [data.eligible, "Eligible tickets"],
            [data.draws.length, "Prizes awarded"],
          ].map(([n, label]) => (
            <div className="panel" key={label}>
              <p className="text-3xl mb-2">{n}</p>
              <p className="text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <Entries entries={data.entries} />
      <div className="grid gap-6 md:grid-cols-2 my-6">
        <section className="panel">
          <h2 className="mb-5">Run the live draw</h2>
          <p className="text-sm mb-5">
            {data.eligible} eligible tickets. Each ticket has an equal chance. A
            winner is saved before being revealed.
          </p>
          <ActionForm action={mutate} label="Start draw">
            <input type="hidden" name="kind" value="draw" />
            <input type="hidden" name="request" value={randomUUID()} />
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
              <div className="mt-6 rounded-xl bg-[#f8f0dd] p-5" key={d.id}>
                <p className="mb-4">
                  {d.prizeName}: winner selected and securely saved.
                </p>
                <ActionForm action={mutate} label="Reveal winner to guests">
                  <input type="hidden" name="kind" value="reveal" />
                  <input type="hidden" name="id" value={d.id} />
                </ActionForm>
              </div>
            ))}
        </section>
        <section className="panel">
          <h2 className="mb-5">Add a prize</h2>
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
              <span className="text-xs font-normal">
                PNG, JPEG or WebP, up to 700 KB
              </span>
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
            <label>
              <input type="checkbox" name="published" defaultChecked /> Publish
              for draw
            </label>
          </ActionForm>
        </section>
      </div>
      <section className="panel mb-6">
        <h2 className="mb-5">Prizes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.prizes.map((p) => (
            <details className="border rounded-lg p-4" key={p.id}>
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
                  className="my-4 rounded-lg object-contain"
                />
              )}
              <p className="my-3 text-sm">
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
                <label>
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
      <section className="panel mb-6">
        <h2 className="mb-5">Winners & collection</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {data.draws
            .filter((d) => d.revealed)
            .map((d) => (
              <div className="border rounded-xl p-5" key={d.id}>
                <p className="eyebrow">{d.prizeName}</p>
                <h3 className="text-2xl mt-3">{d.name}</h3>
                <p className="mb-4">R-{String(d.entryId).padStart(4, "0")}</p>
                {d.collected ? (
                  <p>✓ Prize collected</p>
                ) : (
                  <ActionForm action={mutate} label="Confirm collection">
                    <input type="hidden" name="kind" value="collect" />
                    <input type="hidden" name="id" value={d.id} />
                  </ActionForm>
                )}
                <p className="text-xs mt-4">{d.created} UTC</p>
              </div>
            ))}
        </div>
        {!data.draws.length && <p>No draws yet.</p>}
      </section>
      <section className="panel mb-6">
        <h2 className="mb-5">Wedding & raffle settings</h2>
        <ActionForm action={mutate}>
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
          <label>
            <input
              type="checkbox"
              name="registrationOpen"
              defaultChecked={!!data.settings.registrationOpen}
            />{" "}
            Registration open
          </label>
          <label>
            <input
              type="checkbox"
              name="excludeWinners"
              defaultChecked={!!data.settings.excludeWinners}
            />{" "}
            Exclude previous winners from future draws
          </label>
        </ActionForm>
      </section>
      <details className="panel">
        <summary>Administrative audit history</summary>
        <ul className="mt-4 text-sm space-y-3">
          {data.audit.map((a) => (
            <li key={a.id}>
              {a.created} UTC · {a.action} · {a.subject}
            </li>
          ))}
        </ul>
      </details>
    </main>
  );
}
