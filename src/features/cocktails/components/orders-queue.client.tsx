"use client";
import { useState } from "react";
import { ActionForm } from "@/components/ui/action-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateOrder } from "../actions/cocktails.actions";
import { useOrderRefresh } from "../hooks/use-order-refresh";
import type { CocktailOrder, OrderStatus } from "../types";
const statuses: OrderStatus[] = [
  "NEW",
  "ACCEPTED",
  "PREPARING",
  "DELIVERED",
  "CANCELLED",
];
const next: Record<OrderStatus, OrderStatus[]> = {
  NEW: ["NEW", "ACCEPTED", "CANCELLED"],
  ACCEPTED: ["ACCEPTED", "PREPARING", "CANCELLED"],
  PREPARING: ["PREPARING", "DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};
export function OrdersQueue({ orders }: { orders: CocktailOrder[] }) {
  const [seat, setSeat] = useState(""),
    [cocktail, setCocktail] = useState(""),
    [status, setStatus] = useState("");
  const { refresh, pending } = useOrderRefresh();
  const filtered = orders.filter(
    (o) =>
      o.seat.toLowerCase().includes(seat.toLowerCase()) &&
      (!cocktail || o.cocktail_id === cocktail) &&
      (!status || o.status === status),
  );
  function download() {
    const cell = (s: string) =>
      '"' + (/^[\s]*[=+@-]/.test(s) ? "'" : "") + s.replaceAll('"', '""') + '"';
    const rows = [
      [
        "Reference",
        "Cocktail",
        "Seat",
        "Quantity",
        "Note",
        "Status",
        "Assigned staff",
        "Submitted UTC",
      ],
      ...filtered.map((o) => [
        o.reference,
        o.cocktail_name,
        o.seat,
        String(o.quantity),
        o.note,
        o.status,
        o.assigned_staff,
        o.created,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob(
        ["\ufeff" + rows.map((row) => row.map(cell).join(",")).join("\r\n")],
        { type: "text/csv;charset=utf-8" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "cocktail-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Behind the bar</p>
          <h1>Cocktail orders.</h1>
          <p>Updates every five seconds. Pauses while editing an order.</p>
        </div>
        <div className="row">
          <Button variant="outline" onClick={refresh} disabled={pending}>
            {pending ? "Refreshing…" : "Refresh"}
          </Button>
          <Button variant="outline" onClick={download}>
            Export CSV
          </Button>
        </div>
      </div>
      <div className="stats mb-7">
        {[
          [orders.filter((o) => o.status === "NEW").length, "New"],
          [
            orders.filter((o) => ["ACCEPTED", "PREPARING"].includes(o.status))
              .length,
            "In progress",
          ],
          [orders.filter((o) => o.status === "DELIVERED").length, "Delivered"],
        ].map(([n, label]) => (
          <div className="stat" key={label}>
            <span className="eyebrow">{label}</span>
            <span className="number">{n}</span>
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="panel-body">
          <div className="order-filters">
            <label>
              Seat / table
              <Input
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                placeholder="Find a seat"
              />
            </label>
            <label>
              Cocktail
              <select
                value={cocktail}
                onChange={(e) => setCocktail(e.target.value)}
              >
                <option value="">All cocktails</option>
                {[
                  ...new Map(
                    orders.map((o) => [o.cocktail_id, o.cocktail_name]),
                  ).entries(),
                ].map(([id, name]) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All statuses</option>
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <p className="quiet my-4">
            {filtered.length} orders · Latest first · Times in UTC
          </p>
          <div className="order-grid">
            {filtered.map((o) => (
              <article
                key={o.id}
                className={`order-card ${o.status === "NEW" ? "order-new" : ""}`}
              >
                <div className="row between">
                  <strong className="mono">{o.reference}</strong>
                  <span className="order-status">{o.status}</span>
                </div>
                <h2>
                  {o.quantity} × {o.cocktail_name}
                </h2>
                <p className="order-seat">Seat / table {o.seat}</p>
                {o.note && <p className="order-note">{o.note}</p>}
                <p className="quiet">
                  {new Date(o.created)
                    .toISOString()
                    .replace("T", " ")
                    .slice(0, 19)}{" "}
                  UTC
                </p>
                {next[o.status].length ? (
                  <div data-order-editor key={o.version}>
                    <ActionForm action={updateOrder} label="Update order">
                      <input type="hidden" name="id" value={o.id} />
                      <input type="hidden" name="version" value={o.version} />
                      <label>
                        Status
                        <select name="status" defaultValue={o.status}>
                          {next[o.status].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Assigned staff <span className="hint">(optional)</span>
                        <Input
                          name="assignedStaff"
                          defaultValue={o.assigned_staff}
                          maxLength={100}
                        />
                      </label>
                    </ActionForm>
                  </div>
                ) : (
                  <p className="quiet">
                    {o.assigned_staff
                      ? `Handled by ${o.assigned_staff}`
                      : "Order closed"}
                  </p>
                )}
              </article>
            ))}
          </div>
          {!filtered.length && (
            <p className="empty">No orders match your filters.</p>
          )}
        </div>
      </div>
    </>
  );
}
