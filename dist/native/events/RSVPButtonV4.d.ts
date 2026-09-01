import * as React from 'react';
import type { RSVPButtonProps, RSVPStatus } from './RSVPButton';
export interface RSVPButtonV4Props extends RSVPButtonProps {
    /** The word each answer is shown and announced with. Default `Going` / `Maybe` / `Can't go`. */
    optionLabels?: Partial<Record<RSVPStatus, string>>;
}
/**
 * **V4 RSVP control** — same props as {@link RSVPButton} plus `optionLabels`.
 *
 * ## Four changes
 *
 * 1. **An RSVP answer is a choice, not a status.** The base painted
 *    `going → success`, `maybe → warn`, `declined → danger` — the same three
 *    slots this module spends on a cancelled session and a sold-out tier.
 *    Telling a host you cannot make it is not an error and "Maybe" is not a
 *    warning. `RSVP_TONE` gives `going` the brand's `primary` and leaves the
 *    other two neutral.
 * 2. **Every segment clears 44 at both sizes.** At `sm` the segments were
 *    about 28px tall — three of them side by side, on the one control an
 *    invitee is meant to answer with a thumb.
 * 3. **A press is a state layer**, not a hand-picked step out of the neutral
 *    ramp, which is light-oriented in both schemes and so lit the pressed
 *    segment up white in dark mode.
 * 4. **Disabled is M3's 0.38**, not the 0.5 the base guessed at.
 */
export declare function RSVPButtonV4({ value, onChange, optionLabels, size, disabled, style, }: RSVPButtonV4Props): React.ReactElement;
//# sourceMappingURL=RSVPButtonV4.d.ts.map