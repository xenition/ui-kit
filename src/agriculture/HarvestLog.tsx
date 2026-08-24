import * as React from 'react';
import { Card, Icon, Badge } from '../primitives';
import { EmptyState } from '../commerce';

/** A single harvest record. */
export interface HarvestEntry {
  /** Stable key for list rendering. */
  id: string;
  /** Crop harvested (e.g. "Wheat"). */
  crop: string;
  /** Yield magnitude (e.g. `4.2`). Rendered with `unit`. */
  quantity: number | string;
  /** Yield unit (e.g. "t", "kg", "crates"). */
  unit?: string;
  /** When it was logged (pre-formatted, e.g. "Aug 12"). */
  date?: string;
  /** Field / plot it came from. */
  field?: string;
  /** Quality grade chip (e.g. "A", "Premium"). */
  grade?: string;
}

export interface HarvestLogProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Harvest records, newest first. Empty → empty state. Guarded indexing. */
  entries: HarvestEntry[];
  /** Card title. Default "Harvest log". */
  title?: string;
  /** Pre-formatted period total shown in the header (e.g. "18.6 t"). */
  total?: string;
  /** Max rows to render before truncating (rest summarized). Default all. */
  maxRows?: number;
  /** Empty-state title. */
  emptyTitle?: string;
  /** Empty-state description. */
  emptyDescription?: string;
}

/**
 * A harvest log — a titled {@link Card} listing recent harvest records (crop,
 * quantity + unit, date, field, optional grade chip). The header can show a
 * period `total`. When `entries` is empty an {@link EmptyState} stands in for
 * the list. Rows are keyed and indexed defensively, and `maxRows` truncates a
 * long log to a "+N more" summary. Token-bound throughout — no literal colors.
 */
export const HarvestLog = React.forwardRef<HTMLDivElement, HarvestLogProps>(function HarvestLog(
  {
    entries,
    title = 'Harvest log',
    total,
    maxRows,
    emptyTitle = 'No harvests logged',
    emptyDescription = 'Recorded harvests will appear here.',
    className,
    ...rest
  },
  ref
) {
  const list = Array.isArray(entries) ? entries : [];
  const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
  const remaining = list.length - visible.length;

  return (
    <Card ref={ref} data-xen-harvest-log="" className={className} {...rest}>
      <div className="flex items-center gap-1">
        {/* accent slot → primary on web */}
        <Icon glyph="🧺" color="primary" size="base" />
        <span className="flex-1 text-base font-semibold text-on-surface">{title}</span>
        {total != null ? <span className="text-sm font-semibold text-muted">{total}</span> : null}
      </div>

      {list.length === 0 ? (
        <div className="mt-3">
          <EmptyState
            icon={<Icon glyph="🌾" size="2xl" color="muted" />}
            title={emptyTitle}
            description={emptyDescription}
          />
        </div>
      ) : (
        <div className="mt-2">
          {visible.map((entry, i) => {
            const isLast = i === visible.length - 1 && remaining <= 0;
            const subLine = [entry.field, entry.date]
              .filter((s) => s != null && s !== '')
              .join(' · ');
            return (
              <div
                key={entry.id ?? `harvest-${i}`}
                className={`flex items-center gap-2 py-2${isLast ? '' : ' border-b border-border'}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-on-surface">{entry.crop}</p>
                  {subLine !== '' ? <p className="truncate text-xs text-muted">{subLine}</p> : null}
                </div>
                {entry.grade != null ? <Badge tone="neutral">{entry.grade}</Badge> : null}
                <span className="font-heading text-sm font-bold text-on-surface">
                  {String(entry.quantity)}
                  {entry.unit != null ? (
                    <span className="font-normal text-muted"> {entry.unit}</span>
                  ) : null}
                </span>
              </div>
            );
          })}
          {remaining > 0 ? (
            <p className="mt-1 text-xs text-muted">+{remaining} more</p>
          ) : null}
        </div>
      )}
    </Card>
  );
});
