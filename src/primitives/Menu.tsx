import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface MenuItem {
  label: React.ReactNode;
  onSelect?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Renders the item in the danger tone (e.g. Delete). */
  danger?: boolean;
}

export interface MenuProps {
  /** Clickable trigger (e.g. a Button or icon). */
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
}

/** Dropdown action menu bound to the theme tokens. Closes on select / outside click / Escape. */
export function Menu({ trigger, items, align = 'start' }: MenuProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative inline-block">
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-50 mt-1 min-w-[10rem] rounded-[var(--xen-radius-md)] border border-border',
            'bg-surface py-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              disabled={it.disabled}
              onClick={() => {
                it.onSelect?.();
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors',
                'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50',
                it.danger ? 'text-danger' : 'text-on-surface'
              )}
            >
              {it.icon != null && <span className="shrink-0">{it.icon}</span>}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
