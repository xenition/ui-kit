import * as React from 'react';
import { type PlanSelectorProps } from './PlanSelector';
/** Drop-in for {@link PlanSelector} — identical props, different design. */
export type PlanSelectorV3Props = PlanSelectorProps;
/**
 * Subscription tier picker — V3, the compact line. Dense selectable rows that
 * align a radio indicator, the name (+ its badge), a one-line feature summary
 * and the price into scannable columns; the selected row keeps the 2px ring and
 * a faint primary tint. This is the one selector whose `layout` defaults to
 * `'list'` — a dense sheet is what the V3 line is *for* — and passing
 * `layout="cards"` gives the §7 pair at compact sizing.
 *
 * Same `radiogroup` semantics and caller-formatted prices as
 * {@link PlanSelector}; empty list guarded. Token-pure.
 */
export declare function PlanSelectorV3({ plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, showBillingToggle, annualSavingsLabel, layout, style, }: PlanSelectorV3Props): React.ReactElement;
//# sourceMappingURL=PlanSelectorV3.d.ts.map