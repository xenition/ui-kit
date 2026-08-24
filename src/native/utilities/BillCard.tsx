import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';
import { utilityKind, billStatus, type UtilityKind, type BillStatus } from './internal/status';

export type { UtilityKind, BillStatus };

export interface BillCardProps {
  /** Utility line — drives the leading glyph disc and label. */
  kind: UtilityKind;
  /** Account / provider name (e.g. "City Power & Light"). */
  provider: string;
  /** Account identifier (e.g. "ACCT-4821-93"). */
  accountNumber: string;
  /** Amount owed in integer **cents**. */
  amountCents: number;
  /** Localized due-date string (already formatted by the caller). */
  dueDate?: string;
  /** Bill lifecycle status — conveyed by text + glyph + color (default `due`). */
  status?: BillStatus;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Pay-now button label (default "Pay now"). Hidden when no `onPay`. */
  payLabel?: string;
  /** Fires when the pay action is pressed; the button shows only when supplied. */
  onPay?: () => void;
  /** Show a spinner and block the pay button. */
  paying?: boolean;
  /** Fires on card press (e.g. open bill detail); becomes a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A summary card for a single utility bill. The `kind` (electric/water/gas/…)
 * picks a tinted leading glyph disc; a status pill conveys the bill lifecycle by
 * **text + glyph + color** (paid → success, overdue → danger) — never color
 * alone. The amount is integer cents funnelled through `formatMoney`, so printed
 * values never drift. An optional pay `Button` renders only when `onPay` is
 * supplied, and the whole card becomes pressable when `onPress` is supplied.
 * Every color traces to a `SemanticColors` slot or a `ramps`-derived tint — no
 * literals.
 */
export function BillCard({
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
}: BillCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const sd = billStatus(status);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const settled = status === 'paid';

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
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Icon glyph={kd.glyph} size="xl" accessibilityLabel={`${kd.label} bill`} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {provider}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
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
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {settled ? 'Paid' : 'Amount due'}
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
            {format(amount, currency)}
          </Text>
        </View>
        {dueDate != null ? (
          <View style={{ alignItems: 'flex-end', gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {settled ? 'Paid on' : 'Due'}
            </Text>
            <Text
              style={{
                color: status === 'overdue' ? colors.danger : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
              }}
            >
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
    </Card>
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
