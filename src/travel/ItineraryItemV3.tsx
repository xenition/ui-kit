import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';

/** Same public contract as {@link ItineraryItem} — a drop-in alternate design. */
export type ItineraryItemV3Props = ItineraryItemProps;

const KIND_GLYPH: Record<ItineraryKind, string> = { flight: '✈️', hotel: '🏨', activity: '🎟️', transfer: '🚕', meal: '🍽️' };
const DOT: Record<ItineraryStatus, string> = { upcoming: 'bg-neutral-400', active: 'bg-primary', done: 'bg-success' };

/**
 * ItineraryItem, redesigned (v3): a **dense agenda line**. The time leads, then the
 * glyph, the title over a subtitle, and a status dot pinned right — hairline-
 * bordered for a packed day plan. The opposite of v2's timeline card. Status is
 * dot + text, never color alone. Same props, token-only.
 */
export const ItineraryItemV3 = React.forwardRef<HTMLDivElement, ItineraryItemV3Props>(
  function ItineraryItemV3({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector, onClick, className, ...rest }, ref) {
    void showConnector;
    const mark = glyph ?? KIND_GLYPH[kind];
    const interactive = typeof onClick === 'function';
    return (
      <div
        ref={ref}
        data-xen-itinerary-item=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${title}, ${status}`}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
        className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        {...rest}
      >
        {time ? <span className="w-14 shrink-0 text-xs font-semibold tabular-nums text-muted">{time}</span> : null}
        <span className="text-lg" aria-hidden>{mark}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-on-surface">{title}</p>
          {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
        </div>
        <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', DOT[status])} aria-label={status} />
      </div>
    );
  }
);
