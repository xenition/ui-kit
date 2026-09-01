import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { ProgressRingV4 } from '../charts/ProgressRingV4';
import type { ChartToneV4 } from '../charts/SparklineV4';
import { formatMoney } from '../commerce/money';
import { MoneyAmountV4 } from './MoneyAmountV4';
import { meterParts, spokenLine } from './internal/ledger-v4';
import type { SavingsGoalCardProps } from './SavingsGoalCard';

/**
 * The colour vocabulary both twins share for a meter.
 *
 * The native base took `keyof SemanticColors` — the whole palette, `border`
 * and `onPrimary` included — while the web base took a six-name union, so the
 * same prop meant two different things on the two platforms. V4 narrows native
 * to the web's union, which every existing caller already satisfies.
 */
type FinanceColorV4 = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';

export interface SavingsGoalCardV4Props extends SavingsGoalCardProps {
  /** Caption for the amount saved beyond the target. Default `'saved over goal'`. */
  overLabel?: string;
  /** Ring colour. Narrowed to the web twin's union. Default `'success'`. */
  color?: FinanceColorV4;
}

/** Only the three status names are status; the rest are identity. */
const RING_TONE: Partial<Record<FinanceColorV4, ChartToneV4>> = {
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/** The ring's diameter, in `2xl` steps — the base wrote `size={84}`. */
const RING_STEPS = 1.75;

/** A share, through `Intl` (rule D). */
const PERCENT = new Intl.NumberFormat(undefined, {
  style: 'percent',
  maximumFractionDigits: 0,
});

/**
 * **V4 savings goal card** — same props as {@link SavingsGoalCard} plus
 * `overLabel`, and with `color` narrowed to the twins' shared union.
 *
 * ## Four changes
 *
 * 1. **Beating the goal is visible.** `Math.max(target - saved, 0)` floored
 *    the overshoot, so $12,000 against a $10,000 goal read *identically* to
 *    landing exactly on target — "$0.00 to go" in both cases. The surplus now
 *    prints as a signed amount with its own caption.
 * 2. **The ring is a `progressbar`.** It was an `image` on both twins, so the
 *    one number the card exists to show was drawn and never exposed. The
 *    clamped ratio is the value; the true percent is in the name.
 * 3. **The percentage and the breakdown go through `Intl`** and are tabular,
 *    so a column of goal cards lines up and a de-DE app does not show a
 *    localised amount beside a hard-coded decimal point.
 * 4. **The captions are `mutedText`**, and the card is one announced object
 *    rather than five loose text nodes a reader walks one at a time.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function SavingsGoalCardV4({
  title,
  savedCents,
  targetCents,
  currency = 'USD',
  deadline,
  color = 'success',
  formatMoney: format = formatMoney,
  overLabel = 'saved over goal',
  appearance = 'classic',
  style,
}: SavingsGoalCardV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!title) return null;

  const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
  const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
  const meter = meterParts(saved, target);
  // Signed, and not floored: positive is what is left, negative is the surplus.
  const remaining = target - saved;

  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const size = Math.round(tokens.spacing['2xl'] * RING_STEPS);
  const now = Math.round(meter.ratio * 100);
  const percentText = PERCENT.format(meter.percent / 100);

  return (
    <CardV4 style={[surface, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }}>
        {/*
          The meter is a SIBLING of the card's summary, not a child of it: a
          `progressbar`'s value is dropped the moment it sits inside another
          accessible element, which is exactly how the ring came to be drawn
          and never exposed.
        */}
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={spokenLine([title, percentText])}
          accessibilityValue={{ min: 0, max: 100, now }}
        >
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <ProgressRingV4
              value={now}
              max={100}
              size={size}
              tone={RING_TONE[color]}
              label={percentText}
            />
          </View>
        </View>
        <View
          accessible
          accessibilityLabel={spokenLine([
            title,
            format(saved, currency),
            format(target, currency),
            format(Math.abs(remaining), currency),
            remaining < 0 ? overLabel : 'to go',
            deadline,
          ])}
          style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}
        >
          <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
            {title}
          </TextV4>
          <View
            style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}
          >
            <MoneyAmountV4 cents={saved} currency={currency} tone="neutral" size="md" />
            <TextV4 size="sm" tone="mutedText" numeric="tabular">
              {`/ ${format(target, currency)}`}
            </TextV4>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}
          >
            <MoneyAmountV4
              cents={Math.abs(remaining)}
              currency={currency}
              tone={remaining < 0 ? 'income' : 'muted'}
              size="sm"
              signDisplay={remaining < 0 ? 'always' : 'never'}
            />
            <TextV4 size="xs" tone="mutedText">
              {remaining < 0 ? overLabel : 'to go'}
            </TextV4>
            {deadline != null ? (
              <TextV4 size="xs" tone="mutedText">
                {`· by ${deadline}`}
              </TextV4>
            ) : null}
          </View>
        </View>
      </View>
    </CardV4>
  );
}
