import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { formatMoney } from './internal/format';
import { paymentState } from './internal/status';
import type { PaymentRowProps } from './PaymentRow';

/** Same public contract as {@link PaymentRow} — a drop-in alternate design. */
export type PaymentRowV3Props = PaymentRowProps;

/**
 * PaymentRow, redesigned (v3): a **dense scan line**. A small state glyph leads,
 * the method and a middot-joined `date · status · reference` caption stack in the
 * flexible middle, and the amount hugs the right (muted + struck when voided). No
 * disc, no card, no badge — the most compact of the three for long histories.
 * Distinct at a glance from v1/v2. Same props; state is glyph + label text (never
 * color alone); integer cents; token-pure.
 */
export function PaymentRowV3({
  amountCents,
  date,
  status,
  method,
  reference,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PaymentRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = paymentState(status);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const voided = status === 'failed' || status === 'refunded';

  const caption = [`${sd.glyph} ${sd.label}`, reference].filter((s): s is string => s != null).join(' · ');

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: tint }} />
      <Icon glyph={sd.glyph} size="sm" accessibilityLabel={sd.label} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {method ?? 'Payment'}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`${date} · ${caption}`}
        </Text>
      </View>
      <Text
        style={{
          color: voided ? colors.muted : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '700',
          textDecorationLine: voided ? 'line-through' : 'none',
        }}
      >
        {format(amount, currency)}
      </Text>
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
