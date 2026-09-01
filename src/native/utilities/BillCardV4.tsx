import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge, Button } from '../primitives';
import { formatMoney } from './internal/format';
import { utilityKind, billStatus } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { BillCardProps } from './BillCard';

/** Drop-in for {@link BillCardProps} — same props, a different design. */
export type BillCardV4Props = BillCardProps;

/**
 * BillCard — **V4** design. The clean, trust-first bill card: an elevated
 * rounded surface, the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch), a status pill carrying text + glyph + color, and the
 * amount due in integer cents via `formatMoney`. Restraint by design — the money
 * stays on the calm surface; only the small disc is gradient. An optional pay
 * `Button` (danger tone when overdue) and whole-card press are preserved. Same
 * props as {@link BillCardProps}; token-only colors.
 */
export function BillCardV4({
  kind,
  provider,
  accountNumber,
  amountCents,
  dueDate,
  status = 'due',
  currency = 'USD',
  formatMoney: format = formatMoney,
  payLabel = 'Pay now',
  onPay,
  paying = false,
  onPress,
  style,
}: BillCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const kd = utilityKind(kind);
  const sd = billStatus(status);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const settled = status === 'paid';

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

  const body = (
    <View style={[card, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{ width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <Icon glyph={kd.glyph} size="xl" accessibilityLabel={`${kd.label} bill`} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {provider}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
            {kd.label} · {accountNumber}
          </Text>
        </View>
        <Badge tone={sd.tone} variant="soft">
          {`${sd.glyph} ${sd.label}`}
        </Badge>
      </View>

      <View
        style={{
          marginTop: tokens.spacing.md,
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
            {settled ? 'Paid' : 'Amount due'}
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
            {format(amount, currency)}
          </Text>
        </View>
        {dueDate != null ? (
          <View style={{ alignItems: 'flex-end', gap: 2 }}>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
              {settled ? 'Paid on' : 'Due'}
            </Text>
            <Text style={{ color: status === 'overdue' ? colors.dangerText : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {dueDate}
            </Text>
          </View>
        ) : null}
      </View>

      {onPay != null && !settled ? (
        <Button
          variant="primary"
          tone={status === 'overdue' ? 'danger' : 'default'}
          onPress={onPay}
          loading={paying}
          style={{ marginTop: tokens.spacing.md }}
        >
          {`${payLabel} · ${format(amount, currency)}`}
        </Button>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
