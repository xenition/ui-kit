import * as React from 'react';
import { View, type DimensionValue } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { formatMoney } from '../../commerce/money';
import { premiumParts } from '../../insurance/coverage-v4';
import { DECORATIVE, skeletonFill, spokenLine, toneInk } from './internal/tone-v4';
import type { PremiumSummaryProps } from './PremiumSummary';
import type { PremiumCadence } from './PolicyCard';

export interface PremiumSummaryV4Props extends PremiumSummaryProps {
  /** Caption beside the total figure. Default `'Total'`. */
  totalLabel?: string;
  /** Headline when there are no lines. Default `'No premium breakdown'`. */
  emptyLabel?: string;
  /** The next-step sentence under {@link PremiumSummaryV4Props.emptyLabel}. */
  emptyDescription?: string;
  /** Announced while the placeholders are up. Default `'Loading premium'`. */
  loadingLabel?: string;
  /**
   * Warn that the supplied `totalCents` disagrees with the lines. Receives the
   * printed total and the sum of the lines, both already formatted.
   *
   * Default `'Total does not match the lines below ($120.00)'`.
   */
  formatMismatch?: (total: string, derived: string) => string;
}

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/** The empty state's next-step sentence — an empty breakdown still owes one. */
const EMPTY_DESCRIPTION = 'Coverages, riders and discounts appear here once the quote is priced.';

/** Default mismatch copy. */
function mismatchLine(total: string, derived: string): string {
  return `Total does not match the lines below (${derived})`;
}

/**
 * **V4 premium summary** — same props as {@link PremiumSummary} plus
 * `totalLabel`, `emptyLabel`, `emptyDescription`, `loadingLabel` and
 * `formatMismatch` (`formatMoney` is already on the base).
 *
 * ## Five changes
 *
 * 1. **`items={[]}` renders a real empty state.** The base drew a card
 *    containing a horizontal rule and the words "Total $0.00" — a confident
 *    figure asserting that this policy costs nothing, which is
 *    indistinguishable from a breakdown that failed to load. It now says what
 *    is missing and what will fill it.
 * 2. **A total that contradicts its own lines says so.** The base's TSDoc
 *    promised the printed total "always reconciles with the lines shown" and
 *    the code then let `totalCents` win outright, so three lines summing to
 *    $120.00 printed above a $99.00 Total and nothing anywhere flagged it. The
 *    shared reader returns `reconciles: false` for exactly that, and the card
 *    prints the derived sum beside the warning rather than quietly picking a
 *    winner — the caller is the only one who can say which number is right.
 * 3. **A credit is not an achievement.** Every negative line was painted
 *    `success`, so a multi-policy discount and a *credited late fee* both
 *    arrived in celebration green. The minus sign already carries the
 *    direction; the ink is the same as every other line.
 * 4. **The skeleton is opaque and in the shape of the card.** It was three
 *    bars painted in `colors.border` — the hairline token used as a fill, so
 *    the placeholder was the colour of a divider — and it drew no total row, so
 *    the card jumped a line taller when the data arrived. `skeletonFill`
 *    composites against the card's own ground, and the placeholder includes the
 *    total.
 * 5. **`colors.muted` and `colors.primary` stop drawing text.** Both are fill
 *    slots with no contrast promise; the line labels and the total figure now
 *    use `mutedText` and `primaryText`.
 */
export function PremiumSummaryV4({
  items,
  totalCents,
  cadence = 'monthly',
  currency = 'USD',
  loading = false,
  totalLabel = 'Total',
  emptyLabel = 'No premium breakdown',
  emptyDescription = EMPTY_DESCRIPTION,
  loadingLabel = 'Loading premium',
  formatMismatch = mismatchLine,
  formatMoney: format = formatMoney,
  style,
}: PremiumSummaryV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const rows = Array.isArray(items) ? items : [];

  if (loading) {
    const bar = (width: DimensionValue): React.ReactElement => (
      <View
        style={{
          height: tokens.typography.scale.base,
          borderRadius: tokens.radius.sm,
          backgroundColor: skeletonFill(theme),
          width,
        }}
      />
    );
    return (
      <CardV4
        accessible
        accessibilityLabel={loadingLabel}
        style={[{ gap: tokens.spacing.sm }, style]}
      >
        {(['100%', '100%', '60%'] as DimensionValue[]).map((width, i) => (
          <View key={i} {...DECORATIVE}>
            {bar(width)}
          </View>
        ))}
        {/* The total row is part of the shape the card is about to be — leaving
            it out is what made the card grow a line when the data landed. */}
        <View
          {...DECORATIVE}
          style={{
            marginTop: tokens.spacing.sm,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          {bar('45%')}
        </View>
      </CardV4>
    );
  }

  if (rows.length === 0) {
    return (
      <CardV4 style={style}>
        <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
      </CardV4>
    );
  }

  const parts = premiumParts(
    rows.map((item) => item.amountCents),
    totalCents
  );
  const totalText = format(parts.total, currency);
  const derivedText = format(parts.derived, currency);
  const mismatch = parts.reconciles ? null : formatMismatch(totalText, derivedText);

  return (
    <CardV4 style={[{ gap: tokens.spacing.md }, style]}>
      <View style={{ gap: tokens.spacing.sm }}>
        {rows.map((item, i) => {
          const cents = Number.isFinite(item.amountCents) ? Math.trunc(item.amountCents) : 0;
          const credit = cents < 0;
          return (
            <View
              accessible
              accessibilityLabel={spokenLine([
                item.label,
                `${credit ? '−' : ''}${format(Math.abs(cents), currency)}`,
              ])}
              key={`${item.label}-${i}`}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: tokens.spacing.md,
              }}
            >
              <TextV4 size="sm" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
                {item.label}
              </TextV4>
              {/* One ink for charges and credits alike — see change 3. */}
              <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
                {`${credit ? '−' : ''}${format(Math.abs(cents), currency)}`}
              </TextV4>
            </View>
          );
        })}
      </View>

      <View
        accessible
        accessibilityLabel={spokenLine([totalLabel, totalText, CADENCE_LABEL[cadence], mismatch])}
        style={{
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="base" weight="bold" tone="onCard">
            {totalLabel}
          </TextV4>
          <TextV4 size="xs" tone="mutedText">
            {CADENCE_LABEL[cadence]}
          </TextV4>
        </View>
        <TextV4 size="2xl" weight="bold" tone="primaryText" numeric="tabular">
          {totalText}
        </TextV4>
      </View>

      {/* Surfaced, not resolved: only the caller knows which figure is right. */}
      {mismatch ? (
        <TextV4
          {...DECORATIVE}
          size="xs"
          weight="semibold"
          style={{ color: toneInk(theme, 'warn') }}
        >
          {mismatch}
        </TextV4>
      ) : null}
    </CardV4>
  );
}
