import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import { formatMoney, PAYSLIP_STATUS_META, type PayslipStatus } from './internal';

export type PayslipRowVariant = 'default' | 'compact';

export interface PayslipRowProps {
  /** Pay period label (e.g. "Aug 1–15, 2026"). */
  period: string;
  /** Net (take-home) pay in integer **cents**. */
  netCents: number;
  /** Gross pay in integer **cents** (shown on the default variant). */
  grossCents?: number;
  /** Total deductions in integer **cents** (shown on the default variant). */
  deductionsCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Payment status — glyph + word pill. */
  status?: PayslipStatus;
  /** Pre-formatted pay date. */
  payDate?: string;
  /** Density. */
  variant?: PayslipRowVariant;
  /** Tap handler (e.g. open the full payslip / download PDF). */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One payroll line: pay period, net pay, and optional gross / deductions
 * breakdown. Money is carried as integer **cents** and rendered through the
 * shared `formatMoney` for stable 2-decimal output. Payment status is a glyph +
 * word pill so it never rests on color alone. `compact` shows only period + net.
 * All colors are theme tokens — no literals.
 */
export function PayslipRow({
  period,
  netCents,
  grossCents,
  deductionsCents,
  currency = 'USD',
  status,
  payDate,
  variant = 'default',
  onPress,
  testID,
  style,
}: PayslipRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const content = (
    <View
      style={[
        {
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {period}
          </Text>
          {payDate ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Paid {payDate}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {formatMoney(netCents, currency)}
          </Text>
          {status ? <StatusPill meta={PAYSLIP_STATUS_META[status]} variant="inline" size="sm" /> : null}
        </View>
      </View>

      {!compact && (grossCents != null || deductionsCents != null) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.lg }}>
          {grossCents != null ? (
            <View>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Gross</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {formatMoney(grossCents, currency)}
              </Text>
            </View>
          ) : null}
          {deductionsCents != null ? (
            <View>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Deductions</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                −{formatMoney(deductionsCents, currency)}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Payslip ${period}, net ${formatMoney(netCents, currency)}`}
        onPress={onPress}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
