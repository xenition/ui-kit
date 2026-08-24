import * as React from 'react';
import type { GoalCardProps } from './GoalCard';
/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV2Props = GoalCardProps;
/**
 * GoalCard — **ring hero** design (v2). A large {@link ProgressRing} showing the
 * completion percentage anchors the card, with the title, `value / target`
 * readout, and (when reached) a `success` "Goal met" badge alongside. The ring
 * and readout switch to the `success` tone on completion. Guards `target <= 0`.
 * Same props as {@link GoalCardProps}; token-only colors.
 */
export declare function GoalCardV2({ title, value, target, unit, color, icon, onPress, appearance, style, }: GoalCardV2Props): React.ReactElement;
//# sourceMappingURL=GoalCardV2.d.ts.map