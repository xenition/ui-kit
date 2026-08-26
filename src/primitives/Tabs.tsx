import * as React from 'react';
import { cn } from './cn';

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  value: string;
  /**
   * Fires with the value of the tab that was clicked. Prefer `onChange` — that
   * is the kit's one canonical name for "the value changed". `onValueChange` is
   * this component's original spelling, kept so existing callers keep working;
   * if both are passed this one wins. One of the two is required in practice —
   * both are optional in the type so either spelling satisfies it on its own.
   */
  onValueChange?: (value: string) => void;
  /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
  onChange?: (value: string) => void;
}

/** Themed tab bar (controlled). Render the active panel yourself based on `value`. */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { className, items, value, onValueChange, onChange, ...rest },
  ref
) {
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  return (
    <div
      ref={ref}
      role="tablist"
      className={cn('flex gap-1 border-b border-border', className)}
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
            onClick={() => emit?.(it.value)}
            className={cn(
              '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors',
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-on-surface'
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
});
