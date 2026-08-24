import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import { maskAccountNumber } from './internal/mask';
import type { AccountCardProps, AccountVariant } from './AccountCard';

/** Same public contract as {@link AccountCard} — a drop-in alternate design. */
export type AccountCardV2Props = AccountCardProps;

const VARIANT_META: Record<
  AccountVariant,
  { fill: keyof SemanticColors; on: keyof SemanticColors; glyph: string; label: string }
> = {
  checking: { fill: 'primary', on: 'onPrimary', glyph: '🏦', label: 'Checking' },
  savings: { fill: 'success', on: 'onSuccess', glyph: '🐖', label: 'Savings' },
  credit: { fill: 'accent', on: 'onAccent', glyph: '💳', label: 'Credit' },
};

/**
 * AccountCard, redesigned (v2): a **full credit-card face**. The whole tile is
 * filled with the variant's fill slot (primary / success / accent) and lifted
 * with a shadow; a translucent sheen band suggests a gradient without a literal
 * color. The balance is set large in the guaranteed on-fill text slot, with the
 * name up top and the masked number along the bottom like an embossed PAN.
 * Distinct at a glance from v1's small glyph tile. Same props, integer cents.
 */
export function AccountCardV2({
  name,
  variant,
  balanceCents,
  currency = 'USD',
  accountNumber,
  icon,
  onPress,
  style,
}: AccountCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const press = usePressScale();

  const onColor = colors[meta.on];
  const subColor = withAlpha(onColor, 0.72);
  const safeBalance = Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0;

  const body = (
    <View
      style={[
        {
          minHeight: 172,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          backgroundColor: colors[meta.fill],
          justifyContent: 'space-between',
          overflow: 'hidden',
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      {/* Sheen band — a translucent on-color wash reading as a gradient. */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -60,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(onColor, 0.08),
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ color: onColor, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text style={{ color: subColor, fontSize: tokens.typography.scale.xs }}>{meta.label}</Text>
        </View>
        <Text style={{ fontSize: tokens.typography.scale['2xl'] }}>{icon ?? meta.glyph}</Text>
      </View>
      <View style={{ gap: 2 }}>
        <Text style={{ color: subColor, fontSize: tokens.typography.scale.xs }}>Balance</Text>
        <Text
          style={{
            color: onColor,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
          }}
        >
          {formatMoney(safeBalance, currency)}
        </Text>
      </View>
      <Text
        style={{
          color: subColor,
          fontSize: tokens.typography.scale.sm,
          letterSpacing: 2,
          fontVariant: ['tabular-nums'],
        }}
      >
        {accountNumber != null ? maskAccountNumber(accountNumber) : '•• ••••'}
      </Text>
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${meta.label} account`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
