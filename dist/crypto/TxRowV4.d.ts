import * as React from 'react';
import type { TxRowProps } from './TxRow';
export interface TxRowV4Props extends TxRowProps {
    /**
     * The unit printed when a row has no `symbol`. Default `''`, which is what
     * the base did — a send rendered as a bare "−0.5" with nothing saying of
     * what. Pass the chain's native ticker and every row carries a unit.
     */
    fallbackSymbol?: string;
}
/**
 * **V4 transaction row** — the web twin of the native `TxRowV4`, same props as
 * {@link TxRow} plus `fallbackSymbol`.
 *
 * ## Four changes
 *
 * 1. **The row announces its amount.** `aria-label="Transaction 0x12…cdef,
 *    Confirmed"` sat on the interactive root and replaced the subtree, so the
 *    amount, the fiat value and the timestamp — everything a user scans a
 *    history for — were never spoken.
 * 2. **An amount always carries a unit.** `symbol` is optional and there was
 *    no fallback, so a send rendered as "−0.5" of an unnamed thing. See
 *    `fallbackSymbol`.
 * 3. **The status pill is inked, not filled.** `text-warn` / `text-success` /
 *    `text-danger` are fill slots; the pill is now the module's one badge
 *    shape, which native and web finally agree on.
 * 4. **A press is a state layer on the shared row body**, and the row is a
 *    real `<button>` rather than a `div` carrying `role="button"`, `tabIndex`
 *    and a hand-written Enter/Space handler — three approximations of what a
 *    button already does.
 */
export declare const TxRowV4: React.ForwardRefExoticComponent<TxRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TxRowV4.d.ts.map