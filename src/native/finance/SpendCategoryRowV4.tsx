import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { MiniBarV4 } from '../charts/MiniBarV4';
import type { ChartToneV4 } from '../charts/SparklineV4';
import { formatMoney } from '../commerce/money';
import { MoneyAmountV4 } from './MoneyAmountV4';
import { spokenLine } from './internal/ledger-v4';
import type { SpendCategoryRowProps } from './SpendCategoryRow';

/** The colour vocabulary both twins share — see `SavingsGoalCardV4`. */
type FinanceColorV4 = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';

export interface SpendCategoryRowV4Props extends SpendCategoryRowProps {
  /** Bar and glyph colour. Narrowed to the web twin's union. Default `'primary'`. */
  color?: FinanceColorV4;
}

/** Only the three status names are status. */
const BAR_TONE: Partial<Record<FinanceColorV4, ChartToneV4>> = {
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * A non-status colour is **identity**, so it takes a categorical slot off the
 * chart palette rather than a semantic fill. A category is not good or bad.
 */
const BAR_SLOT: Record<FinanceColorV4, number> = {
  primary: 0,
  accent: 1,
  muted: 2,
  success: 0,
  warn: 0,
  danger: 0,
};

/**
 * The glyph's **ink**, not its fill. A category mark is text-shaped, and
 * `success` / `primary` are fill slots the compiler measures nothing about as
 * text — one of them read as low as 1.32:1 in the audit that produced the
 * `*Text` pairs.
 */
const GLYPH_INK: Record<FinanceColorV4, keyof SemanticColors> = {
  primary: 'primaryText',
  accent: 'accentText',
  success: 'successText',
  warn: 'warnText',
  danger: 'dangerText',
  muted: 'mutedText',
};

/** A share, through `Intl` (rule D). */
const PERCENT = new Intl.NumberFormat(undefined, {
  style: 'percent',
  maximumFractionDigits: 0,
});

/**
 * **V4 spend category row** — same props as {@link SpendCategoryRow}, with
 * `color` narrowed to the twins' shared union.
 *
 * ## Four changes
 *
 * 1. **The row says the amount.** `accessibilityLabel={category}` on an
 *    `accessible` `Pressable` pruned the share and the figure, so "Groceries,
 *    button" was the whole of it.
 * 2. **The share bar is a `progressbar` with a value**, and a sibling of the
 *    row's activation rather than a child — inside a `button` its value is
 *    presentational and is dropped, which is how a drawn proportion ends up
 *    exposed as nothing at all.
 * 3. **Press is a state layer**, not `opacity: 0.7`, which is the band M3
 *    spends on *disabled*.
 * 4. **The row joins the shared row family** — one height, one 44 leading
 *    slot, a caption in `mutedText` — so it clears 44 with or without its
 *    optional glyph, and the percentage goes through `Intl`.
 */
export function SpendCategoryRowV4({
  category,
  amountCents,
  currency = 'USD',
  share,
  icon,
  color = 'primary',
  onPress,
  appearance = 'classic',
  style,
}: SpendCategoryRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const clampedShare =
    typeof share === 'number' && Number.isFinite(share) ? Math.min(Math.max(share, 0), 1) : undefined;
  const percentText = clampedShare != null ? PERCENT.format(clampedShare) : null;
  const now = clampedShare != null ? Math.round(clampedShare * 100) : 0;

  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const name = spokenLine([
    category,
    formatMoney(Number.isFinite(amountCents) ? Math.trunc(amountCents) : 0, currency),
  ]);

  const text = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme),
        { backgroundColor: rowGround(theme, { pressed }), flex: 1 },
      ]}
    >
      {icon != null ? (
        <View style={rowLeadingStyle(theme)}>
          <IconV4 glyph={icon} color={GLYPH_INK[color]} size="lg" />
        </View>
      ) : null}
      <View style={rowTextStyle(theme)}>
        <TextV4 size="sm" weight="semibold" tone="onSurface" numberOfLines={1}>
          {category}
        </TextV4>
      </View>
      <MoneyAmountV4 cents={amountCents} currency={currency} tone="neutral" size="sm" />
    </View>
  );

  return (
    <View style={[surface, { gap: tokens.spacing.xs }, style]}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={onPress}
          style={{ borderRadius: tokens.radius.md }}
        >
          {({ pressed }) => text(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name}>
          {text(false)}
        </View>
      )}
      {clampedShare != null ? (
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={spokenLine([category, `${percentText} of spend`])}
          accessibilityValue={{ min: 0, max: 100, now }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ flex: 1 }}
          >
            <MiniBarV4 value={now} max={100} slot={BAR_SLOT[color]} tone={BAR_TONE[color]} />
          </View>
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {percentText}
          </TextV4>
        </View>
      ) : null}
    </View>
  );
}
