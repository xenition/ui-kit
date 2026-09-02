import * as React from 'react';
import type { SleepBarProps, SleepQuality } from './SleepBar';
import { type Appearance } from './internal/tone-v4';
export interface SleepBarV4Props extends SleepBarProps {
    /** Copy when no usable goal was given. Default `'No goal set'`. */
    noGoalLabel?: string;
    /** Override the four quality words. */
    qualityLabels?: Partial<Record<SleepQuality, string>>;
    /** Render an hours figure. Default `'7.5h'`. */
    formatHours?: (hours: number) => string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 sleep bar** — same props as {@link SleepBar} plus `noGoalLabel`,
 * `qualityLabels`, `formatHours` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **`goal={0}` drew an empty bar for a night that was fully slept.** Nought
 *    was read as *nought per cent* rather than as *no goal*, so 7.5 hours with
 *    no target set rendered as a completely unfilled track — the picture of a
 *    terrible night. There is now a "no goal" branch that prints the hours and
 *    draws no track at all.
 * 2. **The bar is a meter.** It was a pair of nested `div`s with a width and
 *    nothing else; the one proportion the card exists to show was invisible to
 *    a screen reader.
 * 3. **A bare `<div>` was carrying the card's `aria-label`.** Role `generic`
 *    cannot be named and browsers drop the attribute, so the sentence that was
 *    supposed to summarise the night reached nobody. The card is a named
 *    `group` and the meter carries its own value.
 * 4. **The quality word is inked with the corrected slot.** `text-success` is
 *    `var(--xen-success)`, a *fill*, and measures as low as 1.32:1 as text.
 * 5. **The track is not `bg-border`** — a hairline colour is not a surface.
 */
export declare const SleepBarV4: React.ForwardRefExoticComponent<SleepBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SleepBarV4.d.ts.map