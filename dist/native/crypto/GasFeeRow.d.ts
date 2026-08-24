import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Relative confirmation speed of a fee tier. */
export type GasSpeed = 'slow' | 'average' | 'fast';
export interface GasFeeRowProps {
    /** Fee tier — drives the label, glyph, and accent slot. */
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
    /** Fires with the `speed` when the row is pressed (selectable list). */
    onSelect?: (speed: GasSpeed) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One selectable gas-fee tier: a glyph + speed label (so the tier is not
 * distinguished by color alone), the gwei price, an optional ETA, and a fiat
 * cost estimate (via {@link MoneyAmount} — no float drift). When `selected` the
 * row gains a primary-ramp tint and an accessibility `selected` state.
 */
export declare function GasFeeRow({ speed, gwei, costCents, currency, eta, selected, onSelect, style, }: GasFeeRowProps): React.ReactElement;
//# sourceMappingURL=GasFeeRow.d.ts.map