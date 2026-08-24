import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type CashMovementKind } from './internal';
export type CashDrawerRowVariant = 'default' | 'total';
export interface CashDrawerRowProps {
    /** Movement kind — drives the glyph + default label. */
    kind: CashMovementKind;
    /** Override the default movement label. */
    label?: string;
    /** Amount in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /**
     * For `kind="variance"`: the expected amount to compare `amountCents`
     * (counted) against — resolves an over/short/balanced pill and signed delta.
     */
    expectedCents?: number;
    /** Optional muted sub-line (e.g. count of transactions). */
    detail?: string;
    /** Tap handler (e.g. drill into the movement). */
    onPress?: () => void;
    /** `total` renders emphasized (bold, top rule) for a subtotal/expected line. */
    variant?: CashDrawerRowVariant;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One row of a cash-drawer count / register audit: opening float, cash sales,
 * pay-ins/outs, expected, counted, and the variance. Money is integer **cents**
 * via `formatMoney`, with in/out movements signed. For `kind="variance"`, pass
 * `expectedCents` and the counted `amountCents` to draw an over/short/balanced
 * **glyph + word** pill and a signed delta — state by text, never color alone.
 * Token-only.
 */
export declare function CashDrawerRow({ kind, label, amountCents, currency, expectedCents, detail, onPress, variant, testID, style, }: CashDrawerRowProps): React.ReactElement;
//# sourceMappingURL=CashDrawerRow.d.ts.map