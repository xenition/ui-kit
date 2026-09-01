import * as React from 'react';
import type { BalanceHeaderProps } from './BalanceHeader';
export interface BalanceHeaderV4Props extends BalanceHeaderProps {
    /** BCP-47 locale for the percentage. Defaults to the runtime's. */
    locale?: string;
    /** Announced while the figure is loading. Default `'Loading balance'`. */
    loadingLabel?: string;
}
/**
 * **V4 balance header** — same props as {@link BalanceHeader} plus `locale`
 * and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The sparkline is toned from the series it draws.** Its colour came from
 *    `changeCents`, which is optional — so a header given only a `trend` fell
 *    to the `up` branch and drew a *collapsing* balance in `success`. The line
 *    now reads its own first and last datum, and a flat series takes no status
 *    hue at all, because flat is not good news either.
 * 2. **A zero change is not a green gain.** `>= 0` painted "+$0.00" in
 *    `success` with an up arrow. `signParts()` gives zero its own branch.
 * 3. **The percentage goes through `Intl`.** It was built by string
 *    concatenation — unrounded and unclamped, so `12.3456789` printed in full,
 *    and its decimal mark was hard-locked to `.` while the amount beside it
 *    was localised.
 * 4. **The placeholder is the shared skeleton**, an opaque state mix, not
 *    `colors.border` — the hairline colour, which is a different thing on
 *    every ground and reads as a rule rather than as content arriving. The
 *    loading region is announced once, with wording the caller owns.
 * 5. **The block is one summary** carrying the label, the balance and the
 *    change, and the captions take `mutedText` rather than the promise-free
 *    `colors.muted`.
 */
export declare function BalanceHeaderV4({ label, balanceCents, currency, changeCents, changePct, trend, formatMoney: format, loading, locale, loadingLabel, appearance, style, }: BalanceHeaderV4Props): React.ReactElement;
//# sourceMappingURL=BalanceHeaderV4.d.ts.map