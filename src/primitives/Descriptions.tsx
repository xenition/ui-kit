import * as React from 'react';
import { cn } from './cn';

export interface DescriptionItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface DescriptionsProps {
  items: DescriptionItem[];
  columns?: 1 | 2;
  className?: string;
}

/** Key/value detail grid bound to the theme tokens — for record/detail views. */
export function Descriptions({ items, columns = 1, className }: DescriptionsProps): React.ReactElement {
  return (
    <dl className={cn('grid gap-x-6 gap-y-3', columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1', className)}>
      {items.map((it, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">{it.label}</dt>
          <dd className="text-sm text-on-surface">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
