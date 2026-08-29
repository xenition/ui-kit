import * as React from 'react';
import { type PlanSelectorProps } from './PlanSelector';
/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV2Props = PlanSelectorProps;
/**
 * Subscription tier picker — V2, the editorial line. The §7 card pair, lifted:
 * two-up and equal width like the base selector, but shadowed and press-scaled,
 * with the selected card taking the `primary` fill, the 2px ring and the
 * stronger elevation. A lone plan takes the full width rather than half a grid.
 *
 * `layout="list"` still stacks the same cards for a dense context. Keeps the
 * monthly/annual toggle and the `radiogroup`/`radio` semantics; prices stay
 * caller-formatted. Guards an empty list. Token-pure.
 */
export declare function PlanSelectorV2({ plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, showBillingToggle, annualSavingsLabel, layout, style, }: PlanSelectorV2Props): React.ReactElement;
//# sourceMappingURL=PlanSelectorV2.d.ts.map