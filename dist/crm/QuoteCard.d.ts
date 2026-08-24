import * as React from 'react';
import { type QuoteStatus } from './internal';
export interface QuoteCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Quote / proposal number (e.g. "Q-1042"). */
    number: string;
    /** Account the quote is for. */
    company?: string;
    /** Grand total in integer **cents**. */
    totalCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Number of line items (rendered when > 0). */
    lineItems?: number;
    /** Lifecycle status — glyph + word + tone. */
    status: QuoteStatus;
    /** Pre-formatted validity / expiry date. */
    validUntil?: string;
    /** Optional primary action (e.g. "Send", "Convert"). */
    actionLabel?: string;
    onAction?: () => void;
    /** Click handler for the card body (renders as a keyboard-accessible button). */
    onClick?: () => void;
}
/**
 * Card for a sales quote / proposal: number, account, line-item count, grand
 * total (cents → `formatMoney`) and a lifecycle {@link Badge} whose glyph + word
 * carry the status (draft/sent/viewed/accepted/rejected/expired) so it is never
 * color-only. An optional inline action button (`onAction`) drives the next
 * step. When `onClick` is set the card body is a `role="button"` div. All colors
 * are `--xen-*` token classes.
 */
export declare const QuoteCard: React.ForwardRefExoticComponent<QuoteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuoteCard.d.ts.map