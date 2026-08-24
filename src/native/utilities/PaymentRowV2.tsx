import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { formatMoney, withAlpha } from './internal/format';
import { paymentState } from './internal/status';
import type { PaymentRowProps } from './PaymentRow';

/** Same public contract as {@link PaymentRow} — a drop-in alternate design. */
export type PaymentRowV2Props = PaymentRowProps;

/**
 * PaymentRow, redesigned (v2): a **method card**. The whole payment is a Card: a
 * tinted method-glyph tile leads, the method and reference stack in the middle,
 * and the right column sets the amount big above a status pill. A failed /
 * refunded amount is muted + struck so it reads non-current. Springs on press.
 * Distinct at a glance from v1's bare dense row and v3's line. Same props; state
 * is glyph + label + tone (never color alone); integer cents; token-pure.
 */
export function PaymentRowV2({
  amountCents,
  date,
  status,
  method,
  reference,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PaymentRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = paymentState(status);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const voided = status === 'failed' || status === 'refunded';
  const press = usePressScale();

  const body = (
    <Card variant={onPress ? 'interactive' : 'elevated'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(tint, 0.14),
          }}
        >
          <Icon glyph={sd.glyph} size="lg" accessibilityLabel={sd.label} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {method ?? 'Payment'}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {reference != null ? `${date} · ${reference}` : date}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <Text
            style={{
              color: voided ? colors.muted : colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '700',
              textDecorationLine: voided ? 'line-through' : 'none',
            }}
          >
            {format(amount, currency)}
          </Text>
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>
      </View>
    </Card>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Payment ${format(amount, currency)}, ${date}, ${sd.label}`}
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
