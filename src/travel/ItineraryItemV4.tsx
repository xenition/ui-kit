import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import type { BadgeTone } from '../primitives';
import type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';

/** Drop-in for {@link ItineraryItemProps} — same props, the V4 "journey" design. */
export type ItineraryItemV4Props = ItineraryItemProps;

const KIND_GLYPH: Record<ItineraryKind, string> = {
  flight: '✈',
  hotel: '🏨',
  activity: '🎟',
  transfer: '🚕',
  meal: '🍽',
};

/** Status → pill copy, glyph and Badge tone (announced, never color-alone). */
const STATUS_PILL: Record<ItineraryStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  upcoming: { label: 'Upcoming', glyph: '○', tone: 'neutral' },
  active: { label: 'Now', glyph: '●', tone: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success' },
};

/**
 * ItineraryItem — **V4** "journey" design (web parity of the native V4). One
 * boarding-pass timeline row: the kind glyph rides a small brand-gradient disc
 * (the signature V4 touch) sitting on a token connector rail, with the time,
 * title and detail line beside it and a status pill (`Badge`) — done→success,
 * active→warn, upcoming→neutral. Same props/behavior as
 * {@link ItineraryItemProps}; all colors from `--xen-*` token classes (no literal
 * colors). Set `showConnector={false}` on the final row.
 */
export const ItineraryItemV4 = React.forwardRef<HTMLDivElement, ItineraryItemV4Props>(
  function ItineraryItemV4(
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
    const pill = STATUS_PILL[status];
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
        {/* Gradient kind-disc on a token connector rail */}
        <div className="flex w-8 flex-col items-center">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50"
          >
            {mark}
          </span>
          {showConnector ? <div className="mt-[2px] w-[2px] flex-1 bg-border" /> : null}
        </div>

        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col gap-[2px]',
            showConnector ? 'pb-[var(--xen-space-lg)]' : ''
          )}
        >
          <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
            {time ? <span className="text-xs font-semibold text-muted">{time}</span> : <span />}
            <Badge tone={pill.tone} variant="soft" size="sm">{`${pill.glyph} ${pill.label}`}</Badge>
          </div>
          <span className="text-base font-semibold text-on-surface">{title}</span>
          {subtitle ? <span className="text-sm text-muted">{subtitle}</span> : null}
        </div>
      </div>
    );
  }
);
