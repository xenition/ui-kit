import * as React from 'react';
import { cn } from '../primitives/cn';
import { toneClasses, timeRangeLabel } from './format';
import type { EventBlockProps } from './EventBlock';

/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV2Props = EventBlockProps;

/**
 * EventBlock, redesigned (v2): a **bold filled block**. The event fills its tone
 * color with the title, time range and location reversed out — a solid, punchy
 * block regardless of the `variant`. Selected gains a ring. Distinct from v1. Same
 * props, token-only.
 */
export const EventBlockV2 = React.forwardRef<HTMLDivElement, EventBlockV2Props>(function EventBlockV2(
  { event, variant, size = 'md', selected = false, onPress, height, className },
  ref
) {
  void variant;
  const t = toneClasses(event.tone);
  const interactive = typeof onPress === 'function';
  const small = size === 'sm';

  return (
    <div
      ref={ref}
      data-xen-event-block=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${event.title}${selected ? ', selected' : ''}`}
      onClick={interactive ? () => onPress?.(event) : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPress?.(event); } } : undefined}
      style={height ? { height } : undefined}
      className={cn('flex flex-col justify-center overflow-hidden rounded-md px-3 py-2 shadow-sm', t.solidBg, t.solidText, selected && 'ring-2 ring-offset-1 ring-primary', interactive && 'cursor-pointer', className)}
    >
      <p className="truncate text-sm font-bold">{event.title}</p>
      {!small ? <p className="truncate text-xs opacity-90">{timeRangeLabel(event.start, event.end)}{event.location ? ` · ${event.location}` : ''}</p> : null}
    </div>
  );
});
