import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Button } from '../primitives';
import { formatMoney } from './internal/format';
import { utilityKind, billStatus } from './internal/status';
import type { BillCardProps } from './BillCard';

/** Same public contract as {@link BillCard} — a drop-in alternate design. */
export type BillCardV3Props = BillCardProps;

/**
 * BillCard, redesigned (v3): a **dense scan line**. A small state dot leads, the
 * provider and a middot-joined `line · account · status · due` caption share the
 * flexible middle, and the amount hugs the right with an optional compact pay
 * button beneath it. No card, no glyph tile — tuned for long bill lists. Distinct
 * at a glance from v1/v2. Same props; status is dot + glyph + label text (never
 * color alone); integer cents; token-pure.
 */
export function BillCardV3({
  kind,
  provider,
  accountNumber,
  amountCents,
  dueDate,
  status = 'due',
  currency = 'USD',
  formatMoney: format = formatMoney,
  payLabel = 'Pay',
  onPay,
  paying = false,
  onPress,
  style,
}: BillCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const sd = billStatus(status);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const settled = status === 'paid';
  const overdue = status === 'overdue';
  const dotColor = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];

  const caption = [`${sd.glyph} ${sd.label}`, kd.label, dueDate].filter((s): s is string => s != null).join(' · ');

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: dotColor }} />
      <Icon glyph={kd.glyph} size="sm" accessibilityLabel={`${kd.label} bill`} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {provider}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`${caption} · ${accountNumber}`}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <Text
          style={{
            color: overdue ? colors.danger : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
          }}
        >
          {format(amount, currency)}
        </Text>
        {onPay != null && !settled ? (
          <Button variant="primary" size="sm" tone={overdue ? 'danger' : 'default'} onPress={onPay} loading={paying}>
            {payLabel}
          </Button>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
