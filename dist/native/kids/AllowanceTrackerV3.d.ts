import * as React from 'react';
import type { AllowanceTrackerProps } from './AllowanceTracker';
/** Same public contract as {@link AllowanceTracker} — a drop-in alternate design. */
export type AllowanceTrackerV3Props = AllowanceTrackerProps;
/**
 * AllowanceTracker, redesigned (v3): a **compact balance row**. A piggy glyph, a
 * tiny "Balance" caption over the figure, an optional goal-percent chip, and a
 * small Add/Spend pair — all on one dense line for embedding in a list. The
 * opposite of v2's tall hero card. Same props, same empty state.
 */
export declare function AllowanceTrackerV3({ balance, currency, goal, loading, emptyLabel, onAdd, onWithdraw, style, }: AllowanceTrackerV3Props): React.ReactElement;
//# sourceMappingURL=AllowanceTrackerV3.d.ts.map