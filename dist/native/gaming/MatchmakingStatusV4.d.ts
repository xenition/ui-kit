import * as React from 'react';
import { type MatchmakingPhase } from './types';
import type { MatchmakingStatusProps } from './MatchmakingStatus';
export interface MatchmakingStatusV4Props extends MatchmakingStatusProps {
    /** Headline per phase. Each key defaults to the base's own copy. */
    phaseLabels?: Partial<Record<MatchmakingPhase, string>>;
}
/**
 * **V4 matchmaking status** — same props as {@link MatchmakingStatus} plus
 * `phaseLabels`.
 *
 * ## Four changes
 *
 * 1. **Accept, Retry and Cancel can be reached.** The base declared the root
 *    `Card` `accessible accessibilityRole="summary"` so the phase, the timer
 *    and the slot count would read as one sentence — and `accessible` on a
 *    React Native container collapses everything beneath it into a single
 *    element. Beneath it were the component's only three controls. A VoiceOver
 *    user in a queue heard "Match found!, 10 / 10 players" and then could not
 *    swipe to Accept; `onAccept` is wired to nothing else, so there was no
 *    gesture in the component that accepted a match. The summary now sits on
 *    the text block, which contains no controls, and each button is its own
 *    focus stop.
 * 2. **A phase change is announced.** Nothing told the user the match had been
 *    found — they had to happen to be re-reading the panel at the moment it
 *    flipped. The summary is a live region: `assertive` on `found`, because
 *    the accept window expires while the user is not looking, and `polite`
 *    everywhere else. Announcing every phase at `assertive` is how a user
 *    learns to ignore the panel.
 * 3. **The slot readout goes through `slotParts()`**, so a `needed` of 0 is an
 *    unknown lobby rather than a full one, and the panel and a `LobbyRow` read
 *    the same numbers the same way.
 * 4. **Accept and Cancel carry the emphasis they mean, on both twins.** This
 *    twin drew Accept as `tone="success"` and Cancel as `tone="danger"` where
 *    web drew both plain, so the same two buttons were green and red here and
 *    neutral there. Neither is a status: accepting is the panel's *primary*
 *    action, not an announcement that something succeeded, and leaving a queue
 *    is a retreat, not an error. Accept is `primary` alone and Cancel is an
 *    outline. The spinner disc is hidden from the reader (it repeats the
 *    headline), and the press feedback comes from `ButtonV4`'s own state layer
 *    rather than an opacity.
 */
export declare function MatchmakingStatusV4({ phase, elapsedSeconds, found, needed, queueLabel, phaseLabels, onCancel, onAccept, onRetry, style, }: MatchmakingStatusV4Props): React.ReactElement;
//# sourceMappingURL=MatchmakingStatusV4.d.ts.map