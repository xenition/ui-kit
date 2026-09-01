import * as React from 'react';
import type { TxRowProps } from './TxRow';
export interface TxRowV4Props extends TxRowProps {
    /**
     * Ticker used when the row has no `symbol` of its own.
     *
     * Defaults to `''`, which is the base's behaviour: a send with no symbol
     * renders as a bare `−0.5`, a number whose denomination the reader has to
     * guess. A feed that knows its chain's native token should pass it.
     */
    fallbackSymbol?: string;
}
/**
 * **V4 transaction row** — same props as {@link TxRow} plus `fallbackSymbol`.
 *
 * ## Four changes
 *
 * 1. **The row announces the transaction.** `"Transaction 0x12…cdef,
 *    Confirmed"` was the whole name and it replaced the subtree, so the amount
 *    — the thing a user is scanning a history for — was never spoken. Hash,
 *    status, direction, amount, fiat value and time are one line now.
 * 2. **The amount can carry a unit.** `symbol` is optional and the base had no
 *    fallback, so a send rendered as `−0.5`. See
 *    {@link TxRowV4Props.fallbackSymbol}.
 * 3. **Direction is a word, not a hue.** Send read `danger` and receive read
 *    `success` with nothing but a `+`/`−` beside them; the announced name now
 *    says "Sent" or "Received", and the amount takes the readable `*Text` ink
 *    rather than the raw fill slot.
 * 4. **Press is a state layer** on the shared row recipe, the status chip is
 *    the module's one badge shape, and its glyph — decoration beside a word —
 *    is out of the reader's way.
 */
export declare function TxRowV4({ hash, status, direction, amount, symbol, fallbackSymbol, decimals, valueCents, currency, timestamp, hashLead, hashTail, onPress, style, }: TxRowV4Props): React.ReactElement | null;
//# sourceMappingURL=TxRowV4.d.ts.map