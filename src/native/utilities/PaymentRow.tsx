import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';
import { paymentState, type PaymentState } from './internal/status';

export type { PaymentState };

export interface PaymentRowProps {
  /** Amount of the payment in integer **cents**. */
  amountCents: number;
  /** Localized date string (already formatted by the caller). */
  date: string;
  /** Settlement state — conveyed by text + glyph + color. */
  status: PaymentState;
  /** Payment method label (e.g. "Visa ···4242", "Bank ···1881"). */
  method?: string;
  /** Reference / confirmation number. */
  reference?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on row press (e.g. open receipt); becomes a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a payment history: a tinted state glyph disc, a method/date stack,
 * a right-aligned amount, and a status pill. The state is conveyed redundantly
 * (glyph + label + a color that traces to a `SemanticColors` slot: paid →
 * success, failed → danger) so it is never color-alone. A refunded/failed amount
 * is shown muted with a strike so it reads as non-current at a glance. Amount is
 * integer cents via `formatMoney`. Becomes a button only when `onPress` is
 * supplied.
 */
export function PaymentRow({
  amountCents,
  date,
  status,
  method,
  reference,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PaymentRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = paymentState(status);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const voided = status === 'failed' || status === 'refunded';

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
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={sd.glyph} accessibilityLabel={sd.label} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {method ?? 'Payment'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text
          style={{
            color: voided ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            textDecorationLine: voided ? 'line-through' : 'none',
          }}
        >
          {format(amount, currency)}
        </Text>
        {reference != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {reference}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Payment ${format(amount, currency)}, ${date}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
