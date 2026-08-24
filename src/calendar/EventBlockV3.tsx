import * as React from 'react';
import { cn } from '../primitives/cn';
import { toneClasses, timeRangeLabel } from './format';
import type { EventBlockProps } from './EventBlock';

/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV3Props = EventBlockProps;

/**
 * EventBlock, redesigned (v3): a **minimal accent-rail line**. A thin tone-colored
 * left bar precedes the title and time on a bare surface — the lightest possible
 * block for a dense agenda. Selected tints faintly. The opposite of v2's filled
 * block. Same props, token-only.
 */
export const EventBlockV3 = React.forwardRef<HTMLDivElement, EventBlockV3Props>(function EventBlockV3(
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
      className={cn('flex items-center gap-2 overflow-hidden border-l-4 py-1.5 pl-2', t.accentBorder, selected && 'bg-primary/5', interactive && 'cursor-pointer', className)}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-on-surface">{event.title}</p>
        {!small ? <p className="truncate text-xs text-muted">{timeRangeLabel(event.start, event.end)}{event.location ? ` · ${event.location}` : ''}</p> : null}
      </div>
    </div>
  );
});
