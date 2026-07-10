import * as React from 'react';
import { cn } from './cn';

export interface SidebarItem {
  /** Row label (also the accessible name). */
  label: string;
  /** Optional leading icon slot. */
  icon?: React.ReactNode;
  /** Render the row as a link when provided. */
  href?: string;
  /** Marks the row as the current destination. */
  active?: boolean;
  /** Fires on click/activation (in addition to any `href` navigation). */
  onSelect?: () => void;
}

export interface SidebarGroup {
  /** Optional section heading rendered above the rows. */
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand slot pinned to the top (logo, wordmark, …). */
  brand?: React.ReactNode;
  /** Flat list of nav rows (mutually exclusive with `groups`). */
  items?: SidebarItem[];
  /** Grouped nav rows, each with an optional section heading. */
  groups?: SidebarGroup[];
  /** Optional footer slot pinned to the bottom (account, sign-out, …). */
  footer?: React.ReactNode;
}

const ROW_BASE =
  'flex w-full items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300';

function SidebarRow({ item }: { item: SidebarItem }): React.ReactElement {
  const className = cn(
    ROW_BASE,
    item.active
      ? 'bg-primary-50 text-primary'
      : 'text-on-surface hover:bg-neutral-100'
  );
  const icon =
    item.icon !== undefined ? (
      <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center">
        {item.icon}
      </span>
    ) : null;

  if (item.href !== undefined) {
    return (
      <a
        href={item.href}
        aria-current={item.active ? 'page' : undefined}
        onClick={item.onSelect}
        className={className}
      >
        {icon}
        <span className="truncate">{item.label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-current={item.active ? 'page' : undefined}
      onClick={item.onSelect}
      className={cn(ROW_BASE, 'text-left', item.active ? 'bg-primary-50 text-primary' : 'text-on-surface hover:bg-neutral-100')}
    >
      {icon}
      <span className="truncate">{item.label}</span>
    </button>
  );
}

/**
 * Vertical nav rail: a `brand` slot on top, one or more groups of token-styled
 * nav rows with an active state, and an optional `footer`. Pass either a flat
 * `items` array or grouped `groups`. Rows with an `href` render as links,
 * otherwise as buttons; both call `onSelect`. All colors come from `--xen-*`
 * tokens — no literal colors.
 */
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { brand, items, groups, footer, className, ...rest },
  ref
) {
  const resolvedGroups: SidebarGroup[] =
    groups ?? (items ? [{ items }] : []);

  return (
    <nav
      ref={ref}
      aria-label="Sidebar"
      className={cn(
        'flex h-full flex-col gap-[var(--xen-space-md)] border-r border-border bg-surface text-on-surface',
        'px-[var(--xen-space-md)] py-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      {brand !== undefined ? (
        <div className="flex items-center px-[var(--xen-space-sm)]">{brand}</div>
      ) : null}
      <div className="flex flex-1 flex-col gap-[var(--xen-space-lg)] overflow-y-auto">
        {resolvedGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-[var(--xen-space-xs)]">
            {group.label !== undefined ? (
              <div className="px-[var(--xen-space-md)] pb-[var(--xen-space-xs)] text-xs font-semibold uppercase tracking-wide text-muted">
                {group.label}
              </div>
            ) : null}
            {group.items.map((item, ii) => (
              <SidebarRow key={ii} item={item} />
            ))}
          </div>
        ))}
      </div>
      {footer !== undefined ? (
        <div className="border-t border-border pt-[var(--xen-space-md)]">{footer}</div>
      ) : null}
    </nav>
  );
});
