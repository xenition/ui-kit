import * as React from 'react';
import type { AllowanceTrackerProps } from './AllowanceTracker';
export interface AllowanceTrackerV4Props extends AllowanceTrackerProps {
    /** Render an amount. Default routes a 3-letter code through `commerce/money`. */
    formatMoney?: (amount: number, currency?: string) => string;
    /** BCP-47 locale for the default formatter. */
    locale?: string;
    /** The five hard-coded English strings, each replaceable. */
    labels?: {
        balance?: string;
        earned?: string;
        spent?: string;
        add?: string;
        spend?: string;
    };
}
/**
 * **V4 allowance tracker** — same props as {@link AllowanceTracker} plus
 * `formatMoney`, `locale` and `labels`.
 *
 * ## Six changes
 *
 * 1. **`balance={-5}` no longer renders `$-5`.** Money was built by string
 *    concatenation — the symbol, then `toLocaleString` — so the sign landed on
 *    the wrong side of it and `5.5` printed as `$5.5` rather than `$5.50`. It
 *    goes through `commerce/money`'s `formatMoney` when the caller gives a real
 *    ISO code, and through a signed, two-decimal fallback when `currency` is
 *    still the base's `'$'` symbol prefix. A caller can replace the whole thing.
 * 2. **The savings meter is drawn from the clamped ratio it already
 *    computed.** The base worked out `goalPct`, used it *only as a truthiness
 *    gate*, and then handed the raw numbers to the bar — so a balance of −20
 *    against a $100 goal announced `aria-valuenow="-20"` against
 *    `aria-valuemin="0"`. `meterParts` clamps the drawing and keeps the
 *    reading, and `aria-valuetext` says the real amount in words.
 * 3. **A negative balance reads 0% on both twins.** The web V2/V3 lines
 *    dropped the lower clamp their native twins kept and printed "-20% saved".
 * 4. **A goal of nought is "no goal", not an empty bar.** `target={0}` drew a
 *    track under a real balance with nothing to measure it against.
 * 5. **Earned and spent stopped being drawn as good and bad news.** They were
 *    `text-success` and `text-danger` — a child buying something with their own
 *    money is not a system error, and money in is not a status. The `+` and `−`
 *    signs and the two words carry the split, which is what a colour-blind
 *    reader was relying on anyway; the ink is the card's own.
 * 6. **Tokens.** `font-extrabold` is off the kit's weight scale, the skeleton
 *    was `bg-neutral-200` (a ramp step that inverts under `[data-theme=dark]`),
 *    and the card painted `surface` where a raised card wants `card`.
 */
export declare const AllowanceTrackerV4: React.ForwardRefExoticComponent<AllowanceTrackerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AllowanceTrackerV4.d.ts.map