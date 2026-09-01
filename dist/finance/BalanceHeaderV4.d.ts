import * as React from 'react';
import type { BalanceHeaderProps } from './BalanceHeader';
export interface BalanceHeaderV4Props extends BalanceHeaderProps {
    /** BCP-47 locale for the balance, the change and the percentage. */
    locale?: string;
    /** What the loading region announces. Default `'Loading balance'`. */
    loadingLabel?: string;
}
/**
 * **V4 balance header** — the web twin of the native `BalanceHeaderV4`, same
 * props as {@link BalanceHeader} plus `locale` and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The sparkline is toned from the series it draws.** Its colour came from
 *    `changeCents`, which is optional — so a header given only `trend` fell to
 *    `up = (undefined ?? 0) >= 0`, and a balance collapsing across twelve
 *    points was drawn in `success`. The line now reads its own first and last
 *    values, and a flat series is neither.
 * 2. **A zero change is not a gain.** `>= 0` painted "+$0.00" green with an ▲
 *    beside it. `signParts()` gives zero its own neutral tone and no glyph.
 * 3. **The percentage goes through `Intl`.** It was built by string
 *    concatenation — unrounded and unclamped, so a `changePct` of
 *    `12.3456789` printed in full, and the decimal mark was hard-locked to `.`
 *    while the amount above it went through `Intl` and used the locale's.
 * 4. **Loading is announced and takes the shared placeholder.** The skeleton
 *    was `bg-border` — the *hairline* colour used as a surface — and nothing
 *    told a reader the figure was on its way.
 * 5. **The change is drawn in the contrast-corrected ink** (via
 *    {@link MoneyAmountV4}), where the base used `text-success` /
 *    `text-danger`, which are fills.
 */
export declare const BalanceHeaderV4: React.ForwardRefExoticComponent<BalanceHeaderV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BalanceHeaderV4.d.ts.map