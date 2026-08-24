import * as React from 'react';
/** Relative confirmation speed of a fee tier. */
export type GasSpeed = 'slow' | 'average' | 'fast';
export interface GasFeeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Fee tier — drives the label and glyph. */
    speed: GasSpeed;
    /** Gas price in gwei. */
    gwei: number;
    /** Estimated total cost in integer **cents** (fiat). */
    costCents?: number;
    /** ISO 4217 currency for the cost (default `USD`). */
    currency?: string;
    /** Human ETA (e.g. `~30s`, `~2m`). */
    eta?: string;
    /** Whether this tier is the selected one. */
    selected?: boolean;
    /** Fires with the `speed` when the row is chosen (selectable list). */
    onSelect?: (speed: GasSpeed) => void;
}
/**
 * One selectable gas-fee tier: a glyph + speed label (so the tier is not
 * distinguished by color alone), the gwei price, an optional ETA, and a fiat
 * cost estimate (via {@link MoneyAmount} — no float drift). When `selected` the
 * row gains a primary-ramp tint and `aria-checked`; when `onSelect` is set it
 * becomes a keyboard-operable `radio`. Web parity of the native `GasFeeRow`.
 */
export declare const GasFeeRow: React.ForwardRefExoticComponent<GasFeeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GasFeeRow.d.ts.map