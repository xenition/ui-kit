import * as React from 'react';
import { cn } from './cn';

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
}

/** Themed tab bar (controlled). Render the active panel yourself based on `value`. */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { className, items, value, onValueChange, ...rest },
  ref
) {
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
            onClick={() => onValueChange(it.value)}
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
