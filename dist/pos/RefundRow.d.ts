import * as React from 'react';
import { type RefundStatus, type RefundReason } from './internal';
export type RefundRowVariant = 'default' | 'selectable';
export interface RefundRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
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
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * One line of a return / refund — the DOM parity of the native `RefundRow`:
 * item, quantity, amount (integer **cents** via `formatMoney`), the return reason
 * and refund status as **glyph + word** chips (never color alone), and an
 * optional restock flag. In `selectable` mode a token-styled checkbox `<button>`
 * (reflected in `aria-checked`) lets a clerk pick lines to refund. When `onClick`
 * is set the row is a keyboard-operable `role="button"`. Token-only colors.
 */
export declare const RefundRow: React.ForwardRefExoticComponent<RefundRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RefundRow.d.ts.map