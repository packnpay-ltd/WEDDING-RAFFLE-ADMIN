"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Entry } from "../types";

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
export function Entries({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState(""),
    [date, setDate] = useState("");
  const rows = entries.filter(
    (e) =>
      `${e.name} ${e.email} ${e.phone} ${e.ticket}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (!date || e.created.startsWith(date)),
  );
  function download() {
    const quote = (v: string) =>
      '"' + (/^[=+@\-\t\r]/.test(v) ? "'" : "") + v.replaceAll('"', '""') + '"';
    const csv = [
      ["Ticket", "Name", "Phone", "Email", "Note", "Submitted"],
      ...rows.map((e) => [
        e.ticket,
        e.name,
        e.phone,
        e.email,
        e.note,
        e.created,
      ]),
    ]
      .map((row) => row.map(quote).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "raffle-entries.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <section className="panel" id="entries">
      <div className="panel-head row between">
        <div>
          <span className="eyebrow">Guest list</span>
          <h2>Guest entries.</h2>
        </div>
        <Button className="secondary" type="button" onClick={download}>
          Export CSV
        </Button>
      </div>
      <div className="toolbar">
        <Input
          aria-label="Search entries"
          placeholder="Search name, ticket, phone or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Input
          aria-label="Submission date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <span className="mono">{rows.length} shown</span>
      </div>
      {rows.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {["Ticket", "Guest", "Contact", "Note", "Submitted"].map(
                  (s) => (
                    <th key={s}>{s}</th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id}>
                  <td className="mono">{e.ticket}</td>
                  <td>{e.name}</td>
                  <td>
                    {e.email}
                    <small>{e.phone}</small>
                  </td>
                  <td className="note">{e.note || "—"}</td>
                  <td>{when(e.created)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty">No entries match your filters.</p>
      )}
    </section>
  );
}
