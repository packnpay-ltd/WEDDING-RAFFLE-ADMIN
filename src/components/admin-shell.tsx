"use client";

import "./admin-navigation.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
  Menu,
  X,
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

function SidebarContent({
  current,
  onNavigate,
}: {
  current: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <Link className="wordmark" href="/" onClick={onNavigate}>
        The celebration
        <small>Administration</small>
      </Link>
      <span className="eyebrow">Desk</span>
      <nav className="nav" aria-label="Administration">
        {links.map((item) => {
          const Icon = item.icon;
          const active = current === item.href;
          return (
            <Link
              onClick={onNavigate}
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
    </>
  );
}

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
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const closeOnDesktop = () => {
      if (!media.matches) setOpen(false);
    };
    const closeOnHistory = () => setOpen(false);
    media.addEventListener("change", closeOnDesktop);
    window.addEventListener("popstate", closeOnHistory);
    return () => {
      media.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("popstate", closeOnHistory);
    };
  }, []);

  const selected = links.find((item) => item.href === current) ?? links[0];

  return (
    <div className="shell">
      <aside className="sidebar desktop-sidebar">
        <SidebarContent current={current} />
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-heading">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mobile-menu-trigger"
                  />
                }
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </SheetTrigger>
              <SheetContent className="sidebar mobile-sidebar">
                <SheetTitle className="sr-only">
                  Administration navigation
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate between the wedding administration pages.
                </SheetDescription>
                <SheetClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="drawer-close"
                    />
                  }
                  aria-label="Close navigation menu"
                >
                  <X size={22} />
                </SheetClose>
                <SidebarContent
                  current={current}
                  onNavigate={() => setOpen(false)}
                />
              </SheetContent>
            </Sheet>
            <span className="eyebrow">
              {couple || "The wedding celebration"}
              <span style={{ padding: "0 12px", color: "#c8a96b" }}>/</span>
              <span data-current>{selected.label}</span>
            </span>
          </div>
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
