import * as React from 'react';
import type { IconName } from '../primitives/icon-names';
import type { ShippingOptionProps } from './ShippingOption';
export interface ShippingOptionV4Props extends ShippingOptionProps {
    /**
     * A name from the kit's icon set for the leading slot, drawn as §4.7's
     * tinted circular badge.
     *
     * The base's `glyph` takes any string, which is how a kit ends up with 🚚 on
     * one screen and 📦 on the next for the same idea (`icon-names.ts` opens with
     * that exact complaint). `icon` is the typed form — a typo is a compile
     * error — and it wins over `glyph`, which stays for the one-off the named set
     * has no name for.
     */
    icon?: IconName;
    /**
     * What a `priceCents` of `0` says. Default `'Free'`.
     *
     * The word was hard-coded in both twins, so a localized storefront had a
     * shipping list reading "Standard · Free" in the middle of German copy. It is
     * the one string in the component `formatMoney` cannot localize, because it
     * is not a number.
     */
    freeLabel?: string;
}
/**
 * **V4 shipping option** — a selectable delivery method, on the row metric, and
 * the component where HIG's option-list rule lands.
 *
 * ## Selection is a highlight *and* a mark
 *
 * HIG draws a line between two kinds of list. A **navigation** list keeps the
 * chosen row persistently highlighted, because the highlight is saying "this is
 * where you are". An **option** list highlights briefly and then confirms with
 * a **checkmark**, because the mark is saying "this is what you chose". A
 * shipping list is an option list, and the base gave it neither: it drew a
 * radio dot and tinted the border, so the only durable signal that Express was
 * selected was a colour — which brief rule 6 and §46 both rule out, and which a
 * colour-blind buyer choosing how to spend money cannot see at all.
 *
 * V4 ships both halves. The row wears the family's `selected` pair (the
 * compiler's slot for a chosen row, with its guaranteed `onSelected` ink) and a
 * `check` `IconV4` at the trailing edge, after the price. `role="radio"` and
 * `aria-checked` are unchanged — the semantics were never the problem.
 *
 * The radio dot goes. Two marks for one fact is one more than the row needs,
 * and the checkmark is the one HIG names.
 *
 * ## Everything else
 *
 * 1. **The row metric**, from `dashboard/internal/row-v4.ts` — 56 with a label
 *    alone, 72 with an `eta`, `md` gutters, a 44 leading slot. The base used
 *    `px-lg py-md`, a gutter of its own that agreed with nothing.
 * 2. **Tabular money** (rule 2) through `formatMoney` (rule 1), so a stack of
 *    shipping prices has an edge to compare down. `Free` is not an amount and
 *    is not run through the formatter.
 * 3. **The state layer, and only the state layer.** `opacity-50` for disabled
 *    becomes `V4_DISABLED_CLASS` (M3's 0.38 for disabled *content*); press and
 *    hover are the shared layer over the pair the row actually wears, so a
 *    pressed row is tinted rather than faded — a faded row reads as dead.
 * 4. **The leading glyph is an `IconV4` badge**, not a bare `Icon` sitting
 *    between the radio and the text.
 *
 * Renders `null` for an option with no name (§4.5).
 */
export declare const ShippingOptionV4: React.ForwardRefExoticComponent<ShippingOptionV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ShippingOptionV4.d.ts.map