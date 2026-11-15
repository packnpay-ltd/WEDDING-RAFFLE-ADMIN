"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Entry } from "../types";
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
    <section className="panel">
      <div className="flex flex-wrap justify-between gap-3 mb-5">
        <h2>Guest entries</h2>
        <Button variant="outline" onClick={download}>
          Export CSV
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
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
      </div>
      <p className="text-sm mb-3">
        {rows.length} entries · Latest first · Times in UTC
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {["Ticket", "Guest", "Contact", "Note", "Submitted"].map((s) => (
                <th key={s}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id}>
                <td>{e.ticket}</td>
                <td>{e.name}</td>
                <td>
                  {e.email}
                  <br />
                  {e.phone}
                </td>
                <td className="min-w-40 whitespace-pre-wrap">
                  {e.note || "—"}
                </td>
                <td className="whitespace-nowrap">{e.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <p className="py-8 text-center">No entries match your filters.</p>
        )}
      </div>
    </section>
  );
}
