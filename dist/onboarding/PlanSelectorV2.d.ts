import * as React from 'react';
import type { PlanSelectorProps } from './PlanSelector';
/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV2Props = PlanSelectorProps;
/**
 * PlanSelector, redesigned (v2): a **stacked plan-card picker**. A pill billing
 * toggle leads; each tier is a full bordered card — name + badge ribbon, a large
 * price with caption, and a checked feature list — and the selected card fills
 * with a primary ring + tint. Bolder than v1's compact list. Same props,
 * token-only.
 */
export declare const PlanSelectorV2: React.ForwardRefExoticComponent<PlanSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlanSelectorV2.d.ts.map