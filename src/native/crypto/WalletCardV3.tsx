import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatToken, truncateHash } from './internal/format';
import type { WalletCardProps, WalletKind } from './WalletCard';

/** Same public contract as {@link WalletCard} — a drop-in alternate design. */
export type WalletCardV3Props = WalletCardProps;

const KIND_META: Record<WalletKind, { accent: keyof SemanticColors; label: string }> = {
  hot: { accent: 'primary', label: 'Hot' },
  hardware: { accent: 'success', label: 'Hardware' },
  watch: { accent: 'accent', label: 'Watch-only' },
};

/**
 * WalletCard, redesigned (v3): a **minimal list row** built around a copyable
 * address chip. A single custody-tinted dot leads a label + address stack, where
 * the truncated address sits in a bordered chip that hands the FULL address back
 * through `onCopy`; the fiat balance is right-aligned through {@link MoneyAmount}
 * (integer cents — no drift) over the native amount. No card, just a hairline
 * base rule, so a stack reads as a lean wallet list. Distinct at a glance from
 * v1's card and v2's gradient face. Same props.
 */
export function WalletCardV3({
  address,
  label = 'Wallet',
  balanceCents,
  currency = 'USD',
  nativeAmount,
  nativeSymbol,
  nativeDecimals = 4,
  kind,
  loading = false,
  onCopy,
  onPress,
  style,
}: WalletCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = kind ? KIND_META[kind] : undefined;
  const short = truncateHash(address, 6, 4);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: tokens.radius.full,
          backgroundColor: meta ? colors[meta.accent] : colors.muted,
        }}
      />

      <View style={{ flex: 1, gap: tokens.spacing.xs, alignItems: 'flex-start' }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {label}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Copy address ${address}`}
          onPress={onCopy ? () => onCopy(address) : undefined}
          disabled={!onCopy}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            backgroundColor: tokens.ramps.neutral[100],
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.full,
            paddingVertical: 3,
            paddingHorizontal: tokens.spacing.sm,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>
            {short}
          </Text>
          {onCopy ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>⧉</Text> : null}
        </Pressable>
      </View>

      {loading ? (
        <View
          accessibilityLabel="Loading balance"
          style={{ height: 20, width: 84, borderRadius: tokens.radius.sm, backgroundColor: colors.border, opacity: 0.5 }}
        />
      ) : (
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          {balanceCents != null ? (
            <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="md" />
          ) : null}
          {nativeAmount != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>
              {formatToken(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol })}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
