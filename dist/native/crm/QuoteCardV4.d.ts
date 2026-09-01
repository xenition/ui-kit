import * as React from 'react';
import type { QuoteCardProps } from './QuoteCard';
export interface QuoteCardV4Props extends QuoteCardProps {
    /** How the line-item count is spelled. Default `'3 items'` / `'1 item'`. */
    formatLineItems?: (count: number) => string;
    /** Unit for the lifecycle status. Default `'Status'`. */
    statusLabel?: string;
}
/**
 * **V4 quote card** — same props as {@link QuoteCard} plus `formatLineItems`
 * and `statusLabel`.
 *
 * ## Five changes
 *
 * 1. **The status is announced on native.** `accessibilityLabel` sat on a bare
 *    `View` with no `accessible` flag, so the label was silently dropped and
 *    the one thing a quote row exists to report — draft, sent, accepted — was
 *    never read out.
 * 2. **The action button is not nested inside a button.** The card's own
 *    activation wrapped the whole surface, action included; the web twin had
 *    to guard the identical nesting with `stopPropagation`. The activation now
 *    covers only the quote's summary and the action is its sibling.
 * 3. **The card announces everything it shows** — number, account, total,
 *    status, item count and validity (rule A).
 * 4. **The grand total is tabular**, so a stack of quotes lines up.
 * 5. **A press is a state layer** (rule B) and the badge is `BADGE_V4`
 *    (rule C).
 *
 * **Renders nothing without a `number`.**
 */
export declare function QuoteCardV4({ number, company, totalCents, currency, lineItems, status, validUntil, actionLabel, formatLineItems, statusLabel, onAction, onPress, testID, style, }: QuoteCardV4Props): React.ReactElement | null;
//# sourceMappingURL=QuoteCardV4.d.ts.map