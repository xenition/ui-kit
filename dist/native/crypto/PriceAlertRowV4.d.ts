import * as React from 'react';
import type { PriceAlertRowProps } from './PriceAlertRow';
export interface PriceAlertRowV4Props extends PriceAlertRowProps {
    /** Wording for the trigger condition. Defaults `Above` / `Below`. */
    directionLabels?: {
        above?: string;
        below?: string;
    };
}
/**
 * **V4 price alert** — same props as {@link PriceAlertRow} plus
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A disarmed alert is not drawn as an unavailable one.** The base put the
 *    whole row — the Switch included — at `opacity: 0.6`, which sits inside
 *    M3's disabled band: a live, toggleable control rendered as dead. The
 *    Switch already says on or off, in words, to everyone.
 * 2. **Direction is identity, not status.** See {@link CONDITION_V4}.
 * 3. **The Switch clears 44.** It carried `hitSlop` and a 24pt track; it now
 *    sits in a real target.
 * 4. **The row is two stops, not five.** The symbol, the condition, the target
 *    and the current price are one spoken line; the ▲/▼ mark is decoration
 *    beside a word and is hidden from the reader.
 */
export declare function PriceAlertRowV4({ symbol, condition, targetPrice, currentPrice, currencySymbol, decimals, enabled, directionLabels, onToggle, style, }: PriceAlertRowV4Props): React.ReactElement | null;
//# sourceMappingURL=PriceAlertRowV4.d.ts.map