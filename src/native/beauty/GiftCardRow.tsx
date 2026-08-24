import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export type GiftCardStatus = 'active' | 'redeemed' | 'expired' | 'pending';

interface StatusMeta {
  label: string;
  slot: keyof SemanticColors;
}

const STATUS_META: Record<GiftCardStatus, StatusMeta> = {
  active: { label: 'Active', slot: 'success' },
  redeemed: { label: 'Redeemed', slot: 'muted' },
  expired: { label: 'Expired', slot: 'danger' },
  pending: { label: 'Pending', slot: 'warn' },
};

export interface GiftCardRowProps {
  /** Face value / original amount in integer cents. */
  amountCents: number;
  /** Remaining balance in cents. Defaults to `amountCents`. */
  balanceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Gift-card code (partially shown; use a masked value if sensitive). */
  code?: string;
  /** Lifecycle status; drives the badge + accent. Falls back to `active`. */
  status?: GiftCardStatus;
  /** Expiry date string (e.g. "Exp 12/26"). */
  expires?: string;
  /** Recipient / sender note. */
  note?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires when the row is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A gift-card wallet row: a gift glyph, the face value with remaining balance,
 * the (masked) code and expiry, and a status badge. `status` carries the state
 * word and accent (never color alone) — `redeemed`/`expired` dim the row. When
 * balance differs from the face value both are shown. Amounts are integer cents
 * via {@link formatMoney}. Token-only colors via semantic slots + `withAlpha`.
 */
export function GiftCardRow({
  amountCents,
  balanceCents,
  currency = 'USD',
  code,
  status = 'active',
  expires,
  note,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: GiftCardRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status] ?? STATUS_META.active;
  const accent = colors[meta.slot];
  const balance = typeof balanceCents === 'number' ? balanceCents : amountCents;
  const spent = balance < amountCents;
  const dim = status === 'redeemed' || status === 'expired';

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`Gift card ${format(balance, currency)}${spent ? ` of ${format(amountCents, currency)}` : ''}, ${meta.label}${
        expires ? `, ${expires}` : ''
      }`}
      accessibilityState={{ disabled: dim }}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          opacity: dim ? 0.6 : pressed && onPress ? 0.94 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(accent, 0.16),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          🎁
        </Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {format(balance, currency)}
          </Text>
          {spent ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>of {format(amountCents, currency)}</Text>
          ) : null}
        </View>
        {code ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{code}</Text> : null}
        {note ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {note}
          </Text>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <View style={{ borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1, backgroundColor: withAlpha(accent, 0.16) }}>
          <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
        </View>
        {expires ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{expires}</Text> : null}
      </View>
    </Pressable>
  );
}
