import * as React from 'react';
import { cn } from '../primitives/cn';
import { activate, toneTextClass, ACTIVITY_META, type ActivityKind } from './internal';

export interface TimelineItem {
  id: string;
  /** Activity kind — drives the node glyph + tone. */
  kind: ActivityKind;
  /** Headline for the event. */
  title: string;
  /** Optional detail line. */
  detail?: string;
  /** Who did it. */
  actor?: string;
  /** Pre-formatted timestamp. */
  timestamp?: string;
}

export interface ContactTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Chronological events (caller controls ordering). */
  items: TimelineItem[];
  /** Fired when an event is activated. */
  onItemClick?: (item: TimelineItem) => void;
  /** Show a skeleton instead of content. */
  loading?: boolean;
  /** Placeholder when there are no events. */
  emptyLabel?: string;
}

/**
 * Vertical activity timeline for a contact / deal: each event is a glyph node
 * (kind → glyph + tone, matching {@link ACTIVITY_META}) on a connector rail,
 * with title, detail and an actor · timestamp meta line. The connector is
 * suppressed on the last node via guarded indexing. Renders a `loading` skeleton
 * and an `emptyLabel` placeholder. All colors are `--xen-*` token classes; node
 * glyphs are tone-colored over a `bg-neutral-100` chip.
 */
export const ContactTimeline = React.forwardRef<HTMLDivElement, ContactTimelineProps>(function ContactTimeline(
  { items, onItemClick, loading = false, emptyLabel = 'No activity yet', className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div ref={ref} aria-label="Loading timeline" className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-[var(--xen-space-sm)]">
            <div className="h-7 w-7 shrink-0 rounded-full bg-neutral-100" />
            <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)] pt-[var(--xen-space-xs)]">
              <div className="h-3 w-[60%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
              <div className="h-2.5 w-[35%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={emptyLabel}
        className={cn('py-[var(--xen-space-lg)] text-center text-sm text-muted', className)}
        {...rest}
      >
        {emptyLabel}
      </div>
    );
  }

  return (
    <div ref={ref} role="list" className={cn('flex flex-col', className)} {...rest}>
      {items.map((item, index) => {
        const meta = ACTIVITY_META[item.kind];
        const isLast = index === items.length - 1;
        const metaLine = [item.actor, item.timestamp].filter(Boolean).join(' · ');
        const interactive = onItemClick ? activate(() => onItemClick(item)) : {};
        return (
          <div
            key={item.id}
            role="listitem"
            aria-label={`${meta.label}: ${item.title}`}
            className={cn(
              'flex gap-[var(--xen-space-sm)]',
              onItemClick && 'cursor-pointer rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            )}
            {...interactive}
          >
            <div className="flex w-7 flex-col items-center">
              <span
                aria-hidden="true"
                className={cn('flex h-7 w-7 items-center justify-center rounded-full border border-border bg-neutral-100 text-xs', toneTextClass(meta.tone))}
              >
                {meta.glyph}
              </span>
              {isLast ? null : <span className="my-0.5 w-0.5 flex-1 bg-border" />}
            </div>

            <div className={cn('min-w-0 flex-1', isLast ? '' : 'pb-[var(--xen-space-md)]')}>
              <p className="text-sm font-semibold text-on-surface">{item.title}</p>
              {item.detail ? <p className="text-xs text-muted">{item.detail}</p> : null}
              {metaLine ? <p className="text-xs font-medium text-muted">{metaLine}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
});
