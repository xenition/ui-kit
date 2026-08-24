import * as React from 'react';
import type { GoalCardProps } from './GoalCard';
/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV2Props = GoalCardProps;
/**
 * GoalCard — **ring hero** design (v2). A large SVG progress ring showing the
 * completion percentage anchors the card, with the title, `value / target`
 * readout, and (when reached) a `success` "Goal met" badge alongside. Elevated
 * surface that lifts on hover. Guards `target <= 0`. Same props as
 * {@link GoalCardProps}; token-only colors.
 */
export declare const GoalCardV2: React.ForwardRefExoticComponent<GoalCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GoalCardV2.d.ts.map