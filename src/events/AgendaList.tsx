import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';

/** Status of an agenda entry — drives a small leading dot + label. */
export type AgendaItemStatus = 'upcoming' | 'live' | 'done';

export interface AgendaItem {
  /** Stable key. */
  id: string;
  /** Pre-formatted start time, e.g. `09:00`. */
  time: string;
  /** Entry title. */
  title: string;
  /** Optional room / track subtitle. */
  subtitle?: string;
  /** Optional status marker. */
  status?: AgendaItemStatus;
}

export interface AgendaListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered agenda entries. */
  items: AgendaItem[];
  /** Fires when an entry is tapped. */
  onSelectItem?: (item: AgendaItem) => void;
  /** Message shown when `items` is empty. */
  emptyLabel?: string;
  /** Render placeholder rows instead of content. */
  loading?: boolean;
}

/** Token background class for each status dot (meaning also spelled out for `live`). */
const STATUS_DOT: Record<AgendaItemStatus, string> = {
  upcoming: 'bg-muted',
  live: 'bg-success',
  done: 'bg-border',
};

/**
 * A vertical, time-anchored agenda. Each row shows a time gutter, a status dot
 * (whose meaning is also spelled out for `live` entries), the title and an
 * optional subtitle. Renders a skeleton when `loading` and a centered
 * {@link EmptyState} when there are no items. Colors come from the `--xen-*`
 * tokens; no literal colors.
 */
export const AgendaList = React.forwardRef<HTMLDivElement, AgendaListProps>(function AgendaList(
  { items, onSelectItem, emptyLabel = 'No sessions scheduled yet', loading = false, className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div ref={ref} aria-label="Loading agenda" className={cn('flex flex-col gap-sm', className)} {...rest}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex flex-row items-center gap-md">
            <div className="h-4 w-12 animate-pulse rounded-sm bg-neutral-200" />
            <div className="h-5 flex-1 animate-pulse rounded-sm bg-neutral-100" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState ref={ref} className={className} {...rest} title={emptyLabel} />;
  }

  return (
    <div ref={ref} role="list" className={cn('flex flex-col gap-xs', className)} {...rest}>
      {items.map((item) => {
        const status = item.status ?? 'upcoming';
        const clickable = typeof onSelectItem === 'function';
        const row = (
          <div className="flex flex-row gap-md py-sm text-left">
            <span className="w-14 shrink-0 text-sm font-semibold text-muted">{item.time}</span>
            <span className="flex flex-col items-center pt-1">
              <span className={cn('h-2 w-2 rounded-full', STATUS_DOT[status])} />
            </span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="flex items-center gap-xs">
                <span className="flex-1 text-base font-semibold text-on-surface">{item.title}</span>
                {status === 'live' ? (
                  <span className="text-xs font-bold tracking-wide text-success">LIVE</span>
                ) : null}
              </span>
              {item.subtitle ? <span className="text-sm text-muted">{item.subtitle}</span> : null}
            </span>
          </div>
        );
        return (
          <div key={item.id} role="listitem">
            {clickable ? (
              <button
                type="button"
                onClick={() => onSelectItem?.(item)}
                aria-label={`${item.time} ${item.title}`}
                className="w-full rounded-md text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                {row}
              </button>
            ) : (
              row
            )}
          </div>
        );
      })}
    </div>
  );
});
