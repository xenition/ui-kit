import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type QuoteStatus } from './internal';
export interface QuoteCardProps {
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
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Card for a sales quote / proposal: number, account, line-item count, grand
 * total (cents → `formatMoney`) and a lifecycle {@link Badge} whose glyph +
 * word carry the status (draft/sent/viewed/accepted/rejected/expired) so it is
 * never color-only. An optional inline action button (`onAction`) drives the
 * next step. All colors are theme tokens.
 */
export declare function QuoteCard({ number, company, totalCents, currency, lineItems, status, validUntil, actionLabel, onAction, onPress, testID, style, }: QuoteCardProps): React.ReactElement;
//# sourceMappingURL=QuoteCard.d.ts.map