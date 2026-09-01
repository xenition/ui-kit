import * as React from 'react';
import { type OnboardingAccentV4 } from './internal/flow-v4';
import { type PlanSelectorProps } from './PlanSelector';
/**
 * `'offer'` is the reference paywall's single-plan card: one price, its struck
 * compare-at, a savings pill and a per-unit caption. `'cards'` and `'list'`
 * behave exactly as the base's do.
 */
export type PlanSelectorV4Layout = 'cards' | 'list' | 'offer';
export interface PlanSelectorV4Props extends Omit<PlanSelectorProps, 'layout'> {
    /** Default `'cards'`, as the base. `'offer'` is new — see {@link PlanSelectorV4Layout}. */
    layout?: PlanSelectorV4Layout;
    /** Which brand slot selection answers in. Default `'primary'`. */
    accent?: OnboardingAccentV4;
    /** Copy for the empty state. Default `'No plans available.'`. */
    emptyMessage?: string;
}
/**
 * **V4 plan selector** — the base's props with `layout` widened to add
 * `'offer'`, plus `accent` and `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **`'offer'`.** The reference paywall does not offer a choice — it offers
 *    a *deal*, on one card, and the base could not draw it: `PlanTier` had one
 *    price per cadence, no compare-at, no savings pill, no per-unit caption.
 *    Those four fields are now on the type (all optional) and this is the
 *    layout that spends them. It renders the **selected** plan, or the first,
 *    and ignores the rest — a screen showing three offers is not an offer.
 * 2. **Cards sit on `card`, not `surface`.** Every card in the base module
 *    painted the same colour as the page behind it, so the border was doing
 *    all the work and a plan pair on a dark page read as one flat sheet.
 * 3. **A fabricated discount is refused.** A compare-at equal to the price is
 *    not drawn (see {@link compareAtFor}).
 * 4. **Both prices are announced.** A struck price carries `Was …`, so a
 *    screen reader handed two numbers knows which is which.
 * 5. **Press is a state layer.** M3's layer over the card's own fill, not
 *    `opacity` on its content — dimming content is what 0.38 means, and it
 *    made a pressed card look disabled.
 *
 * The empty state is a message, not a blank box, and its copy is a prop.
 */
export declare function PlanSelectorV4({ plans, selectedPlanId, onSelectPlan, billingPeriod, onBillingPeriodChange, showBillingToggle, annualSavingsLabel, layout, accent, emptyMessage, style, }: PlanSelectorV4Props): React.ReactElement;
//# sourceMappingURL=PlanSelectorV4.d.ts.map