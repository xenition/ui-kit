import * as React from 'react';
import type { PortfolioSummaryProps } from './PortfolioSummary';
/** Same public contract as {@link PortfolioSummary} — a drop-in alternate design. */
export type PortfolioSummaryV3Props = PortfolioSummaryProps;
/**
 * PortfolioSummary, redesigned (v3): a **minimal, total-first** block. The total
 * leads big through {@link MoneyAmount} (integer cents — no drift) with an inline
 * ▲/▼ change, then a single compact **stacked allocation bar** replaces the
 * donut, with a small dot legend beneath. No card, no chart deps — a lean
 * header. Distinct at a glance from v1's donut card and v2's hero band. Same
 * props; an empty or all-zero allocation simply hides the bar.
 */
export declare function PortfolioSummaryV3({ totalCents, currency, changeCents, changePct, allocations, loading, style, }: PortfolioSummaryV3Props): React.ReactElement;
//# sourceMappingURL=PortfolioSummaryV3.d.ts.map