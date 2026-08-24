import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import { formatToken, truncateHash } from './internal/format';
import type { WalletCardProps, WalletKind } from './WalletCard';

/** Same public contract as {@link WalletCard} — a drop-in alternate design. */
export type WalletCardV2Props = WalletCardProps;

const KIND_META: Record<
  WalletKind,
  { fill: keyof SemanticColors; on: keyof SemanticColors; glyph: string; label: string }
> = {
  hot: { fill: 'primary', on: 'onPrimary', glyph: '🔥', label: 'Hot' },
  hardware: { fill: 'success', on: 'onSuccess', glyph: '🔒', label: 'Hardware' },
  watch: { fill: 'accent', on: 'onAccent', glyph: '👁', label: 'Watch-only' },
};

/**
 * WalletCard, redesigned (v2): a **full gradient wallet-face**. The whole tile is
 * filled from a custody-mapped slot (hot → primary, hardware → success, watch →
 * accent) and lifted with a shadow; a translucent on-color sheen band reads as a
 * gradient without a literal color. The fiat balance is set large in the
 * guaranteed on-fill text slot, with the custody badge up top and a translucent
 * copyable address chip along the bottom. Distinct at a glance from v1's small
 * bordered card. Same props; balance stays integer cents (no float drift).
 */
export function WalletCardV2({
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
}: WalletCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = kind ? KIND_META[kind] : KIND_META.hot;

  const onColor = colors[meta.on];
  const subColor = withAlpha(onColor, 0.72);
  const short = truncateHash(address, 6, 4);
  const safeBalance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;

  const body = (
    <View
      style={[
        {
          minHeight: 176,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          backgroundColor: colors[meta.fill],
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
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
          top: -70,
          right: -50,
          width: 220,
          height: 220,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(onColor, 0.1),
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: onColor, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {label}
        </Text>
        {kind ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              backgroundColor: withAlpha(onColor, 0.18),
              borderRadius: tokens.radius.full,
              paddingVertical: 4,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            <Text style={{ fontSize: tokens.typography.scale.xs }}>{meta.glyph}</Text>
            <Text style={{ color: onColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {meta.label}
            </Text>
          </View>
        ) : null}
      </View>

      {loading ? (
        <View
          accessibilityLabel="Loading balance"
          style={{ height: 34, width: '62%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(onColor, 0.22) }}
        />
      ) : (
        <View style={{ gap: 2 }}>
          <Text style={{ color: subColor, fontSize: tokens.typography.scale.xs }}>Balance</Text>
          {safeBalance != null ? (
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
          ) : null}
          {nativeAmount != null ? (
            <Text style={{ color: subColor, fontSize: tokens.typography.scale.sm, fontVariant: ['tabular-nums'] }}>
              {formatToken(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol })}
            </Text>
          ) : null}
        </View>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Copy address ${address}`}
        onPress={onCopy ? () => onCopy(address) : undefined}
        disabled={!onCopy}
        style={({ pressed }) => ({
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(onColor, 0.14),
          borderRadius: tokens.radius.full,
          paddingVertical: 5,
          paddingHorizontal: tokens.spacing.sm,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{ color: onColor, fontSize: tokens.typography.scale.sm, fontVariant: ['tabular-nums'] }}>
          {short}
        </Text>
        {onCopy ? <Text style={{ color: subColor, fontSize: tokens.typography.scale.xs }}>⧉</Text> : null}
      </Pressable>
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
        style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
