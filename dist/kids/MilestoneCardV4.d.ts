import * as React from 'react';
import type { MilestoneCardProps } from './MilestoneCard';
/**
 * Where a milestone stands.
 *
 * The base carried `achieved?: boolean`, which has no way to say the third
 * thing a parent actually wants said — that a milestone is *late* — so a
 * delayed one was indistinguishable from one that is simply still ahead.
 * Declared identically on both twins.
 */
export type MilestoneStatus = 'upcoming' | 'achieved' | 'delayed';
export interface MilestoneCardV4Props extends MilestoneCardProps {
    /** Where the milestone stands. Defaults to `achieved ? 'achieved' : 'upcoming'`. */
    status?: MilestoneStatus;
    /** A neutral note — what a delay is about, in the parent's own words. */
    note?: string;
    /** Replace the three status words. They were hard-coded English. */
    statusLabels?: Partial<Record<MilestoneStatus, string>>;
}
/**
 * **V4 milestone card** — same props as {@link MilestoneCard} plus `status`,
 * `note` and `statusLabels`.
 *
 * ## Six changes
 *
 * 1. **A milestone can say it is late without saying it is wrong.** `achieved`
 *    was a boolean, so "still ahead" and "overdue" were the same card. `status`
 *    adds `delayed`, and it is drawn in a **neutral** chip with a word and a
 *    `note` — never `warn`, never `danger`. A developmental band is a range;
 *    the kit's status colours mean the system has failed, and nothing about a
 *    child's pace belongs in that vocabulary.
 * 2. **The card's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-activatable card, which browsers ignore — and it
 *    dropped the date and the age band entirely. The full name now belongs to a
 *    real `<button>`.
 * 3. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does, and it swallowed the status
 *    chip into one stop.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 5. **Badges converge on `soft`**, matching every native call site; web took
 *    the `solid` default, so one call drew two visual weights.
 * 6. **Tokens.** `hover:bg-neutral-50` is a light-scheme ramp step that paints
 *    a near-white slab on a dark page, press is the M3 state layer, the
 *    skeleton is opaque and card-relative rather than `bg-neutral-200`, and the
 *    card sits on `card`/`on-card` so it still reads as raised in dark mode.
 */
export declare const MilestoneCardV4: React.ForwardRefExoticComponent<MilestoneCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MilestoneCardV4.d.ts.map