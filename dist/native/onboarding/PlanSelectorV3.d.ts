import * as React from 'react';
import type { PlanSelectorProps } from './PlanSelector';
/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV3Props = PlanSelectorProps;
/**
 * Subscription tier picker — V3. A stacked comparison layout: a monthly/annual
 * {@link Segmented} toggle over full-width rows that align name, feature summary
 * and price into columns for easy scanning, each row a `radio` with a circular
 * indicator. The selected row fills with a faint primary tint. Same
 * `radiogroup` semantics and caller-formatted prices as {@link PlanSelector};
 * empty list guarded. Token-pure.
 */
export declare function PlanSelectorV3({ plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, showBillingToggle, annualSavingsLabel, style, }: PlanSelectorV3Props): React.ReactElement;
//# sourceMappingURL=PlanSelectorV3.d.ts.map