import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Badge } from '../primitives';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatToken, truncateHash } from './internal/format';

/** Custody kind of the wallet. */
export type WalletKind = 'hot' | 'hardware' | 'watch';

export type WalletCardVariant = 'elevated' | 'outlined' | 'accent';

export interface WalletCardProps {
  /** Public address (truncated for display; full string used for copy/a11y). */
  address: string;
  /** Friendly label (e.g. `Main Wallet`). */
  label?: string;
  /** Total portfolio value in integer **cents**. */
  balanceCents?: number;
  /** ISO 4217 currency for the fiat balance (default `USD`). */
  currency?: string;
  /** Native-token balance amount (e.g. `1.245`). */
  nativeAmount?: number;
  /** Native-token ticker (e.g. `ETH`). */
  nativeSymbol?: string;
  /** Fraction digits for the native amount (default `4`). */
  nativeDecimals?: number;
  /** Custody kind — shown as a tone-mapped badge. */
  kind?: WalletKind;
  variant?: WalletCardVariant;
  /** Skeleton state while the balance loads. */
  loading?: boolean;
  /** Fires with the full address when the address chip is pressed. */
  onCopy?: (address: string) => void;
  /** Fires when the card body is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const KIND_META: Record<WalletKind, { label: string; tone: 'warn' | 'success' | 'neutral'; glyph: string }> = {
  hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
  hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
  watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};

/**
 * The header card for a single wallet: a friendly label + custody badge, the
 * total fiat balance (via {@link MoneyAmount}, so the printed value never
 * drifts), the native-token amount, and a pressable truncated-address chip
 * that hands the FULL address back through `onCopy`. Token-bound throughout;
 * the `accent` variant tints the surface from the primary ramp.
 */
export function WalletCard({
  address,
  label = 'Wallet',
  balanceCents,
  currency = 'USD',
  nativeAmount,
  nativeSymbol,
  nativeDecimals = 4,
  kind,
  variant = 'elevated',
  loading = false,
  onCopy,
  onPress,
  style,
}: WalletCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const short = truncateHash(address, 6, 4);
  const kindMeta = kind ? KIND_META[kind] : undefined;

  const cardVariant = variant === 'accent' ? 'elevated' : variant;
  const accentStyle: StyleProp<ViewStyle> =
    variant === 'accent' ? { backgroundColor: tokens.ramps.primary[100] } : null;

  const inner = (
    <View style={{ gap: tokens.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {label}
        </Text>
        {kindMeta ? (
          <Badge tone={kindMeta.tone} variant="soft" size="sm">
            {`${kindMeta.glyph} ${kindMeta.label}`}
          </Badge>
        ) : null}
      </View>

      {loading ? (
        <View
          accessibilityLabel="Loading balance"
          style={{ height: 32, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border, opacity: 0.5 }}
        />
      ) : (
        <View style={{ gap: 2 }}>
          {balanceCents != null ? (
            <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="xl" />
          ) : null}
          {nativeAmount != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontVariant: ['tabular-nums'] }}>
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
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.full,
          paddingVertical: 4,
          paddingHorizontal: tokens.spacing.sm,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontVariant: ['tabular-nums'],
          }}
        >
          {short}
        </Text>
        {onCopy ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>⧉</Text>
        ) : null}
      </Pressable>
    </View>
  );

  return (
    <Card variant={cardVariant} style={[accentStyle, style]}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={label}
          onPress={onPress}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          {inner}
        </Pressable>
      ) : (
        inner
      )}
    </Card>
  );
}
