import * as React from 'react';
/** Time-of-day slot. Drives the fallback icon. */
export type RoutineSlot = 'morning' | 'afternoon' | 'evening' | 'bedtime' | 'anytime';
export interface RoutineRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
    /** Step label, e.g. "Brush teeth". */
    label: string;
    /** Time-of-day slot; drives the fallback icon. */
    slot?: RoutineSlot;
    /** Explicit emoji/glyph (overrides the slot icon). */
    icon?: string;
    /** Scheduled time, e.g. "7:30 AM". */
    time?: string;
    /** Whether the step is done. */
    done?: boolean;
    /** Disable the toggle. */
    disabled?: boolean;
    /** Toggle the done state. Presence makes the row a tappable checkbox. */
    onToggle?: (next: boolean) => void;
}
/**
 * A single routine step row: an icon, label + time, and a tappable done/not-done
 * checkbox. Done state is shown by a check glyph, strike-through, and the a11y
 * `aria-checked` state — never color alone. When `onToggle` is set the whole row
 * is a real `<button role="checkbox">`. Token-bound throughout — no literal
 * colors.
 */
export declare const RoutineRow: React.ForwardRefExoticComponent<RoutineRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RoutineRow.d.ts.map