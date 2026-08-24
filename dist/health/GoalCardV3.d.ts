import * as React from 'react';
import type { GoalCardProps } from './GoalCard';
/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV3Props = GoalCardProps;
/**
 * GoalCard — **thin value-first line** design (v3). The current value leads
 * large with its unit, the title sits quietly above, a trailing `NN%` reads the
 * completion, and a thin token bar underlines it all. Borderless and compact —
 * dense enough for a stacked list. Switches to the `success` tone when the
 * target is met. Guards `target <= 0`. Same props as {@link GoalCardProps};
 * token-only colors.
 */
export declare const GoalCardV3: React.ForwardRefExoticComponent<GoalCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GoalCardV3.d.ts.map