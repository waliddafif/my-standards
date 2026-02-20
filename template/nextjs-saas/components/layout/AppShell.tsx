"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface AppShellProps {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * AppShell — collapsible sidebar (260px/64px) + header + main content.
 * Persists sidebar collapse state in localStorage.
 */
export function AppShell({ sidebar, header, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-200",
          "md:relative md:translate-x-0",
          collapsed ? "md:w-16" : "md:w-64",
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Sidebar collapse toggle (desktop) */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border border-border bg-background shadow-sm"
          onClick={toggleCollapse}
          aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
        >
          <Menu className="h-3 w-3" />
        </Button>

        {sidebar}
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 shrink-0">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {header}
        </header>

        {/* Page content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto"
        >
          <div className="max-w-[1600px] mx-auto px-4 py-6 md:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
