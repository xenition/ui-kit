import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Sparkline } from '../charts';
import { changeGlyph, changeToneKey, formatPct, formatPrice } from './internal/format';

export type PriceTickerVariant = 'compact' | 'detailed';

export interface PriceTickerProps {
  /** Asset symbol/ticker (e.g. `BTC`). */
  symbol: string;
  /** Optional long name (`Bitcoin`) — shown in the `detailed` variant. */
  name?: string;
  /** Current price in fiat major units. */
  price: number;
  /** 24h change as a percentage (e.g. `2.4` → `+2.40%`; negative = loss). */
  changePct?: number;
  /** Fiat symbol for the price (default `$`). */
  currencySymbol?: string;
  /** Fraction digits for the price (default `2`). */
  priceDecimals?: number;
  /** Optional recent-price series drawn as a token-toned sparkline. */
  spark?: number[];
  variant?: PriceTickerVariant;
  /** Show a spinner-free skeleton while the quote loads. */
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single live-price line: symbol/name on the left, price + a token-toned
 * change on the right. Gains read `success`, losses `danger`, and each change
 * is prefixed with a ▲/▼ glyph so direction is never color-only. The
 * `detailed` variant adds the long name and an optional {@link Sparkline}.
 * Prices/percentages are formatted with fixed precision — no float drift.
 */
export function PriceTicker({
  symbol,
  name,
  price,
  changePct = 0,
  currencySymbol = '$',
  priceDecimals = 2,
  spark,
  variant = 'compact',
  loading = false,
  onPress,
  style,
}: PriceTickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const detailed = variant === 'detailed';
  const toneKey = changeToneKey(changePct);
  const glyph = changeGlyph(changePct);

  if (loading) {
    return (
      <View
        accessibilityLabel={`Loading ${symbol} price`}
        style={[
          {
            height: detailed ? 56 : 40,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.border,
            opacity: 0.5,
          },
          style,
        ]}
      />
    );
  }

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {symbol}
        </Text>
        {detailed && name != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {name}
          </Text>
        ) : null}
      </View>

      {detailed && spark != null && spark.length > 0 ? (
        <View style={{ width: 64 }}>
          <Sparkline data={spark} height={28} color={toneKey === 'muted' ? 'primary' : toneKey} />
        </View>
      ) : null}

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
          }}
        >
          {formatPrice(price, { symbol: currencySymbol, decimals: priceDecimals })}
        </Text>
        <Text
          accessibilityLabel={`${changePct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
          style={{
            color: colors[toneKey],
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
            fontVariant: ['tabular-nums'],
          }}
        >
          {glyph} {formatPct(changePct)}
        </Text>
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${symbol} price`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {body}
    </Pressable>
  );
}
