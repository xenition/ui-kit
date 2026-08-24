import * as React from 'react';
import { cn } from './cn';

export interface SegmentedOption {
  label: React.ReactNode;
  value: string;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** Segmented control (pill toggle group) bound to the theme tokens. */
export function Segmented({ options, value, onChange, className }: SegmentedProps): React.ReactElement {
  return (
    <div role="tablist" className={cn('inline-flex rounded-[var(--xen-radius-md)] bg-neutral-100 p-1', className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'rounded-[var(--xen-radius-sm)] px-3 py-1 text-sm font-medium transition-colors',
              active ? 'bg-surface text-on-surface shadow-sm' : 'text-muted hover:text-on-surface'
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
