import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { ProgressBarsV4, type ProgressBarsV4Item } from '../charts';
import type { RatingBreakdownProps } from './RatingBreakdown';

export interface RatingBreakdownV4Props extends RatingBreakdownProps {
  /**
   * Draw the block on its own card. Default `true`, which is the base's
   * behaviour.
   *
   * Pass `false` where the breakdown already sits inside a card — a seller
   * profile panel, a reviews sheet. §4.2 gives a card one ground and one edge;
   * a hairline box inside a hairline box is the ruled, gridded look §3 rules
   * out, and §4.6 forbids nesting a shadow in a shadow.
   */
  framed?: boolean;
  /**
   * Carry `elevation.card`. Default `false`.
   *
   * §4.6 gives a shadow to "a card sitting on the page", and this block almost
   * never is one — it is the lower half of a seller panel or a reviews tab.
   * The default therefore differs from `ListingCardV4` / `SellerCardV4`, which
   * *are* on-page cards and default to raised.
   */
  raised?: boolean;
  /** Show the loading placeholder at the list's footprint instead of the bars. */
  loading?: boolean;
  /** What the block says when nothing has been rated yet. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Normalize either input shape into a `[1★..5★]` count tuple. */
function toTuple(counts: RatingBreakdownProps['counts']): [number, number, number, number, number] {
  const get = (star: number): number => {
    const raw = Array.isArray(counts)
      ? counts[star - 1]
      : (counts as Record<number, number | undefined>)[star];
    return typeof raw === 'number' && raw > 0 ? raw : 0;
  };
  return [get(1), get(2), get(3), get(4), get(5)];
}

/**
 * **V4 rating breakdown** — half of the trust pair, with `SellerCardV4`.
 *
 * ## It is a horizontal bar chart, so it is one
 *
 * Brief §3 Group C says it outright: "`RatingBreakdown` is a horizontal bar
 * chart in all but name: compose `ProgressBarsV4` from `charts` rather than
 * drawing its own bars." The base drew five `View`s with a percentage width, a
 * hand-mixed `withAlpha(colors.muted, 0.2)` track and its own
 * `accessibilityLabel` per row — which is `ProgressBarsV4` re-derived, badly.
 *
 * Composing the chart hands over four things this file no longer decides: the
 * row metric (§4.3 — 72, the two-line list container), the track colour (the
 * chart line's own recessive neutral rather than a local alpha mix), the
 * data-end-only corner radius (§4.4), and the animated fill that already knows
 * how to sit still under Reduce Motion.
 *
 * **`max` is the total, not the tallest bar.** `ProgressBarsV4` defaults `max`
 * to the largest item, which is right for "top channels" and wrong here: in a
 * rating distribution the reader is comparing each star level to *all* the
 * ratings, so the 5★ bar being full has to mean "everyone gave five stars",
 * not "5★ was the most common". This is the one decision the composition does
 * not make for us, and getting it wrong would make every distribution look
 * unanimous at its own mode.
 *
 * ## Rule 6: a number, and stars, and a count
 *
 * The summary is all three, in that order — the average as a display-sized
 * tabular figure, `RatingV4` beside it, and the total underneath. Stars alone
 * are the failure this rule names, and it matters most here, because this is
 * the block someone reads while deciding whether to send money to a stranger.
 *
 * The star row is not the accessible carrier: `RatingV4` announces itself as
 * "4.6 out of 5 stars", the figure is text, and the count is text. Nothing in
 * the block depends on seeing a shape.
 *
 * ## The empty case
 *
 * Zero ratings is not "a 0.0 average" — it is *no data*, and printing `0.0 ★`
 * beside five empty bars states something false about the seller. So with no
 * ratings the summary is withheld entirely and the chart's own empty state
 * carries {@link RatingBreakdownV4Props.emptyLabel}. §4.5: a component with
 * nothing to show renders an empty state, never a blank bordered box.
 *
 * Composes `CardV4`, `RatingV4`, `TextV4` and `ProgressBarsV4` (rule 7).
 */
export function RatingBreakdownV4({
  counts,
  average,
  hideSummary = false,
  framed = true,
  raised = false,
  loading = false,
  emptyLabel = 'No ratings yet',
  style,
}: RatingBreakdownV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const tuple = toTuple(counts);
  const total = tuple.reduce((a, b) => a + b, 0);
  const derivedAvg =
    total > 0 ? tuple.reduce((sum, count, i) => sum + count * (i + 1), 0) / total : 0;
  const avg = typeof average === 'number' ? average : derivedAvg;
  // A caller-supplied `average` with no counts behind it is still an average
  // worth printing — a seller page that has the number but not the histogram.
  // Zero counts AND no number is the honest empty case.
  const empty = total === 0;
  const showSummary = !hideSummary && !(empty && typeof average !== 'number');

  const items: ProgressBarsV4Item[] = empty
    ? []
    : [5, 4, 3, 2, 1].map((star) => ({
        label: star === 1 ? '1 star' : `${star} stars`,
        value: tuple[star - 1] ?? 0,
      }));

  const body = (
    <>
      {showSummary ? (
        <View
          testID="xen-v4-rating-summary"
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
        >
          {/*
            The figure, at a display step and in tabular figures — rule 2's
            "money is tabular" generalised to the other number a shopper
            compares down a column. `4.6` and `3.1` must be the same width or a
            list of sellers has no edge to scan.
          */}
          <TextV4 size="2xl" weight="bold" tone="onCard" numeric="tabular">
            {avg.toFixed(1)}
          </TextV4>
          <View style={{ gap: tokens.spacing.xs }}>
            <RatingV4 value={avg} size="sm" />
            <TextV4 size="sm" tone="mutedText" numeric="tabular">
              {empty ? emptyLabel : `${total.toLocaleString()} ${total === 1 ? 'rating' : 'ratings'}`}
            </TextV4>
          </View>
        </View>
      ) : null}
      <ProgressBarsV4
        items={items}
        max={total}
        loading={loading}
        emptyLabel={emptyLabel}
        valueFormat={(value) => value.toLocaleString()}
      />
    </>
  );

  if (!framed) {
    return <View style={[{ gap: tokens.spacing.md }, style]}>{body}</View>;
  }

  return (
    <CardV4
      variant={raised ? 'elevated' : 'outlined'}
      radius="lg"
      padding="lg"
      style={[{ gap: tokens.spacing.md, backgroundColor: colors.card }, style]}
    >
      {body}
    </CardV4>
  );
}
