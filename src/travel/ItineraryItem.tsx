import * as React from 'react';
import { cn } from '../primitives/cn';

/** The kind of itinerary event — drives the leading glyph. */
export type ItineraryKind = 'flight' | 'hotel' | 'activity' | 'transfer' | 'meal';

/** Progress state of the event, announced and tinted from a token slot. */
export type ItineraryStatus = 'upcoming' | 'active' | 'done';

export interface ItineraryItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Event kind (selects a default glyph). */
  kind?: ItineraryKind;
  /** Override the leading glyph/emoji. */
  glyph?: string;
  /** Pre-formatted time or time range (e.g. `'09:30'` or `'09:30 – 11:00'`). */
  time?: string;
  /** Primary label. */
  title: string;
  /** Secondary detail line. */
  subtitle?: string;
  /** Progress state. */
  status?: ItineraryStatus;
  /** Draw the connecting timeline rail below the node (false on the last row). */
  showConnector?: boolean;
  /** Fires when the row is activated. */
  onClick?: () => void;
}

const KIND_GLYPH: Record<ItineraryKind, string> = {
  flight: '✈',
  hotel: '🏨',
  activity: '🎟',
  transfer: '🚕',
  meal: '🍽',
};

/** Token text/border class per status (mirrors the native semantic slot). */
const STATUS_CLASS: Record<ItineraryStatus, string> = {
  upcoming: 'border-muted text-muted',
  active: 'border-primary text-primary',
  done: 'border-success text-success',
};

/**
 * Web parity of the native `ItineraryItem`: one entry in a day-by-day trip
 * timeline — a leading kind glyph on a token rail, a time, a title, and an
 * optional detail line. `status` tints the node and is also announced (never
 * color-alone). Set `showConnector={false}` on the final row. Token-only colors.
 */
export const ItineraryItem = React.forwardRef<HTMLDivElement, ItineraryItemProps>(
  function ItineraryItem(
    {
      kind = 'activity',
      glyph,
      time,
      title,
      subtitle,
      status = 'upcoming',
      showConnector = true,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const mark = glyph ?? KIND_GLYPH[kind];
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;

    return (
      <div
        ref={ref}
        data-xen-itinerary-item=""
        aria-label={a11yLabel}
        className={cn(
          'flex gap-[var(--xen-space-md)]',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              onClick,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
      >
        <div className="flex w-8 flex-col items-center">
          <div
            aria-hidden="true"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border bg-surface text-sm',
              STATUS_CLASS[status]
            )}
          >
            {mark}
          </div>
          {showConnector ? <div className="mt-[2px] w-[2px] flex-1 bg-border" /> : null}
        </div>

        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col gap-[2px]',
            showConnector ? 'pb-[var(--xen-space-lg)]' : ''
          )}
        >
          {time ? <span className="text-xs font-semibold text-muted">{time}</span> : null}
          <span className="text-base font-semibold text-on-surface">{title}</span>
          {subtitle ? <span className="text-sm text-muted">{subtitle}</span> : null}
        </div>
      </div>
    );
  }
);
