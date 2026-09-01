import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { MiniBarV4 } from '../charts/MiniBarV4';
import type { ChartToneV4 } from '../charts/SparklineV4';
import { formatMoney } from '../commerce/money';
import { MoneyAmountV4 } from './MoneyAmountV4';
import { meterParts, spokenLine } from './internal/ledger-v4';
import type { BudgetBarProps } from './BudgetBar';

export interface BudgetBarV4Props extends BudgetBarProps {
  /** Caption beside the remaining figure once the budget is exceeded. Default `'over'`. */
  overLabel?: string;
  /** The meter's spoken figure. Default `'112% of budget used'`. */
  formatPercent?: (percent: number) => string;
}

/** Where the fill changes what it means. Three quarters spent is a warning. */
const WARN_AT = 0.75;

/** A share, through `Intl` — never `toFixed`, never concatenation (rule D). */
const PERCENT = new Intl.NumberFormat(undefined, {
  style: 'percent',
  maximumFractionDigits: 0,
});

/**
 * **V4 budget bar** — same props as {@link BudgetBar} plus `overLabel` and
 * `formatPercent`.
 *
 * ## Five changes
 *
 * 1. **The bar and its name agree.** The base clamped the *fill* and left the
 *    announced percentage uncapped, so at 300% spent one element drew a full
 *    bar while the name beside it said "300% of budget used" — and the meter
 *    was an `image`, so the number was never exposed as a value at all.
 *    `meterParts()` returns the clamped ratio for the meter and the true
 *    percent for the name, and the meter is a real `progressbar` carrying the
 *    clamped value.
 * 2. **Over-budget prints with a sign.** `signDisplay="never"` made −$12.00
 *    and +$12.00 the same string, leaving the tone as the only difference
 *    between "you have twelve dollars left" and "you are twelve dollars over"
 *    — invisible in greyscale.
 * 3. **The remaining balance is readable.** It is drawn through
 *    `MoneyAmount`'s `tone="muted"`, which meant `colors.muted`: a ramp step
 *    with no contrast promise, carrying a real balance.
 * 4. **The figure is sized by `size`, not by an override.** The base handed
 *    `MoneyAmount` a style object setting `fontSize` and `fontWeight` — which
 *    applies on native and is silently dropped on web, where `cn` is a joiner
 *    rather than a merger — so the same remaining balance rendered at two
 *    different sizes on the two platforms.
 * 5. **The bar's tone is genuinely status.** Budget health is one of the few
 *    places `success` / `warn` / `danger` are earned, and it ships with the
 *    percentage as a word so it never rests on hue.
 */
export function BudgetBarV4({
  label,
  spentCents,
  limitCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  overLabel = 'over',
  formatPercent = (percent) => `${PERCENT.format(percent / 100)} of budget used`,
  style,
}: BudgetBarV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
  const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;
  const meter = meterParts(spent, limit);
  const remaining = limit - spent;

  const tone: ChartToneV4 =
    meter.over ? 'danger' : meter.ratio >= WARN_AT ? 'warn' : 'success';
  const percentText = formatPercent(meter.percent);
  const now = Math.round(meter.ratio * 100);

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}
      >
        <TextV4
          size="sm"
          weight="semibold"
          tone="onSurface"
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {label}
        </TextV4>
        <TextV4 size="xs" tone="mutedText" numeric="tabular">
          {`${format(spent, currency)} / ${format(limit, currency)}`}
        </TextV4>
      </View>

      {/*
        A drawn proportion has to be exposed as one. The mark itself is an
        `image` by construction — it is a mark, and it has no idea what it is
        measuring — so the meaning is named here, where the numbers are: the
        clamped ratio as the value, the true percent in the name.
      */}
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={spokenLine([label, percentText])}
        accessibilityValue={{ min: 0, max: 100, now }}
      >
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <MiniBarV4 value={now} max={100} tone={tone} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <TextV4 size="xs" tone="mutedText">
          {remaining >= 0 ? 'Remaining' : overLabel}
        </TextV4>
        <MoneyAmountV4
          cents={remaining}
          currency={currency}
          tone={remaining >= 0 ? 'muted' : 'expense'}
          size="sm"
          signDisplay="auto"
        />
      </View>
    </View>
  );
}
