import * as React from 'react';
import type { BidRowProps } from './BidRow';
export interface BidRowV4Props extends BidRowProps {
    /**
     * Draw the bidder's `AvatarV4` in the leading slot. Default `true`.
     *
     * A bid history is a homogeneous list, and §4.7 is explicit that a leading
     * mark on every row of one is noise. Most auction histories also show masked
     * handles (`b***7`), so twenty monograms of nothing is exactly the case the
     * rule is about — this is the switch that turns them off without leaving a
     * ragged left edge, because {@link rowLeadingStyle} keeps the slot.
     *
     * Ignored when `rank` is set: one leading slot holds one thing (§4.7, "one
     * badge per row, maximum"), and a numbered history is numbered.
     */
    showAvatar?: boolean;
}
/**
 * **V4 bid row** — one bid in an auction's history, on the shared row metric,
 * with the amounts in a column that actually lines up.
 *
 * Everything structural comes from `dashboard/internal/row-v4.ts`, the file the
 * dashboard pass wrote so the row metric could be decided once (§4.3, and
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` open question 3). A bid row is a row; it is
 * not a small card, and the base drew it as one — its own border, its own
 * radius, its own ground. Reusing the family's file rather than restating 56 /
 * 72 / 16 / 44 here is the whole reason those numbers cannot drift again.
 *
 * What changes against the base:
 *
 * 1. **The metric is the family's.** A bordered, rounded box becomes the 56
 *    one-line / 72 two-line floor, `md` gutters and a transparent ground — the
 *    container owns the card, so a bid history reads as one list rather than a
 *    stack of little boxes with the page showing between them.
 * 2. **The money is tabular** (brief rule 2). `TextV4 numeric="tabular"`: with
 *    proportional figures `$9.99` and `$11.11` are different widths, so a
 *    history has no right edge to scan down — which is the one thing a bid
 *    history is *for*. Every amount still goes through `formatMoney` (rule 1).
 * 3. **The leading bid is emphasis, not status** (brief rule 3). The base
 *    painted a `success` border, a `success`-tinted ground, a `success` badge
 *    and a `success` amount. Being the top bid is not "good" in the sense
 *    `success` promises — it is the row that matters most, which is emphasis.
 *    So the highlight is the row family's own `selected` pair (the compiler's
 *    slot for "the container behind a selected row", shipped with a guaranteed
 *    `onSelected` ink) plus a `primary` soft badge that says the word.
 *    `danger` means danger and `success` means good; spending either on
 *    emphasis is how a reader learns to distrust the tone everywhere else
 *    (§35.4). It also retires this file's last use of `withAlpha` — a hand-mixed
 *    tint whose contrast nobody had measured.
 * 4. **The rank is not a hand-measured column.** `width: 20` — a literal brief
 *    §1 forbids — becomes the 44 leading slot, holding a tabular numeral. One
 *    slot, one thing in it.
 * 5. **Text is typeset, not styled.** Name `TextV4 size="base"
 *    weight="semibold"`, time `size="sm" tone="mutedText"` — `mutedText`, the
 *    slot with a contrast promise, not `colors.muted`, which is a fill and is
 *    what this file used as an ink.
 *
 * On a leading row all three runs take `onSelected`, the ink the compiler
 * guarantees against that ground; the hierarchy is carried by size and weight
 * instead, which is §10's typography-before-containers in the one place where
 * keeping `mutedText` would mean a contrast nobody has measured.
 *
 * Renders `null` when there is no one to attribute the bid to — `bidder` empty
 * and `isYou` false (§4.5: a component with nothing to show renders nothing,
 * never a blank band in the middle of a list).
 */
export declare function BidRowV4({ bidder, amountCents, currency, avatarUrl, timeLabel, leading, isYou, rank, showAvatar, style, }: BidRowV4Props): React.ReactElement | null;
//# sourceMappingURL=BidRowV4.d.ts.map