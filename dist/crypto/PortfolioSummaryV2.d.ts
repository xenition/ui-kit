import * as React from 'react';
import type { PortfolioSummaryProps } from './PortfolioSummary';
/** Same public contract as {@link PortfolioSummary} — a drop-in alternate design. */
export type PortfolioSummaryV2Props = PortfolioSummaryProps;
/**
 * PortfolioSummary, redesigned (v2): a **big total hero over a donut**. The total
 * sits in a filled `primary` hero band (rendered in the guaranteed `on-primary`
 * slot via `formatMoney`, integer cents — no drift) with a translucent on-fill
 * change chip and a soft sheen disc; below, a reused {@link DonutChart} pairs with
 * a custom legend that spells out each asset's share % (guarded against a zero
 * total). Distinct at a glance from the base's plain total + built-in legend.
 * Same props.
 */
export declare const PortfolioSummaryV2: React.ForwardRefExoticComponent<PortfolioSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PortfolioSummaryV2.d.ts.map