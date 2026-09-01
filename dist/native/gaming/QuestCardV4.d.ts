import * as React from 'react';
import type { QuestState } from './types';
import type { QuestCardProps } from './QuestCard';
export interface QuestCardV4Props extends QuestCardProps {
    /** Status wording per state. Each key defaults to the base's own copy. */
    stateLabels?: Partial<Record<QuestState, string>>;
    /** What the reward line is called to a screen reader. Default `'Reward'`. */
    rewardLabel?: string;
}
/**
 * **V4 quest card** — same props as {@link QuestCard} plus `stateLabels` and
 * `rewardLabel`.
 *
 * ## Six changes
 *
 * 1. **The step bar cannot disagree with itself.** The base clamped the drawn
 *    fill and handed `Progress` a raw `goal`, so out-of-range input drew one
 *    fraction and announced another, and a `goal` of 0 produced an invalid
 *    range. `questParts()` reads both from one place.
 * 2. **The bar is a named `progressbar` outside the card's spoken name**, so
 *    the reader can reach the value at all — the base's meter carried no label
 *    and sat under a plain caption.
 * 3. **A locked quest is not dimmed to 0.6.** That is inside M3's disabled
 *    band, so a quest the user simply has not unlocked yet looked like a
 *    broken control, and the whole card — title, objective, reward — lost
 *    contrast with it. The padlock and the "Locked" badge carry the state, in
 *    words, at full strength.
 * 4. **The reward medal and the status badge stop being announced
 *    decorations.** The medal was a focus stop that said "Reward" and nothing
 *    else; the reward, the state and the objective are now part of the card's
 *    one name, and the glyphs are drawn.
 * 5. **A reward is identity, not a warning.** The medal was `warn` and the
 *    `In progress` badge was `primary`; every user-visible string in the card
 *    is now a prop.
 * 6. **Claim drops `tone="success"`.** The native base drew it green and the
 *    web base drew it plain — the third instance of this module's
 *    emphasis drift, beside `MatchmakingStatus`'s Accept and Cancel. Claiming
 *    is the card's *primary* action, not an announcement that something
 *    succeeded, so it is `primary` alone on both twins. The progress fill
 *    keeps `success` at completion: that is a meter reporting a state, not a
 *    control advertising one.
 */
export declare function QuestCardV4({ quest, state, claiming, stateLabels, rewardLabel, onClaim, style, }: QuestCardV4Props): React.ReactElement;
//# sourceMappingURL=QuestCardV4.d.ts.map