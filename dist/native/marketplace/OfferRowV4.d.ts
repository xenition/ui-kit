import * as React from 'react';
import type { OfferRowProps, OfferStatus } from './OfferRow';
export type { OfferStatus };
export interface OfferRowV4Props extends OfferRowProps {
    /**
     * Draw the party's `AvatarV4` in the leading slot. Default `true`.
     *
     * §4.7 again: a list of offers on one listing is homogeneous, and a leading
     * mark on every row of one is noise. The slot itself stays either way, so the
     * titles of a list with avatars off still sit on one vertical line.
     */
    showAvatar?: boolean;
}
/**
 * **V4 offer row** — a buyer's offer on a listing: who, how much, where it
 * stands, and the three answers the seller can give.
 *
 * The row proper takes the family metric from `dashboard/internal/row-v4.ts`
 * (§4.3); the optional note and the action bar hang beneath it inside the same
 * gutters, because a row that grows a second block is still a row and must not
 * suddenly acquire a second horizontal inset. The base gave the whole thing a
 * border, a radius and a `surface` ground — a card in a list of cards — which
 * is the treatment brief §4.3 takes away from every row.
 *
 * What changes:
 *
 * 1. **Row metric, transparent ground, `md` gutters.** The container owns the
 *    card.
 * 2. **Tabular money** (rule 2), still through `formatMoney` (rule 1). The
 *    amount is the decision on this row, so it sits one step up the scale at
 *    `lg` — the same step `PriceTagV4` gives a price at `md`.
 * 3. **The status chip carries a glyph and a word** (rule 6), and its tone is
 *    re-mapped so `warn` is not spent on "waiting" — see {@link STATUS}.
 * 4. **The row says who and what out loud.** Neither twin had an accessible
 *    name at all: a screen reader met an avatar, a name, a chip and a figure as
 *    four unrelated fragments. It now announces party, status and amount as one
 *    thing.
 * 5. **Decline is `ghost`/`danger` on both twins.** The web base used the
 *    filled `danger` button, this one used the quiet one — the same choice made
 *    two ways. Declining an offer is reversible and private; the filled
 *    destructive button belongs to `ReportListingV4`, which is neither.
 *
 * Renders `null` when there is no party to attribute the offer to (§4.5).
 */
export declare function OfferRowV4({ party, amountCents, currency, avatarUrl, status, timeLabel, note, onAccept, onDecline, onCounter, showAvatar, style, }: OfferRowV4Props): React.ReactElement | null;
//# sourceMappingURL=OfferRowV4.d.ts.map