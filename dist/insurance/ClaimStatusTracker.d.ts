import * as React from 'react';
import { type ClaimStatus } from './internal/status';
export type { ClaimStatus };
export interface ClaimStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Current claim lifecycle status. */
    status: ClaimStatus;
    /** Localized last-updated string (already formatted by the caller). */
    updated?: string;
}
/**
 * A stage tracker for a single claim. The happy path (Filed → In review →
 * Approved → Paid) reuses the `Steps` primitive, with `current` derived from the
 * status descriptor (`paid` marks every stage done). A `denied` claim branches
 * off the review stage and renders a distinct `danger`-toned banner conveyed by
 * **glyph + text + color** — never color alone. Token-bound throughout. Web
 * parity of the native `ClaimStatusTracker`.
 */
export declare const ClaimStatusTracker: React.ForwardRefExoticComponent<ClaimStatusTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClaimStatusTracker.d.ts.map