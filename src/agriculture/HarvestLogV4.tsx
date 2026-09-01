import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { EmptyStateV4 } from '../commerce/EmptyStateV4';
import { metaLine } from './internal/farm-v4';
import type { HarvestLogProps } from './HarvestLog';

export interface HarvestLogV4Props extends HarvestLogProps {
  /** Label for the period total. Default `'Total'`. */
  totalLabel?: string;
  /**
   * Copy for the "and N more" line. Default `'+3 more'`, which the base built
   * inline — so a host could not localize it or say "3 further harvests".
   */
  formatRemaining?: (remaining: number) => string;
}

/**
 * **V4 harvest log** — the web twin of the native `HarvestLogV4`, same props as
 * {@link HarvestLog} plus `totalLabel` and `formatRemaining`.
 *
 * ## Four changes
 *
 * 1. **The total is labelled.** The base rendered it as a bare figure in the
 *    header, so the most important number on the card had nothing saying what
 *    it counted.
 * 2. **Quantities are tabular**, which is the only way a log of harvests reads
 *    as a column rather than as ragged text — with proportional figures `40`
 *    and `1,180` have no shared edge.
 * 3. **The rows are a real `<ul>`**, so a screen reader announces "list, 6
 *    items" instead of walking six anonymous divs.
 * 4. **Captions take `muted-text`**, and the empty state is `EmptyStateV4`.
 *
 * A `maxRows` cap still truncates the list and says how many were hidden.
 */
export const HarvestLogV4 = React.forwardRef<HTMLDivElement, HarvestLogV4Props>(
  function HarvestLogV4(
    {
      entries,
      title = 'Harvest log',
      total,
      totalLabel = 'Total',
      maxRows,
      emptyTitle = 'No harvests logged',
      emptyDescription = 'Recorded harvests will appear here.',
      formatRemaining,
      className,
      ...rest
    },
    ref
  ) {
    const list = Array.isArray(entries) ? entries : [];
    const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
    const remaining = list.length - visible.length;
    const more = formatRemaining ?? ((n: number) => `+${n} more`);

    return (
      <CardV4
        ref={ref}
        data-xen-harvest-log=""
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <IconV4 glyph="🧺" size="base" />
          <h3 className="min-w-0 flex-1 text-base font-semibold text-on-card">{title}</h3>
          {total != null ? (
            <div className="flex shrink-0 flex-col items-end">
              <span className="text-xs text-muted-text">{totalLabel}</span>
              <span className="font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]">
                {total}
              </span>
            </div>
          ) : null}
        </div>

        {list.length === 0 ? (
          <EmptyStateV4
            icon={<IconV4 glyph="🌾" size="2xl" />}
            title={emptyTitle}
            description={emptyDescription}
          />
        ) : (
          <div>
            <ul>
              {visible.map((entry, i) => {
                const last = i === visible.length - 1 && remaining <= 0;
                return (
                  <li
                    key={entry.id ?? `harvest-${i}`}
                    className={cn(
                      'flex items-center gap-sm py-sm',
                      !last && 'border-b border-border'
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-on-card">{entry.crop}</p>
                      <p className="truncate text-xs text-muted-text">
                        {metaLine([entry.field, entry.date])}
                      </p>
                    </div>

                    {entry.grade != null ? (
                      <BadgeV4 tone="neutral" variant="outline" size="sm">
                        {entry.grade}
                      </BadgeV4>
                    ) : null}

                    <span className="flex shrink-0 items-baseline gap-xs">
                      <span className="font-heading text-sm font-bold text-on-card [font-variant-numeric:tabular-nums]">
                        {String(entry.quantity)}
                      </span>
                      {entry.unit != null ? (
                        <span className="text-xs text-muted-text">{entry.unit}</span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>

            {remaining > 0 ? (
              <p className="mt-xs text-xs text-muted-text">{more(remaining)}</p>
            ) : null}
          </div>
        )}
      </CardV4>
    );
  }
);
