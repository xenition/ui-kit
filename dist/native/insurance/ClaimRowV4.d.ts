import * as React from 'react';
import type { ClaimRowProps } from './ClaimRow';
/**
 * No new props: the base already accepts `formatMoney`, which is the only one
 * the shared prop table asks for here. Everything this file fixes is
 * structural, which is why the interface is empty and stays that way — a row
 * that announces no money is not missing a prop, it is built wrong.
 */
export interface ClaimRowV4Props extends ClaimRowProps {
}
/**
 * **V4 claim row** — the same props as {@link ClaimRow}, `formatMoney`
 * included; every fix here is structural.
 *
 * ## Six changes
 *
 * 1. **The row announces its amount.** The base named the `Pressable`
 *    `"Claim CLM-20481, Windshield replacement, Approved"` and then drew the
 *    settled amount and the date as *children of that same Pressable*. A
 *    `Pressable` is `accessible` by default and flattens its whole subtree into
 *    one leaf wearing that name, so a screen-reader user working down a claims
 *    list heard a status for every claim and **never once heard how much money
 *    was involved** — which is the only reason anybody opens the screen. The
 *    amount and the date are folded into the name now, joined with commas.
 * 2. **A negative amount is shown, not swallowed.** `Math.max(0, …)` clamped
 *    every amount to zero, so `amountCents={-1}` — a reversal, a sign error
 *    upstream, a clawback — printed `$0.00`, indistinguishable from a real
 *    zero. It now prints what it was given, minus sign and all, because a
 *    number the caller cannot see is a number nobody can correct.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` faded the row's
 *    own content into M3's 0.38 disabled band, so a pressed row and a dead row
 *    looked the same. The row tints its container instead and leaves the ink at
 *    full strength.
 * 4. **It is a row from the shared row family.** `ClaimRow`, `BeneficiaryRow`
 *    and `PolicyDocumentRow` were three heights, three leading slots and three
 *    press treatments in one module; all three now come from
 *    `dashboard/internal/row-v4`, so a claims list scrolled into a documents
 *    list reads as one product.
 * 5. **The status disc is decorative.** It was an `Icon` carrying its own
 *    `accessibilityLabel`, so the status was announced twice on a static row
 *    and read out of a flattened subtree on a pressable one. The disc is hidden
 *    and the word beside it does the talking.
 * 6. **The disc's tint is opaque.** `withAlpha(tint, 0.14)` is a translucent
 *    wash that changes colour with whatever is behind the row; the glyph's
 *    contrast against it was a different number on a card than on the page.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function ClaimRowV4({ claimNumber, title, status, amountCents, currency, date, formatMoney: format, onPress, style, }: ClaimRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ClaimRowV4.d.ts.map