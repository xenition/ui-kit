import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { formatMoney, withAlpha, type MoneyFormatter } from './internal/format';

/** Settlement state of a tax account for a period. */
export type TaxStatus = 'owed' | 'refund' | 'paid' | 'overdue' | 'filed';

const STATUS: Record<TaxStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
  refund: { label: 'Refund', glyph: '💵', tone: 'success' },
  paid: { label: 'Paid', glyph: '✓', tone: 'success' },
  overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
  filed: { label: 'Filed', glyph: '📄', tone: 'primary' },
};

export interface TaxSummaryCardProps {
  /** Tax year / period label (e.g. "2025" or "Q2 2026"). */
  taxYear: string;
  /** Kind of tax (e.g. "Property tax", "Income tax"). */
  taxType?: string;
  /** Account settlement status (default `owed`). */
  status?: TaxStatus;
  /** Primary amount in integer **cents** — balance due or refund total. */
  amountCents: number;
  /** Amount already paid this period, in integer **cents**. */
  paidCents?: number;
  /** Localized due date (already formatted). */
  dueDate?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires "Pay now" (shown only for owed / overdue balances). */
  onPay?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tax-account summary for one period: the settlement status conveyed by
 * **text + glyph + color** (never color alone), the primary balance / refund as
 * integer cents through `formatMoney`, an optional amount-paid line, and a
 * gated "Pay now" action for owed / overdue balances. The headline amount is
 * toned success for a refund and danger when overdue. Every color traces to a
 * `SemanticColors` slot or a token-derived tint — no literals.
 */
export function TaxSummaryCard({
  taxYear,
  taxType,
  status = 'owed',
  amountCents,
  paidCents,
  dueDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPay,
  style,
}: TaxSummaryCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.owed;
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const isPayable = status === 'owed' || status === 'overdue';
  const amountColor =
    status === 'refund' || status === 'paid'
      ? colors.success
      : status === 'overdue'
        ? colors.danger
        : colors.onSurface;

  return (
    <Card variant="elevated" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(sd.tone === 'neutral' ? colors.muted : colors[sd.tone], 0.14),
          }}
        >
          <Icon glyph="🧾" size="xl" accessibilityLabel="Tax summary" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {taxType ?? 'Tax'} · {taxYear}
          </Text>
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>
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
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {status === 'refund' ? 'Refund' : 'Balance'}
          </Text>
          <Text style={{ color: amountColor, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
            {format(amount, currency)}
          </Text>
        </View>
        {paidCents != null ? (
          <View style={{ alignItems: 'flex-end', gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Paid</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {format(Math.max(0, Math.trunc(paidCents)), currency)}
            </Text>
          </View>
        ) : null}
      </View>

      {dueDate != null ? (
        <Text style={{ marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          Due {dueDate}
        </Text>
      ) : null}

      {isPayable && onPay != null && amount > 0 ? (
        <View style={{ marginTop: tokens.spacing.md, alignItems: 'flex-end' }}>
          <Button size="sm" tone={status === 'overdue' ? 'danger' : 'default'} onPress={onPay}>
            Pay now
          </Button>
        </View>
      ) : null}
    </Card>
  );
}
