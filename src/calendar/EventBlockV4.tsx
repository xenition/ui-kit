import * as React from 'react';
import { cn } from '../primitives/cn';
import { timeRangeLabel } from './format';
import { blockGround, eventTone, metaLine, TONE_BG, TONE_INK, TONE_ON, TONE_VAR } from './internal/grid-v4';
import type { EventBlockProps } from './EventBlock';

export interface EventBlockV4Props extends EventBlockProps {
  /** Show the time range under the title. Default `true` above the min height. */
  showTime?: boolean;
  /** Announced for an all-day event. Default `'All day'`. */
  allDayLabel?: string;
}

/**
 * **V4 event block** — the web twin of the native `EventBlockV4`, same props
 * as {@link EventBlock} plus `showTime` and `allDayLabel`.
 *
 * ## Four changes
 *
 * 1. **A solid block uses its tone's *paired* ink** (`TONE_ON`). The base
 *    inked every solid variant `text-on-primary` regardless of tone.
 * 2. **The soft variant gains a rail**, so an event's tone survives greyscale
 *    and CVD — a 16% tint alone does not.
 * 3. **A short block drops its time rather than clipping it.**
 * 4. **The block is one announced object**, not three loose text nodes.
 *
 * **Renders nothing without an event title** (§4.5).
 */
export const EventBlockV4 = React.forwardRef<HTMLDivElement, EventBlockV4Props>(
  function EventBlockV4(
    {
      event,
      variant = 'soft',
      size = 'md',
      selected = false,
      showTime,
      allDayLabel = 'All day',
      onPress,
      height,
      className,
    },
    ref
  ) {
    if (!event?.title) return null;

    const tone = eventTone(event.tone);
    const solid = variant === 'solid';
    const time = event.allDay ? allDayLabel : timeRangeLabel(event.start, event.end);
    // A 15-minute block has room for one line; the accessible name keeps the
    // time either way.
    const room = height == null || height >= 48;
    const withTime = (showTime ?? true) && room;
    const name = metaLine([event.title, time, event.location, event.subtitle]);

    const body = (
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            'truncate font-semibold',
            size === 'sm' ? 'text-xs' : 'text-sm',
            solid ? TONE_ON[tone] : 'text-on-card'
          )}
        >
          {event.title}
        </span>
        {withTime && time ? (
          <span
            className={cn(
              'truncate text-xs [font-variant-numeric:tabular-nums]',
              solid ? TONE_ON[tone] : TONE_INK[tone]
            )}
          >
            {time}
          </span>
        ) : null}
      </span>
    );

    const shell = cn(
      'flex gap-xs overflow-hidden rounded-[var(--xen-radius-sm)] px-xs',
      size === 'sm' ? 'py-0.5' : 'py-xs',
      variant === 'outline' && 'border',
      selected && 'ring-2 ring-[var(--xen-ring)]',
      solid && TONE_BG[tone]
    );

    const inlineStyle: React.CSSProperties = {
      height,
      ...(solid ? null : { background: blockGround(tone) }),
      ...(variant === 'outline' ? { borderColor: TONE_VAR[tone] } : null),
    };

    const rail = !solid ? (
      <span
        aria-hidden
        className="w-[3px] shrink-0 self-stretch rounded-full"
        style={{ background: TONE_VAR[tone] }}
      />
    ) : null;

    if (!onPress) {
      return (
        <div
          ref={ref}
          data-xen-event-block={tone}
          aria-label={name}
          className={cn(shell, className)}
          style={inlineStyle}
        >
          {rail}
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} data-xen-event-block={tone} className={className}>
        <button
          type="button"
          aria-label={name}
          aria-pressed={selected}
          onClick={() => onPress(event)}
          data-xen-v4-chrome="on-surface"
          className={cn(shell, 'w-full text-left')}
          style={inlineStyle}
        >
          {rail}
          {body}
        </button>
      </div>
    );
  }
);
