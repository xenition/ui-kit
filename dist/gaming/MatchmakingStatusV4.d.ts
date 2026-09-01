import * as React from 'react';
import type { MatchmakingStatusProps } from './MatchmakingStatus';
import { type MatchmakingPhase } from './types';
export interface MatchmakingStatusV4Props extends MatchmakingStatusProps {
    /** Override the four phase headlines. */
    phaseLabels?: Partial<Record<MatchmakingPhase, string>>;
}
/**
 * **V4 matchmaking status** — same props as {@link MatchmakingStatus} plus
 * `phaseLabels`.
 *
 * ## Four changes
 *
 * 1. **The panel has a name again.** The base hung the combined status string
 *    on `Card`, which renders a bare `<div>` — and ARIA forbids naming a
 *    generic element, so the browser threw the label away and a screen-reader
 *    user in a queue heard nothing at all. The root is a `group` now, a role
 *    that both takes a name and leaves its subtree reachable, so Accept, Retry
 *    and Cancel are still their own stops. (The native twin fails the same
 *    moment from the other side: `accessible` on the root collapses the panel
 *    and takes the only three controls with it.)
 * 2. **A phase change is announced.** Nothing on either twin told anyone the
 *    match had been found; the user had to happen to be re-reading the panel
 *    at the moment it flipped, and the accept window expired while they
 *    swiped. The headline is a live region — **assertive for `found` only**,
 *    because that is the one phase with a window that closes unseen, and
 *    polite for the other three. The elapsed timer stays outside it: a region
 *    that re-announces every second is a region people turn off.
 * 3. **Cancel is the same weight on both twins.** It was a solid `danger`
 *    button here and an outlined one on native, and neither is right:
 *    abandoning a queue is reversible and undoes nothing, so spending the
 *    error colour on it leaves nothing left to say when matchmaking actually
 *    fails. Both twins draw it as the low-emphasis outline.
 * 4. **Press is a state layer and every control clears 44**, both of which
 *    `ButtonV4` now owns, in place of the base's `hover:opacity` dimming —
 *    which is the signal M3 reserves for *disabled*.
 */
export declare const MatchmakingStatusV4: React.ForwardRefExoticComponent<MatchmakingStatusV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchmakingStatusV4.d.ts.map