import * as React from 'react';
import { cn } from './cn';

export interface ScrollableTabItem {
  value: string;
  label: React.ReactNode;
  /** Optional count/notification chip shown after the label. */
  badge?: React.ReactNode;
}

export interface ScrollableTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: ScrollableTabItem[];
  value: string;
  onValueChange: (value: string) => void;
}

/**
 * Web parity of the native `ScrollableTabs`: a horizontally scrollable tab bar
 * for when there are more tabs than fit the viewport (the base `Tabs` is a fixed
 * non-scrolling row). Each tab has a token-bound active underline and an optional
 * trailing badge. Uses the ARIA `tablist`/`tab` roles. All colors/spacing come
 * from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export const ScrollableTabs = React.forwardRef<HTMLDivElement, ScrollableTabsProps>(
  function ScrollableTabs({ className, items, value, onValueChange, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn('flex gap-1 overflow-x-auto border-b border-border', className)}
        {...rest}
      >
        {items.map((it) => {
          const active = it.value === value;
          return (
            <button
              key={it.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onValueChange(it.value)}
              className={cn(
                '-mb-px flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-6 py-2 text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300',
                active
                  ? 'border-primary font-semibold text-primary'
                  : 'border-transparent font-medium text-muted hover:text-on-surface'
              )}
            >
              {it.label}
              {it.badge != null ? (
                <span
                  className={cn(
                    'inline-flex min-w-4 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold text-surface',
                    active ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  {it.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }
);
