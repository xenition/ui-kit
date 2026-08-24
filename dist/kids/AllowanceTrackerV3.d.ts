import * as React from 'react';
import type { AllowanceTrackerProps } from './AllowanceTracker';
/** Same public contract as {@link AllowanceTracker} — a drop-in alternate design. */
export type AllowanceTrackerV3Props = AllowanceTrackerProps;
/**
 * AllowanceTracker, redesigned (v3): a **compact balance row**. A piggy glyph, a
 * tiny "Balance" caption over the figure, an optional goal-percent chip, and a
 * small Add/Spend pair — all on one dense line for embedding in a list. The
 * opposite of v2's tall hero card. Same props, same empty state, token-only.
 */
export declare const AllowanceTrackerV3: React.ForwardRefExoticComponent<AllowanceTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AllowanceTrackerV3.d.ts.map