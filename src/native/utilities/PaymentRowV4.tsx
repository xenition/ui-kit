import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { formatMoney } from './internal/format';
import { paymentState } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { PaymentRowProps } from './PaymentRow';

/** Drop-in for {@link PaymentRowProps} — same props, a different design. */
export type PaymentRowV4Props = PaymentRowProps;

/**
 * PaymentRow — **V4** design. The clean, trust-first payment line: an elevated
 * rounded surface, the settlement-state glyph in a small brand-gradient disc (the
 * signature V4 touch), a method/date stack with a status pill, and a right-aligned
 * amount. The state is still conveyed redundantly (glyph + label + a color that
 * traces to a `SemanticColors` slot: paid → success, failed → danger) so it is
 * never color-alone, and a refunded/failed amount stays muted with a strike.
 * Amount is integer cents via `formatMoney`; becomes a button only when `onPress`
 * is supplied. Same props as {@link PaymentRowProps}; token-only colors.
 */
export function PaymentRowV4({
  amountCents,
  date,
  status,
  method,
  reference,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PaymentRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const sd = paymentState(status);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const voided = status === 'failed' || status === 'refunded';

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  const row = (
    <View style={[card, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style]}>
      <GradientSurface
        colors={brandDisc(r)}
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Icon glyph={sd.glyph} size="lg" accessibilityLabel={sd.label} style={{ color: brandInk(r) }} />
      </GradientSurface>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {method ?? 'Payment'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{date}</Text>
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text
          style={{
            color: voided ? colors.mutedText : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            textDecorationLine: voided ? 'line-through' : 'none',
          }}
        >
          {format(amount, currency)}
        </Text>
        {reference != null ? (
          <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {row}
    </Pressable>
  );
}
