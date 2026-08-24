import * as React from 'react';
/** Layout of a {@link CountdownBadge}. */
export type CountdownVariant = 'inline' | 'blocks';
/** Semantic tone of the badge. */
export type CountdownTone = 'primary' | 'accent' | 'neutral';
export interface CountdownBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Absolute target time. Ignored when `remainingMs` is given. */
    target?: Date;
    /** Explicit remaining milliseconds (wins over `target`; handy for tests). */
    remainingMs?: number;
    /** Reference "now" for computing the delta from `target` (defaults to now). */
    now?: Date;
    /** Leading caption, e.g. `Starts in`. */
    label?: string;
    /** Text shown once the target has passed. */
    elapsedLabel?: string;
    /** `inline` compact chip, or `blocks` of dd/hh/mm tiles. */
    variant?: CountdownVariant;
    /** Color tone. */
    tone?: CountdownTone;
}
/**
 * Countdown to an event. Accepts an absolute `target` (measured against `now`)
 * or explicit `remainingMs`. `inline` renders a single chip (`3d 04h 12m`);
 * `blocks` renders separate dd / hh / mm tiles. Once elapsed it shows
 * `elapsedLabel`. This is a pure display component — it does not tick on its own
 * and reads no clock at import; the host re-renders with a fresh `now` /
 * `remainingMs`. Colors come from the `--xen-*` tokens; no literal colors.
 */
export declare const CountdownBadge: React.ForwardRefExoticComponent<CountdownBadgeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CountdownBadge.d.ts.map