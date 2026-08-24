import * as React from 'react';
import { cn } from './cn';

export interface BottomNavItem {
  key: string;
  label: string;
  /** Optional icon node (e.g. an `<Icon glyph="🏠" />`). */
  icon?: React.ReactNode;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  /** Key of the active tab. */
  active: string;
  /** Fires with the selected tab key. */
  onChange: (key: string) => void;
  className?: string;
}

/**
 * Fixed bottom tab bar — the primary mobile navigation pattern. A full-width
 * row of tappable items on a `surface` background with a top hairline in the
 * `border` token; the active item renders in the `primary` tone while inactive
 * items use `muted`. Exposes `tablist`/`tab` roles with the selected state.
 * `position: fixed` to the viewport bottom. No literal colors.
 */
export function BottomNav({ items, active, onChange, className }: BottomNavProps): React.ReactElement {
  return (
    <nav
      role="tablist"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex w-full border-t border-border bg-surface',
        className
      )}
    >
      {items.map((item) => {
        const selected = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={item.label}
            onClick={() => onChange(item.key)}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              selected ? 'font-semibold text-primary' : 'text-muted'
            )}
          >
            {item.icon != null && <span className="inline-flex">{item.icon}</span>}
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
