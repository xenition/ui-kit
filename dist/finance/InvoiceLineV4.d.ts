import * as React from 'react';
import type { InvoiceLineProps } from './InvoiceLine';
/** The V4 line takes exactly the base's props. */
export interface InvoiceLineV4Props extends InvoiceLineProps {
}
/**
 * **V4 invoice line** — the web twin of the native `InvoiceLineV4`, same props
 * as {@link InvoiceLine}.
 *
 * ## Three changes
 *
 * 1. **A fractional line stops under-reporting.** The total was
 *    `Math.trunc(unitPriceCents) * quantity` — the unit price truncated and
 *    the quantity left alone — so `333 × 3.5` produced `1165.5`, a non-integer
 *    cents value that `MoneyAmount` then floored to **$11.65**, one cent under,
 *    while the breakdown line directly above it honestly printed "3.5 ×
 *    $3.33". The line disagreed with itself on screen. `lineTotal()` rounds
 *    the product once, in cents.
 * 2. **`emphasized` changes something.** It passed `className="font-bold"` to
 *    a `MoneyAmount` that is already `font-bold`, and `cn()` is a plain joiner
 *    — so the grand-total row was indistinguishable from the lines above it
 *    except for one type step. The total row now takes a rule above it and a
 *    bolder description, which is what a total looks like.
 * 3. **The quantity goes through `Intl`, and the caption is legible.** `3.5`
 *    was interpolated straight into the string, so its decimal mark was hard
 *    locked to `.` while the price beside it used the locale's; and the
 *    caption was inked with `muted`, a ramp step with no contrast promise.
 */
export declare const InvoiceLineV4: React.ForwardRefExoticComponent<InvoiceLineV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InvoiceLineV4.d.ts.map