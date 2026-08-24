import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SplitBillRowVariant = 'even' | 'custom';
export interface SplitBillRowProps {
    /** Party label (e.g. "Guest 1", "Card ending 4242"). */
    label: string;
    /** This party's share in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** How many items assigned to this split (shown when > 0). */
    itemCount?: number;
    /** Already settled — shows a "Paid" flag (word, not color alone). */
    paid?: boolean;
    /** Selection state for the active party being edited/charged. */
    selected?: boolean;
    /** Amount already tendered against this split, in cents. */
    paidCents?: number;
    /** Select/press handler. */
    onPress?: () => void;
    /** Toggle-paid handler; renders a settle control. */
    onTogglePaid?: () => void;
    /** `even` (default) is an equal share; `custom` hints an editable amount. */
    variant?: SplitBillRowVariant;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One party's slice when a bill is split — label, item count, this party's
 * amount (integer **cents** via `formatMoney`), a remaining/paid indicator, and
 * a settle toggle. `paid` is conveyed by a **glyph + word** flag, never color
 * alone; `selected` draws an accent ring reflected in `accessibilityState`.
 * Token-only: accent fill via a token-tinted `withAlpha`.
 */
export declare function SplitBillRow({ label, amountCents, currency, itemCount, paid, selected, paidCents, onPress, onTogglePaid, variant, testID, style, }: SplitBillRowProps): React.ReactElement;
//# sourceMappingURL=SplitBillRow.d.ts.map