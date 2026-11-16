"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/entries", label: "Guest entries", icon: Users },
  { href: "/draw", label: "Live draw", icon: Gift },
  { href: "/prizes", label: "Prizes", icon: Ticket },
  { href: "/winners", label: "Winners", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings2 },
  { href: "/audit", label: "Audit history", icon: FileText },
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
  const current = usePathname();

  const selected = links.find((item) => item.href === current) ?? links[0];

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link className="wordmark" href="/">
          The celebration
          <small>Administration</small>
        </Link>
        <span className="eyebrow">Desk</span>
        <nav className="nav" aria-label="Administration">
          {links.map((item) => {
            const Icon = item.icon;
            const active = selected.href === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={16} />
                {item.label}
              </Link>
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
            <span>
              The wedding celebration · With a little help from Osusu.
            </span>
            <span>Event desk / Authorised staff only</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
