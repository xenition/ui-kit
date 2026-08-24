import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { EmptyState } from '../commerce';
import type { HarvestLogProps } from './HarvestLog';

/** Same public contract as {@link HarvestLog} — a drop-in alternate design. */
export type HarvestLogV2Props = HarvestLogProps;

/**
 * HarvestLog, redesigned (v2): an **elevated ledger card**. A header pairs the
 * title with a period-total badge; each harvest is a row — crop, a big yield
 * figure, date·field, and a grade chip. Distinct from v1. Same props, token-only.
 */
export const HarvestLogV2 = React.forwardRef<HTMLDivElement, HarvestLogV2Props>(function HarvestLogV2(
  { entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', emptyDescription, className, ...rest },
  ref
) {
  if (entries.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🌾</span>} title={emptyTitle} description={emptyDescription} className={className} {...rest} />;
  }
  const rows = typeof maxRows === 'number' ? entries.slice(0, maxRows) : entries;
  const hidden = entries.length - rows.length;

  return (
    <div ref={ref} data-xen-harvest-log="" className={cn('flex flex-col rounded-lg bg-surface p-md shadow-sm', className)} {...rest}>
      <div className="mb-2 flex items-center justify-between">
        <p role="heading" aria-level={3} className="text-base font-bold text-on-surface">{title}</p>
        {total ? <Badge tone="success">{total}</Badge> : null}
      </div>
      {rows.map((e) => (
        <div key={e.id} className="flex items-center gap-3 border-t border-border py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-on-surface">{e.crop}</p>
            {(e.date || e.field) ? <p className="truncate text-xs text-muted">{[e.field, e.date].filter(Boolean).join(' · ')}</p> : null}
          </div>
          {e.grade ? <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{e.grade}</span> : null}
          <span className="text-base font-bold tabular-nums text-on-surface">{e.quantity}{e.unit ? ` ${e.unit}` : ''}</span>
        </div>
      ))}
      {hidden > 0 ? <p className="pt-2 text-xs text-muted">+{hidden} more</p> : null}
    </div>
  );
});
