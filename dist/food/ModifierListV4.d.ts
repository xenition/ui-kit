import * as React from 'react';
import type { ModifierListProps } from './ModifierList';
export interface ModifierListV4Props extends ModifierListProps {
    /** The word marking the group required. Default `'Required'`. */
    requiredLabel?: string;
}
/**
 * **V4 modifier list** — the web twin of the native `ModifierListV4`, same
 * props as {@link ModifierList} plus `requiredLabel`.
 *
 * ## Five changes
 *
 * 1. **A paid extra is no longer added in silence.** `role="checkbox"` and
 *    `role="radio"` are children-presentational exactly as `role="button"` is,
 *    and the option's `aria-label` was the bare label — so the `+$1.50` beside
 *    "Extra cheese" was rendered, was correct, and was pruned. The delta now
 *    goes into the name through `spokenLine`, which is the difference between
 *    knowing what an order will cost and finding out at checkout.
 * 2. **`required` reaches assistive tech.** It was a red word next to the
 *    heading and nothing more; it now joins the group's own name and sets
 *    `aria-required` on the radio group.
 * 3. **Rows clear 44.** They were about 38px — a control whose entire job is
 *    to be tapped, under the HIG floor.
 * 4. **A disabled option is disabled, and does not brighten under the
 *    pointer.** `opacity-50` is not a scale step; M3 disables content at 0.38,
 *    and `V4_DISABLED_CLASS` is where that number lives.
 * 5. **Press is a state layer and focus is the `ring` token.**
 *    `hover:bg-neutral-100` is a light-oriented ramp step that paints a
 *    near-white slab across a dark sheet, and `ring-primary-300` is a ramp
 *    step where the preset ships a `ring` colour corrected against the page.
 */
export declare const ModifierListV4: React.ForwardRefExoticComponent<ModifierListV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ModifierListV4.d.ts.map