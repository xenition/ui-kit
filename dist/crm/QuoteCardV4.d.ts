import * as React from 'react';
import type { QuoteCardProps } from './QuoteCard';
export interface QuoteCardV4Props extends QuoteCardProps {
    /** How the line-item count is spelled. Default `` `${n} item(s)` ``. */
    formatLineItems?: (count: number) => string;
    /** The word in front of the lifecycle status. Default `'Status'`. */
    statusLabel?: string;
}
/**
 * **V4 quote card** — the web twin of the native `QuoteCardV4`, same props as
 * {@link QuoteCard} plus `formatLineItems` and `statusLabel`.
 *
 * ## Four changes
 *
 * 1. **The action is not nested inside the card's activation.** The base
 *    guarded the identical nesting `ContactCard` has with a
 *    `stopPropagation` — which works, and which is a patch over an invalid
 *    tree: interactive content inside a `role="button"`. The card's own
 *    activation is a real `<button>` around the identity block, and the action
 *    is that button's **sibling**, so no event has anywhere to bubble to and
 *    the guard is unnecessary rather than load-bearing.
 * 2. **The status is announced.** On native the label sat on a `View` that was
 *    not an accessibility element, so it was dropped in silence; the badge is
 *    named on both twins now, and `statusLabel` says what the word is *for*.
 * 3. **One accessible name.** `Quote Q-1042` replaced the subtree, so the
 *    total, the item count, the validity date and the status — everything the
 *    card is for — were never announced.
 * 4. **The grand total is tabular, the badge is `BADGE_V4` on both twins, and
 *    a press is a state layer.**
 */
export declare const QuoteCardV4: React.ForwardRefExoticComponent<QuoteCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuoteCardV4.d.ts.map