import * as React from 'react';
import type { TokenRowProps } from './TokenRow';
export interface TokenRowV4Props extends TokenRowProps {
    /** Wording for the movement. Defaults `up` / `down` / `unchanged`. */
    directionLabels?: {
        up?: string;
        down?: string;
        flat?: string;
    };
}
/**
 * **V4 holding row** — same props as {@link TokenRow} plus `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A loss is announced as a loss.** The base built the change's spoken
 *    label as `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``
 *    — and `formatPct` re-applies the sign, so a fall announced as **"down
 *    +3.20%"**. `>= 0` also sent a flat `0` down the "up" branch while the
 *    glyph drawn beside it was `•`.
 * 2. **The row announces the holding.** `"ETH holding"` was the whole name,
 *    and it replaced everything under it — so the quantity, the fiat value and
 *    the change, which is all the row is for, were never spoken.
 * 3. **`iconColor` is drawn on a ground it is paired with.** The base painted
 *    `colors[iconColor]` — `on-primary` by default — onto a neutral ramp step
 *    and hoped. The disc now composites its own ground from that colour and
 *    re-measures the mark against it, so a token's accent is legible whatever
 *    the seed. The mark also stops being a silent `slice(0, 3)`: the full
 *    ticker is set in the disc and ellipsised if it does not fit, and the
 *    row's title carries it whole.
 * 4. **The change reads as text**, not as `colors[changeToneKey(pct)]` — a
 *    fill slot with no contrast promise — and press is a state layer on the
 *    shared row recipe rather than `opacity: 0.7`.
 */
export declare function TokenRowV4({ symbol, name, amount, decimals, valueCents, currency, changePct, icon, iconColor, directionLabels, onPress, style, }: TokenRowV4Props): React.ReactElement | null;
//# sourceMappingURL=TokenRowV4.d.ts.map