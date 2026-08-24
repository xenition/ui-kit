import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';

/** Same public contract as {@link ItineraryItem} — a drop-in alternate design. */
export type ItineraryItemV2Props = ItineraryItemProps;

const KIND_GLYPH: Record<ItineraryKind, string> = { flight: '✈️', hotel: '🏨', activity: '🎟️', transfer: '🚕', meal: '🍽️' };
const NODE: Record<ItineraryStatus, string> = { upcoming: 'bg-surface border-border', active: 'bg-primary border-primary', done: 'bg-success border-success' };

/**
 * ItineraryItem, redesigned (v2): a **timeline card**. A time gutter and a node dot
 * with a connector run down the left; the glyph, title and subtitle sit in an
 * elevated card to the right. Distinct from v1's flat row. Same props, token-only.
 */
export const ItineraryItemV2 = React.forwardRef<HTMLDivElement, ItineraryItemV2Props>(
  function ItineraryItemV2({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onClick, className, ...rest }, ref) {
    const mark = glyph ?? KIND_GLYPH[kind];
    const interactive = typeof onClick === 'function';
    return (
      <div ref={ref} data-xen-itinerary-item="" className={cn('flex gap-3', className)} {...rest}>
        <div className="flex w-12 shrink-0 flex-col items-center">
          {time ? <span className="text-xs font-semibold text-muted">{time}</span> : null}
          <span className={cn('mt-1 h-3 w-3 rounded-full border-2', NODE[status])} aria-hidden />
          {showConnector ? <span className="mt-1 w-px flex-1 bg-border" aria-hidden /> : null}
        </div>
        <div
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={title}
          onClick={interactive ? () => onClick?.() : undefined}
          onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
          className={cn('mb-3 flex flex-1 items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50')}
        >
          <span className="text-xl" aria-hidden>{mark}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
            {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
          </div>
        </div>
      </div>
    );
  }
);
