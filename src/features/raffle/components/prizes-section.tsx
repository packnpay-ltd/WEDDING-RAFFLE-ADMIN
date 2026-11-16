import type { DashboardData } from "../types";
import { ActionForm } from "@/components/ui/action-form";
import { Input } from "@/components/ui/input";
import { mutate } from "../actions/raffle.actions";
import Image from "next/image";
export function PrizesSection({ data }: { data: DashboardData }) {
  return (
    <div className="grid-2 section">
      {" "}
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
    </div>
  );
}
