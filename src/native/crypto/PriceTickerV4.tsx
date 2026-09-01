import * as React from 'react';
import { Pressable, View, type DimensionValue } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { SparklineV4 } from '../charts/SparklineV4';
import { rowContainerStyle, rowGround, rowTextStyle } from '../dashboard/internal/row-v4';
import { changeInk, changeParts, skeletonFill, spokenLine } from './internal/market-v4';
import { formatPct, formatPrice } from './internal/format';
import type { PriceTickerProps } from './PriceTicker';

export interface PriceTickerV4Props extends PriceTickerProps {
  /** Wording for the movement. Defaults `up` / `down` / `unchanged`. */
  directionLabels?: { up?: string; down?: string; flat?: string };
}

/**
 * The sparkline's box — the same 64 × 28 the web twin draws, passed as a
 * `width` rather than left to a wrapper, because the V4 mark plots into the
 * width it is given.
 */
const SPARK = { width: 64, height: 28 } as const;

/**
 * **V4 price ticker** — same props as {@link PriceTicker} plus
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A loss is announced as a loss.** The base built its spoken change as
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` `` — and
 *    `formatPct` re-applies the sign, so `Math.abs` guaranteed a `+` on a
 *    fall: "down +3.20%". `>= 0` also sent a flat `0` down the "up" branch
 *    while the glyph beside it drew `•`.
 * 2. **The row announces the price.** `"BTC price"` was the whole name, and it
 *    *replaced* the subtree — so the one number the component exists to show
 *    was never spoken. It is one line now: symbol, name, price, movement.
 * 3. **Loading is a ticker-shaped skeleton**, not a translucent slab of
 *    `border` that is a different colour on every ground it lands on.
 * 4. **The change reads as text.** `colors[changeToneKey(pct)]` handed back a
 *    fill slot for ink; the `*Text` slots are what carry a contrast promise.
 *    Press is a state layer, and the sparkline — which says nothing the name
 *    does not — is hidden from the reader.
 */
export function PriceTickerV4({
  symbol,
  name,
  price,
  changePct = 0,
  currencySymbol = '$',
  priceDecimals = 2,
  spark,
  variant = 'compact',
  loading = false,
  directionLabels,
  onPress,
  style,
}: PriceTickerV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!symbol) return null;

  const detailed = variant === 'detailed';
  const change = changeParts(changePct, directionLabels);
  const ink = changeInk(theme, change.tone);
  const priceText = formatPrice(price, { symbol: currencySymbol, decimals: priceDecimals });
  const pctText = formatPct(changePct);

  if (loading) {
    const band = (width: DimensionValue, height: number): React.ReactElement => (
      <View
        style={{
          height,
          width,
          borderRadius: tokens.radius.sm,
          backgroundColor: skeletonFill(theme),
        }}
      />
    );
    return (
      <View
        accessible
        accessibilityLabel={`Loading ${symbol} price`}
        style={[rowContainerStyle(theme, { twoLine: detailed }), style]}
      >
        <View style={rowTextStyle(theme)}>
          {band('40%', tokens.typography.scale.base)}
          {detailed ? band('60%', tokens.typography.scale.xs) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          {band('100%', tokens.typography.scale.base)}
          {band('70%', tokens.typography.scale.xs)}
        </View>
      </View>
    );
  }

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: detailed }),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
          {symbol}
        </TextV4>
        {detailed && name != null ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {name}
          </TextV4>
        ) : null}
      </View>

      {detailed && spark != null && spark.length > 0 ? (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <SparklineV4
            data={spark}
            width={SPARK.width}
            height={SPARK.height}
            // `neutral` has no status hue, so a flat series keeps the brand
            // slot — which is what the base's `muted → primary` guard meant.
            {...(change.tone === 'neutral' ? {} : { tone: change.tone })}
          />
        </View>
      ) : null}

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="bold" tone="onSurface" numeric="tabular">
          {priceText}
        </TextV4>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <TextV4
            size="xs"
            style={{ color: ink }}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {change.glyph}
          </TextV4>
          <TextV4 size="xs" weight="semibold" numeric="tabular" style={{ color: ink }}>
            {pctText}
          </TextV4>
        </View>
      </View>
    </View>
  );

  const spoken = spokenLine([symbol, detailed ? name : null, priceText, change.word, pctText]);

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
