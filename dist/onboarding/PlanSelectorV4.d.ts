import * as React from 'react';
import { type OnboardingAccentV4 } from './internal/flow-v4';
import type { PlanSelectorProps } from './PlanSelector';
/**
 * `'offer'` is the reference paywall's single-plan card: one price, its struck
 * compare-at, a savings pill and a per-unit caption. `'cards'` and `'list'`
 * behave exactly as the base's do.
 */
export type PlanSelectorV4Layout = 'cards' | 'list' | 'offer';
export interface PlanSelectorV4Props extends Omit<PlanSelectorProps, 'layout'> {
    /** Default `'cards'`, as the base. `'offer'` is new. */
    layout?: PlanSelectorV4Layout;
    /** Which brand slot selection answers in. Default `'primary'`. */
    accent?: OnboardingAccentV4;
    /** Copy for the empty state. Default `'No plans available.'`. */
    emptyMessage?: string;
}
/**
 * **V4 plan selector** — the web twin of the native `PlanSelectorV4`, the
 * base's props with `layout` widened to add `'offer'`, plus `accent` and
 * `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **`'offer'`.** The reference paywall does not offer a choice — it offers
 *    a *deal*, on one card, and the base could not draw it: `PlanTier` had one
 *    price per cadence, no compare-at, no savings pill, no per-unit caption.
 *    Those four fields are now on the type (all optional). It renders the
 *    **selected** plan, or the first, and ignores the rest.
 * 2. **Cards sit on `card`, not `surface`.**
 * 3. **A fabricated discount is refused** (see {@link compareAtFor}).
 * 4. **Both prices are announced** (see {@link ComparePrice}).
 * 5. **Hover and press are the shared chrome state layers**, not per-card
 *    opacity.
 *
 * The empty state is a message, not a blank box, and its copy is a prop.
 */
export declare const PlanSelectorV4: React.ForwardRefExoticComponent<PlanSelectorV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlanSelectorV4.d.ts.map