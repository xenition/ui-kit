import * as React from 'react';
import { cn } from '../primitives/cn';
import { toneClasses, timeRangeLabel } from './format';
import type { CalendarEvent } from './types';

export type EventBlockVariant = 'solid' | 'soft' | 'outline';
export type EventBlockSize = 'sm' | 'md';

export interface EventBlockProps {
  /** The event to render. */
  event: CalendarEvent;
  /** Fill treatment. `soft` (default) tints, `solid` fills, `outline` is a rule. */
  variant?: EventBlockVariant;
  /** Density. `sm` hides the time/subtitle lines. */
  size?: EventBlockSize;
  /** Marks the block as the current selection (announced, not color-alone). */
  selected?: boolean;
  /** Fires with the event when the block is tapped. */
  onPress?: (event: CalendarEvent) => void;
  /** Explicit height (used when positioned inside a `TimeGrid`/`WeekView`). */
  height?: number;
  className?: string;
}

/**
 * A single event chip/block — the shared visual atom for `WeekView`,
 * `TimeGrid`, `DayAgenda` and `AllDayRow`. A left accent bar keeps the tone
 * legible even in `soft`/`outline` variants (never color-alone), and selection
 * is exposed through `aria-pressed` + a tone ring (not color-alone). Tone
 * resolves to `--xen-*` token classes via `toneClasses`; every color traces to
 * a token. Renders a real `<button>` for native keyboard/focus behavior.
 */
export const EventBlock = React.forwardRef<HTMLButtonElement, EventBlockProps>(
  function EventBlock(
    { event, variant = 'soft', size = 'md', selected = false, onPress, height, className },
    ref
  ) {
    const tone = toneClasses(event.tone);
    const solid = variant === 'solid';
    const outline = variant === 'outline';

    const surfaceClass = solid
      ? cn(tone.solidBg, tone.solidText)
      : outline
        ? 'bg-surface text-on-surface'
        : 'bg-neutral-100 text-on-surface';
    const metaClass = solid ? cn(tone.solidText, 'opacity-80') : 'text-muted';

    const timeText = event.allDay ? 'All day' : timeRangeLabel(event.start, event.end);
    const label = `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-pressed={selected || undefined}
        disabled={onPress == null}
        onClick={() => onPress?.(event)}
        style={height != null ? { minHeight: height } : undefined}
        className={cn(
          'flex w-full overflow-hidden text-left transition-opacity',
          'rounded-[var(--xen-radius-sm)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-300',
          'disabled:cursor-default enabled:hover:opacity-90',
          surfaceClass,
          outline ? 'border border-border' : '',
          selected ? cn('border', tone.accentBorder) : '',
          className
        )}
      >
        {/* Accent bar — keeps tone perceivable without relying on fill color. */}
        <span aria-hidden="true" className={cn('w-1 shrink-0 self-stretch', tone.accentBg)} />
        <span className={cn('flex-1 min-w-0', size === 'sm' ? 'p-1' : 'p-2')}>
          <span className="block truncate text-sm font-bold">{event.title}</span>
          {size === 'md' ? (
            <span className={cn('block truncate text-xs', metaClass)}>
              {timeText}
              {event.location ? ` · ${event.location}` : ''}
            </span>
          ) : null}
        </span>
      </button>
    );
  }
);
