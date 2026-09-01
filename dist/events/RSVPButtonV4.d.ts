import * as React from 'react';
import type { RSVPButtonProps, RSVPStatus } from './RSVPButton';
export interface RSVPButtonV4Props extends RSVPButtonProps {
    /** The word on each segment. Defaults to `Going` / `Maybe` / `Can't go`. */
    optionLabels?: Partial<Record<RSVPStatus, string>>;
}
/**
 * **V4 RSVP control** — the web twin of the native `RSVPButtonV4`, same props
 * as {@link RSVPButton} plus `optionLabels`.
 *
 * ## Four changes
 *
 * 1. **An RSVP answer is a choice, not a status.** The base painted
 *    `going → success`, `maybe → warn`, `declined → danger` — the same three
 *    slots this module spends on a cancelled session and a sold-out tier. A
 *    guest saying they cannot come has not made an error, and "Maybe" is not a
 *    warning. `RSVP_TONE` keeps `going` on the brand and leaves the other two
 *    neutral; a chosen neutral segment wears `selected`/`on-selected`, the
 *    compiler's own pair for a chosen container, so the label keeps a contrast
 *    promise instead of borrowing `on-surface` onto an unchecked tint.
 * 2. **The radiogroup has the roving focus a radiogroup owes.** Three tab stops
 *    for one answer is not a radiogroup; one stop plus arrows is, and the
 *    arrows change the answer the way a real radio group does.
 * 3. **Every segment clears 44, at both sizes.** `sm` was about 26 points tall
 *    — under the floor at the moment a guest is answering with one thumb.
 * 4. **Press is a state layer and disabled is 0.38.** `hover:bg-neutral-100` is
 *    a ramp step that mirrors under `[data-theme="dark"]`, and `opacity-50` is
 *    a rounder number than the band the theme actually ships.
 */
export declare const RSVPButtonV4: React.ForwardRefExoticComponent<RSVPButtonV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RSVPButtonV4.d.ts.map