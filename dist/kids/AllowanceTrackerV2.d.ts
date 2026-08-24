import * as React from 'react';
import type { AllowanceTrackerProps } from './AllowanceTracker';
/** Same public contract as {@link AllowanceTracker} — a drop-in alternate design. */
export type AllowanceTrackerV2Props = AllowanceTrackerProps;
/**
 * AllowanceTracker, redesigned (v2): a **wallet hero card**. A big centered
 * balance leads; the savings goal renders as a circular ring medallion showing
 * percent to target; earned and spent sit in two tinted stat pills below;
 * Add/Spend anchor the card. Elevated. Distinct from v1's stacked layout. Same
 * props, same empty state, token-only.
 */
export declare const AllowanceTrackerV2: React.ForwardRefExoticComponent<AllowanceTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AllowanceTrackerV2.d.ts.map