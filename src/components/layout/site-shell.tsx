"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

const primaryLinks = [
  { label: "Wheels", href: "/wheels", index: "01" },
  { label: "Visualizer", href: "/visualizer", index: "02" },
  { label: "Fitment", href: "/fitment", index: "03" },
  { label: "Technology", href: "/technology", index: "04" },
  { label: "Gallery", href: "/gallery", index: "05" },
  { label: "Dealers", href: "/dealers", index: "06" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shellStyle = {
    "--u-sidebar-current-width": sidebarCollapsed ? "68px" : "224px",
  } as CSSProperties;

  return (
    <div style={shellStyle}>
      <header className="fixed inset-x-0 top-0 z-[var(--u-z-header)] flex h-[var(--u-header-height)] items-center justify-between border-b border-[var(--u-color-line)] bg-[color-mix(in_srgb,var(--u-color-paper)_95%,transparent)] px-[var(--u-page-gutter)] backdrop-blur-xl">
        <a href="/" aria-label="Uranus Wheels home" className="text-[19px] font-semibold tracking-[0.24em]">
          URANUS<span className="ml-2 text-[10px] font-normal tracking-[0.28em] text-[var(--u-color-muted)]">WHEELS</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {primaryLinks.slice(0, 4).map((item) => (
            <a key={item.index} href={item.href} className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--u-color-ink-soft)] transition-colors hover:text-black">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/fitment" className="hidden border border-[var(--u-color-ink)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-[var(--u-color-ink)] hover:text-white sm:inline-flex">
            Find Your Fit
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--u-color-line-strong)] text-[var(--u-color-ink)] lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="uranus-mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="text-xl leading-none">{mobileMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </header>

      <aside
        aria-label="Section navigation"
        className={[
          "fixed bottom-0 left-0 top-[var(--u-header-height)] z-[var(--u-z-sidebar)] hidden flex-col border-r border-[var(--u-color-line)] bg-[var(--u-color-paper)] py-6 transition-[width] duration-[var(--u-duration-standard)] lg:flex",
          sidebarCollapsed ? "w-[68px]" : "w-[224px]",
        ].join(" ")}
      >
        <div className="flex flex-1 flex-col gap-2 px-3">
          {primaryLinks.map((item) => (
            <a
              key={item.index}
              href={item.href}
              title={sidebarCollapsed ? item.label : undefined}
              className={[
                "flex min-h-11 items-center gap-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--u-color-ink-soft)] transition-colors hover:bg-[var(--u-color-surface-muted)]",
                sidebarCollapsed ? "justify-center" : "justify-start",
              ].join(" ")}
            >
              <span className="font-mono text-[9px] text-[var(--u-color-muted)]">{item.index}</span>
              {!sidebarCollapsed ? <span>{item.label}</span> : <span className="sr-only">{item.label}</span>}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--u-color-line)] px-3 pt-5">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            className="flex min-h-10 items-center justify-center gap-3 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--u-color-muted)] hover:text-[var(--u-color-ink)]"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!sidebarCollapsed}
          >
            <span aria-hidden="true">{sidebarCollapsed ? "»" : "«"}</span>
            {!sidebarCollapsed ? <span>Collapse</span> : <span className="sr-only">Expand sidebar</span>}
          </button>
          {!sidebarCollapsed ? (
            <span className="px-3 text-[9px] uppercase tracking-[0.18em] text-[var(--u-color-muted)]">Precision Engineering</span>
          ) : (
            <span className="mx-auto [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.2em] text-[var(--u-color-muted)]">UR / 2026</span>
          )}
        </div>
      </aside>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[var(--u-z-overlay)] bg-black/35 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <nav
            id="uranus-mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-[var(--u-header-height)] border-b border-[var(--u-color-line)] bg-[var(--u-color-paper)] px-[var(--u-page-gutter)] py-5 shadow-[var(--u-shadow-overlay)]"
            onClick={(event) => event.stopPropagation()}
          >
            {primaryLinks.map((item) => (
              <a
                key={item.index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-14 items-center justify-between border-b border-[var(--u-color-line)] text-sm font-medium"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-[var(--u-color-muted)]">{item.index}</span>
              </a>
            ))}
            <a href="/fitment" onClick={() => setMobileMenuOpen(false)} className="mt-5 flex min-h-12 items-center justify-center bg-[var(--u-color-ink)] text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Find Your Fit
            </a>
          </nav>
        </div>
      ) : null}

      <div className="pt-[var(--u-header-height)]">{children}</div>
    </div>
  );
}
