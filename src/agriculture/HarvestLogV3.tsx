import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { HarvestLogProps } from './HarvestLog';

/** Same public contract as {@link HarvestLog} — a drop-in alternate design. */
export type HarvestLogV3Props = HarvestLogProps;

/**
 * HarvestLog, redesigned (v3): a **compact ledger list**. A tight title·total
 * header over dense hairline rows — crop + field·date on the left, the yield (and
 * grade) pinned right. The opposite of v2's card. Same props, token-only.
 */
export const HarvestLogV3 = React.forwardRef<HTMLDivElement, HarvestLogV3Props>(function HarvestLogV3(
  { entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', emptyDescription, className, ...rest },
  ref
) {
  if (entries.length === 0) {
    return <EmptyState ref={ref} icon={<span className="text-3xl">🌾</span>} title={emptyTitle} description={emptyDescription} className={className} {...rest} />;
  }
  const rows = typeof maxRows === 'number' ? entries.slice(0, maxRows) : entries;
  const hidden = entries.length - rows.length;

  return (
    <div ref={ref} data-xen-harvest-log="" className={cn('flex flex-col', className)} {...rest}>
      <div className="flex items-baseline justify-between py-1">
        <p role="heading" aria-level={3} className="text-sm font-bold text-on-surface">{title}</p>
        {total ? <span className="text-sm font-semibold text-success">{total}</span> : null}
      </div>
      {rows.map((e) => (
        <div key={e.id} className="flex items-center gap-2 border-b border-border py-1.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-on-surface">{e.crop}</p>
            {(e.date || e.field) ? <p className="truncate text-xs text-muted">{[e.field, e.date].filter(Boolean).join(' · ')}</p> : null}
          </div>
          {e.grade ? <span className="text-xs text-muted">{e.grade}</span> : null}
          <span className="text-sm font-semibold tabular-nums text-on-surface">{e.quantity}{e.unit ? ` ${e.unit}` : ''}</span>
        </div>
      ))}
      {hidden > 0 ? <p className="pt-1 text-xs text-muted">+{hidden} more</p> : null}
    </div>
  );
});
