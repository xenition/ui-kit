import * as React from 'react';
import type { InvoiceLineProps } from './InvoiceLine';
export interface InvoiceLineV4Props extends InvoiceLineProps {
}
/**
 * **V4 invoice line** — same props as {@link InvoiceLine}.
 *
 * ## Four changes
 *
 * 1. **A fractional line no longer under-reports.** The total was
 *    `Math.trunc(unitPriceCents) * quantity`, which truncated the *price* and
 *    left the *quantity* alone — so `333 × 3.5` produced `1165.5`, a
 *    non-integer cents value `MoneyAmount` then floored to `$11.65`, while the
 *    breakdown line directly above it honestly printed "3.5 × $3.33". The line
 *    under-reported the invoice and disagreed with itself on screen.
 *    `lineTotal()` rounds once, at the end.
 * 2. **`emphasized` actually changes something.** The amount is already bold,
 *    so `emphasized ? { fontWeight: '700' }` re-applied the weight it had and
 *    the grand total looked exactly like the line above it. The difference is
 *    now carried by props both twins honour — the amount's `size` step and the
 *    description's weight — rather than by a style override that applies on
 *    native and is dropped by `cn` on web.
 * 3. **The line is one announced object** carrying the description, the
 *    breakdown and the total, instead of three loose nodes — and the quantity
 *    goes through `Intl` rather than being concatenated.
 * 4. **The breakdown is `mutedText`**, and the line clears 44 from the shared
 *    row family rather than from a bare `paddingVertical`.
 *
 * **Renders nothing without a `description`** (§4.5).
 */
export declare function InvoiceLineV4({ description, unitPriceCents, quantity, currency, amountCents, emphasized, appearance, style, }: InvoiceLineV4Props): React.ReactElement | null;
//# sourceMappingURL=InvoiceLineV4.d.ts.map