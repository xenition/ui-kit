import * as React from 'react';
import { cn } from './cn';

export interface ListItemData {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Leading slot (e.g. an Avatar or icon). */
  leading?: React.ReactNode;
  /** Trailing slot (e.g. a Badge, Button, or chevron). */
  trailing?: React.ReactNode;
  /** Makes the row a button. */
  onClick?: () => void;
}

export interface ListProps {
  items: ListItemData[];
  className?: string;
}

/** Vertical list of leading/title/description/trailing rows — bound to the theme tokens. */
export function List({ items, className }: ListProps): React.ReactElement {
  return (
    <ul
      className={cn(
        'divide-y divide-border overflow-hidden rounded-[var(--xen-radius-md)] border border-border',
        className
      )}
    >
      {items.map((it, i) => {
        const inner = (
          <>
            {it.leading != null && <span className="shrink-0">{it.leading}</span>}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-on-surface">{it.title}</span>
              {it.description != null && (
                <span className="block truncate text-sm text-muted">{it.description}</span>
              )}
            </span>
            {it.trailing != null && <span className="shrink-0">{it.trailing}</span>}
          </>
        );
        return (
          <li key={i}>
            {it.onClick ? (
              <button
                type="button"
                onClick={it.onClick}
                className="flex w-full items-center gap-3 bg-surface px-4 py-3 text-left transition-colors hover:bg-neutral-50"
              >
                {inner}
              </button>
            ) : (
              <div className="flex w-full items-center gap-3 bg-surface px-4 py-3">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
