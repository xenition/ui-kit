import * as React from 'react';
import type { QuestCardProps } from './QuestCard';
import type { QuestState } from './types';
export interface QuestCardV4Props extends QuestCardProps {
    /** Override the four lifecycle words. */
    stateLabels?: Partial<Record<QuestState, string>>;
    /** The word in front of the reward, in the card's name. Default `'Reward'`. */
    rewardLabel?: string;
}
/**
 * **V4 quest card** — same props as {@link QuestCard} plus `stateLabels` and
 * `rewardLabel`.
 *
 * ## Four changes
 *
 * 1. **A locked quest is locked in words, not in dimming.** The base drew it
 *    at `opacity-60`, which sits inside M3's *disabled* band (0.38) and is
 *    therefore how the whole kit says "this control will not respond" — so a
 *    locked quest and a broken one looked alike, and neither the padlock nor
 *    the badge could be trusted to be the reason. The card draws at full
 *    strength; the padlock and the `Locked` chip carry the state, and the only
 *    thing actually disabled is the claim button, which really is.
 * 2. **The bar and the caption cannot disagree.** `questParts()` clamps once
 *    for both, and floors the goal at 1 — the V2 and V3 lines handed
 *    `quest.goal` straight to `aria-valuemax` while drawing a separately
 *    clamped percentage, so out-of-range input announced one number and drew
 *    another, and `goal: 0` produced an invalid range.
 * 3. **The reward medal stops being announced as decoration, and the card has
 *    one name.** `<Icon glyph="🏅" aria-label="Reward" />` made the medal its
 *    own focus stop that said "Reward" and nothing else, while the reward
 *    itself sat in unlabelled text beside it. The glyph is hidden and the
 *    reward joins the card's `group` name behind `rewardLabel`.
 * 4. **The status words are `stateLabels`**, where four English strings used
 *    to be compiled into the component, and the progress readout is tabular so
 *    it stops reflowing as a quest ticks up.
 */
export declare const QuestCardV4: React.ForwardRefExoticComponent<QuestCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuestCardV4.d.ts.map