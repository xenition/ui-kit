import * as React from 'react';
import type { GoalCardProps } from './GoalCard';
/** Drop-in for {@link GoalCardProps} — same props, a different design. */
export type GoalCardV3Props = GoalCardProps;
/**
 * GoalCard — **thin value-first line** design (v3). The current value leads
 * large with its unit, the title sits quietly above, a trailing `NN%` reads the
 * completion, and a thin {@link MiniBar} underlines it all. Switches to the
 * `success` tone when the target is met. Compact enough for a stacked list.
 * Guards `target <= 0`. Same props as {@link GoalCardProps}; token-only colors.
 */
export declare function GoalCardV3({ title, value, target, unit, color, icon, onPress, appearance, style, }: GoalCardV3Props): React.ReactElement;
//# sourceMappingURL=GoalCardV3.d.ts.map