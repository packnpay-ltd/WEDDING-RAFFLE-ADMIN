"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Gift,
  LayoutDashboard,
  LogOut,
  Settings2,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import { logout } from "@/features/auth";

const links = [
  { href: "#overview", label: "Overview", icon: LayoutDashboard },
  { href: "#entries", label: "Guest entries", icon: Users },
  { href: "#draw", label: "Live draw", icon: Gift },
  { href: "#prizes", label: "Prizes", icon: Ticket },
  { href: "#winners", label: "Winners", icon: Trophy },
  { href: "#settings", label: "Settings", icon: Settings2 },
  { href: "#audit", label: "Audit history", icon: FileText },
];

export function AdminShell({
  couple,
  registrationOpen,
  children,
}: {
  couple: string;
  registrationOpen: boolean;
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState("#overview");

  useEffect(() => {
    let frame = 0;
    const pick = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nodes = links
          .map((item) => document.getElementById(item.href.slice(1)))
          .filter((node): node is HTMLElement => !!node);
        const hash = window.location.hash;
        const target = hash ? document.getElementById(hash.slice(1)) : null;
        if (target) {
          const top = target.getBoundingClientRect().top;
          if (top >= -8 && top <= 140) {
            setCurrent(hash);
            return;
          }
        }
        let chosen = nodes[0];
        for (const node of nodes) {
          if (node.getBoundingClientRect().top <= 120) chosen = node;
        }
        if (chosen) setCurrent("#" + chosen.id);
      });
    };
    pick();
    document.addEventListener("scroll", pick, { passive: true, capture: true });
    window.addEventListener("hashchange", pick);
    return () => {
      document.removeEventListener("scroll", pick, { capture: true });
      window.removeEventListener("hashchange", pick);
    };
  }, []);

  const selected = links.find((item) => item.href === current) ?? links[0];

  return (
    <div className="shell">
      <aside className="sidebar">
        <a className="wordmark" href="#overview">
          The celebration
          <small>Administration</small>
        </a>
        <span className="eyebrow">Desk</span>
        <nav className="nav" aria-label="Administration">
          {links.map((item) => {
            const Icon = item.icon;
            const active = selected.href === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
                onClick={() => setCurrent(item.href)}
              >
                <Icon size={16} />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="row">
            <div className="avatar" aria-hidden="true">
              AD
            </div>
            <div>
              <div>Event desk</div>
              <small className="mono" style={{ color: "#f6c6b7" }}>
                Authorised staff
              </small>
            </div>
          </div>
          <form action={logout}>
            <button className="text-button row" type="submit">
              <LogOut size={14} />
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span className="eyebrow">
            {couple || "The wedding celebration"}
            <span style={{ padding: "0 12px", color: "#c8a96b" }}>/</span>
            <span data-current>{selected.label}</span>
          </span>
          <div className="row">
            <span className="mono">
              <span className="status-dot" />
              {registrationOpen ? "Registration open" : "Registration closed"}
            </span>
            <form action={logout} className="top-signout">
              <button className="text-button row" type="submit">
                <LogOut size={14} />
                Sign out
              </button>
            </form>
          </div>
        </header>
        <main className="main">
          {children}
          <footer className="footer-note">
            <span>The wedding celebration · With a little help from Osusu.</span>
            <span>Event desk / Authorised staff only</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
