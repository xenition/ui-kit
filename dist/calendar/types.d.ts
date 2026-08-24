/**
 * Shared data shapes for the calendar / scheduling module (web parity of
 * `native/calendar`). These are plain, serializable records the host app owns —
 * every `Date` is passed in via props so the components stay pure (no clock
 * reads at module scope).
 */
/** Semantic accent for an event — maps to a theme color slot, never a hex. */
export type EventTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'neutral';
/** One calendar entry. `end` is optional for point-in-time events. */
export interface CalendarEvent {
    id: string;
    title: string;
    /** Start instant. */
    start: Date;
    /** End instant. Omit for a point event. */
    end?: Date;
    /** Renders in the all-day row rather than the time grid. */
    allDay?: boolean;
    /** Semantic accent; resolved through `toneClasses` to token utility classes. */
    tone?: EventTone;
    /** Optional location / room line. */
    location?: string;
    /** Optional one-line secondary text. */
    subtitle?: string;
}
/** Which scheduling surface a `DateNavigator` is paging. */
export type CalendarViewMode = 'month' | 'week' | 'day';
/** A selectable availability slot (e.g. a bookable 30-min window). */
export interface AvailabilitySlot {
    /** Start instant of the slot. */
    start: Date;
    /** Optional label override (defaults to the start clock label). */
    label?: string;
    /** Disabled/blocked slot — rendered but not selectable. */
    disabled?: boolean;
}
//# sourceMappingURL=types.d.ts.map