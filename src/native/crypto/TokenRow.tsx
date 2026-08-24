import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { MoneyAmount } from '../finance/MoneyAmount';
import { changeGlyph, changeToneKey, formatPct, formatToken } from './internal/format';

export interface TokenRowProps {
  /** Token ticker (e.g. `ETH`). */
  symbol: string;
  /** Token long name (e.g. `Ethereum`). */
  name?: string;
  /** Held quantity in token units. */
  amount: number;
  /** Fraction digits for the held quantity (default `4`). */
  decimals?: number;
  /** Fiat value of the holding, in integer **cents** (funnelled through MoneyAmount). */
  valueCents?: number;
  /** ISO 4217 currency for the fiat value (default `USD`). */
  currency?: string;
  /** 24h price change as a percentage (gain = `success`, loss = `danger`). */
  changePct?: number;
  /** Leading glyph/emoji for the token disc. */
  icon?: string;
  /** Accent slot for the token disc (default `primary`). */
  iconColor?: keyof SemanticColors;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One holding in a token list: a tinted token disc, symbol/name, the held
 * quantity (fixed-precision — no float drift), and a right-aligned fiat value
 * over a token-toned 24h change (gain = `success`, loss = `danger`, each with a
 * ▲/▼ glyph so it is not color-only). Becomes a button when `onPress` is set.
 */
export function TokenRow({
  symbol,
  name,
  amount,
  decimals = 4,
  valueCents,
  currency = 'USD',
  changePct,
  icon,
  iconColor = 'primary',
  onPress,
  style,
}: TokenRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasChange = changePct != null;
  const toneKey = changeToneKey(changePct ?? 0);

  const row = (
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
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {icon != null ? (
          <Icon glyph={icon} color={iconColor} size="lg" />
        ) : (
          <Text style={{ color: colors[iconColor], fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {symbol.slice(0, 3).toUpperCase()}
          </Text>
        )}
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {symbol}
        </Text>
        {name != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {name}
          </Text>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            fontVariant: ['tabular-nums'],
          }}
        >
          {formatToken(amount, { decimals, symbol })}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="neutral" size="sm" />
          ) : null}
          {hasChange ? (
            <Text
              accessibilityLabel={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct ?? 0))}`}
              style={{
                color: colors[toneKey],
                fontSize: tokens.typography.scale.xs,
                fontWeight: '600',
                fontVariant: ['tabular-nums'],
              }}
            >
              {changeGlyph(changePct ?? 0)} {formatPct(changePct ?? 0)}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${symbol} holding`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
