import * as React from 'react';
import type { TipSelectorProps } from './TipSelector';
export interface TipSelectorV4Props extends TipSelectorProps {
    /** Copy on the leading "no tip" option. Default `'No tip'`. */
    noTipLabel?: string;
    /**
     * The option selected before anything is chosen, when the component runs
     * **uncontrolled** — that is, when `selectedPercent` is not passed at all.
     *
     * `null` (the default) is "no tip", which is exactly what the base rendered.
     * The difference is that the choice can now move.
     */
    defaultSelectedPercent?: number | null;
}
/**
 * **V4 tip selector** — the web twin of the native `TipSelectorV4`, same props
 * as {@link TipSelector} plus `noTipLabel` and `defaultSelectedPercent`.
 *
 * ## Five changes
 *
 * 1. **It works when you drop it in.** `selectedPercent` was optional,
 *    `selected` was recomputed from props on every render and the component
 *    held no state — so an uncontrolled `TipSelector` rendered "No tip" filled
 *    and `aria-checked` **forever**, and every tap emitted `onSelect` while
 *    nothing on screen moved. This is the third module in the kit with that
 *    exact shape, after `EmailThread` and `SwipeDeck`. Passing
 *    `selectedPercent` still hands control back to the caller; omitting it now
 *    means the control owns its own state, seeded from
 *    `defaultSelectedPercent`.
 * 2. **Options clear 44.** They were a 14px label in `py-sm` — roughly half a
 *    target, on a row of controls a thumb hits at checkout.
 * 3. **The computed amount is part of the option's name.** `role="radio"` is
 *    children-presentational, so the `$4.50` under "20%" was drawn and pruned.
 * 4. **Press is a state layer and focus is the `ring` token**, replacing
 *    `hover:bg-neutral-100` — a light-oriented ramp step — and
 *    `ring-primary-300`.
 * 5. **The unselected amount is inked with `mutedText`**, the
 *    contrast-corrected slot, rather than `muted`, which is a fill.
 */
export declare const TipSelectorV4: React.ForwardRefExoticComponent<TipSelectorV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TipSelectorV4.d.ts.map