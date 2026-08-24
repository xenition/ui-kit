import * as React from 'react';
import type { PlanSelectorProps } from './PlanSelector';
/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV2Props = PlanSelectorProps;
/**
 * Subscription tier picker — V2. The tiers sit side-by-side as elevated,
 * shadowed cards (rather than a stacked list), with the "popular"/highlighted
 * tier lifted by a stronger shadow, an accent border and its ribbon badge. Keeps
 * the monthly/annual {@link Segmented} toggle and the `radiogroup`/`radio`
 * semantics; prices stay caller-formatted. Guards an empty list. Token-pure.
 */
export declare function PlanSelectorV2({ plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, showBillingToggle, annualSavingsLabel, style, }: PlanSelectorV2Props): React.ReactElement;
//# sourceMappingURL=PlanSelectorV2.d.ts.map