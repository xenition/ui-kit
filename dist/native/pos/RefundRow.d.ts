import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type RefundStatus, type RefundReason } from './internal';
export type RefundRowVariant = 'default' | 'selectable';
export interface RefundRowProps {
    /** Item / line name being refunded. */
    name: string;
    /** Quantity being returned. */
    quantity?: number;
    /** Refund amount in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Why the item is coming back — glyph + word chip. */
    reason?: RefundReason;
    /** Refund lifecycle status — glyph + word pill. */
    status?: RefundStatus;
    /** Restock flag (word, not color alone). */
    restock?: boolean;
    /**
     * `selectable` renders a checkbox so a clerk can choose which lines to
     * refund; `selected`/`onToggle` drive it.
     */
    variant?: RefundRowVariant;
    /** Selection state (for `selectable`). */
    selected?: boolean;
    /** Toggle handler (for `selectable`). */
    onToggle?: () => void;
    /** Tap handler for the whole row. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line of a return / refund: item, quantity, amount (integer **cents** via
 * `formatMoney`), the return reason and refund status as **glyph + word** chips
 * (never color alone), and an optional restock flag. In `selectable` mode a
 * token-styled checkbox (reflected in `accessibilityState.checked`) lets a clerk
 * pick lines to refund. Token-only colors.
 */
export declare function RefundRow({ name, quantity, amountCents, currency, reason, status, restock, variant, selected, onToggle, onPress, testID, style, }: RefundRowProps): React.ReactElement;
//# sourceMappingURL=RefundRow.d.ts.map