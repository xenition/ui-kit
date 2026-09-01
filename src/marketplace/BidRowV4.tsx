import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { formatMoney } from '../commerce';
import type { BidRowProps } from './BidRow';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
} from '../dashboard/internal/row-v4';

export interface BidRowV4Props extends BidRowProps {
  /**
   * Draw the bidder's `AvatarV4` in the leading slot. Default `true`.
   *
   * A bid history is a homogeneous list, and §4.7 is explicit that a leading
   * mark on every row of one is noise. Most auction histories also show masked
   * handles (`b***7`), so twenty monograms of nothing is exactly the case the
   * rule is about — this is the switch that turns them off without leaving a
   * ragged left edge, because {@link ROW_V4_LEADING_CLASS} keeps the slot.
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
 * 1. **The metric is the family's.** `rounded border px-md py-sm` becomes the
 *    56 one-line / 72 two-line floor, `md` gutters and a transparent ground —
 *    the container owns the card, so a bid history reads as one list rather
 *    than a stack of little boxes with the page showing between them.
 * 2. **The money is tabular** (brief rule 2). `TextV4 numeric="tabular"`: with
 *    proportional figures `$9.99` and `$11.11` are different widths, so a
 *    history has no right edge to scan down — which is the one thing a bid
 *    history is *for*. Every amount still goes through `formatMoney` (rule 1).
 * 3. **The leading bid is emphasis, not status** (brief rule 3). The base
 *    painted `border-success bg-success/10`, a `success` badge and a `success`
 *    amount. Being the top bid is not "good" in the sense `success` promises —
 *    it is the row that matters most, which is emphasis. So the highlight is
 *    the row family's own `selected` pair (the compiler's slot for "the
 *    container behind a selected row", shipped with a guaranteed
 *    `onSelected` ink) plus a `primary` soft badge that says the word. `danger`
 *    means danger and `success` means good; spending either on emphasis is how
 *    a reader learns to distrust the tone everywhere else (§35.4).
 * 4. **The rank is not a hand-measured column.** `w-5` — a literal brief §1
 *    forbids — becomes the 44 leading slot, holding a tabular numeral. One
 *    slot, one thing in it.
 * 5. **Text is typeset, not styled.** Name `TextV4 size="base"
 *    weight="semibold"`, time `size="sm" tone="mutedText"` — `mutedText`, the
 *    slot with a contrast promise, not `muted`, which is a fill.
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
export const BidRowV4 = React.forwardRef<HTMLDivElement, BidRowV4Props>(function BidRowV4(
  {
    bidder,
    amountCents,
    currency = 'USD',
    avatarUrl,
    timeLabel,
    leading = false,
    isYou = false,
    rank,
    showAvatar = true,
    className,
    ...rest
  },
  ref
) {
  const name = isYou ? 'You' : bidder;
  const named = name.trim() !== '';

  // §4.5: nobody to attribute the bid to, so nothing to draw.
  if (!named) return null;

  const supporting = timeLabel !== undefined && timeLabel !== '';
  const amount = formatMoney(amountCents, currency);
  // The ink the compiler guarantees against whichever ground the row wears.
  const ink = leading ? 'onSelected' : 'onSurface';

  const leadingNode =
    typeof rank === 'number' ? (
      <TextV4 size="sm" weight="semibold" tone={leading ? 'onSelected' : 'mutedText'} numeric="tabular">
        {rank}
      </TextV4>
    ) : showAvatar ? (
      <AvatarV4 src={avatarUrl} name={name} size="md" />
    ) : null;

  return (
    <div
      ref={ref}
      data-xen-v4-row=""
      data-xen-bid-row=""
      aria-label={`${leading ? 'Leading bid, ' : ''}${name}, ${amount}`}
      className={cn(
        ROW_V4_BASE_CLASS,
        rowHeightClass(supporting),
        rowGroundClass(leading),
        className
      )}
      {...rest}
    >
      {leadingNode != null ? <span className={ROW_V4_LEADING_CLASS}>{leadingNode}</span> : null}
      <span className={ROW_V4_TEXT_CLASS}>
        <span className="flex min-w-0 items-center gap-sm">
          <TextV4 size="base" weight="semibold" tone={ink} numberOfLines={1} className="min-w-0">
            {name}
          </TextV4>
          {leading ? (
            // `primary`, not `success`: brief rule 3. The word is what carries
            // the state; the tone only emphasises it.
            <BadgeV4 tone="primary" variant="soft" size="sm">
              Leading
            </BadgeV4>
          ) : null}
        </span>
        {supporting ? (
          <TextV4 size="sm" tone={leading ? 'onSelected' : 'mutedText'} numberOfLines={1}>
            {timeLabel}
          </TextV4>
        ) : null}
      </span>
      <span className={ROW_V4_TRAILING_CLASS}>
        <TextV4 size="base" weight="bold" tone={ink} numeric="tabular">
          {amount}
        </TextV4>
      </span>
    </div>
  );
});
