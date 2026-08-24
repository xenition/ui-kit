import * as React from 'react';
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
export declare const EventBlock: React.ForwardRefExoticComponent<EventBlockProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=EventBlock.d.ts.map