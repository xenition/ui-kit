import * as React from 'react';
import { cn } from './cn';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The left nav rail (typically a `<Sidebar />`). */
  sidebar: React.ReactNode;
  /** Optional top-bar slot: page title, actions, search, … */
  header?: React.ReactNode;
  /** Main content area. */
  children: React.ReactNode;
  /** Rail width in px on wide screens. */
  sidebarWidth?: number;
  /** Accessible label for the mobile sidebar toggle. */
  menuLabel?: string;
}

/**
 * Responsive dashboard layout: a fixed-width left `Sidebar` beside a main
 * column of an optional top bar (`header`) and a scrolling content area
 * (`children`). On narrow screens the rail collapses behind a hamburger and
 * slides in over a scrim. All colors/spacing come from `--xen-*` tokens — no
 * literal colors.
 */
export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { sidebar, header, children, sidebarWidth = 260, menuLabel = 'Toggle navigation', className, ...rest },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const drawerId = React.useId();

  return (
    <div
      ref={ref}
      className={cn('flex min-h-screen w-full bg-surface text-on-surface', className)}
      {...rest}
    >
      {/* Persistent rail on wide screens. */}
      <aside
        className="hidden shrink-0 md:block"
        style={{ width: sidebarWidth }}
      >
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {/* Slide-in drawer on narrow screens. */}
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-neutral-900/50"
          />
          <div
            id={drawerId}
            className="absolute inset-y-0 left-0 shadow-lg"
            style={{ width: sidebarWidth }}
          >
            {sidebar}
          </div>
        </div>
      ) : null}

      {/* Main column. */}
      <div className="flex min-w-0 flex-1 flex-col">
        {header !== undefined ? (
          <header className="sticky top-0 z-30 flex items-center gap-[var(--xen-space-md)] border-b border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]">
            <button
              type="button"
              aria-label={menuLabel}
              aria-expanded={open}
              aria-controls={drawerId}
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-[var(--xen-radius-sm)] p-2 text-on-surface hover:bg-neutral-100 md:hidden"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-[var(--xen-space-md)]">
              {header}
            </div>
          </header>
        ) : null}
        <main className="min-w-0 flex-1 overflow-y-auto p-[var(--xen-space-lg)]">{children}</main>
      </div>
    </div>
  );
});
