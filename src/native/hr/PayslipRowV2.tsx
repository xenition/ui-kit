import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import { formatMoney, PAYSLIP_STATUS_META } from './internal';
import type { PayslipRowProps } from './PayslipRow';

/** Drop-in alternate design for {@link PayslipRow} — identical Props. */
export type PayslipRowV2Props = PayslipRowProps;

/**
 * PayslipRow, design **V2** — an expanded pay-statement card. A hero net figure
 * sits above a gross → deductions → net breakdown, with a take-home meter
 * showing net as a share of gross. Money stays integer **cents** through
 * `formatMoney`; payment status is a glyph + word pill (never color alone).
 * Same Props as {@link PayslipRow}. Elevated + mount-fade, token-pure.
 */
export function PayslipRowV2({
  period,
  netCents,
  grossCents,
  deductionsCents,
  currency = 'USD',
  status,
  payDate,
  onPress,
  testID,
  style,
}: PayslipRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  // Take-home share of gross, guarded against a missing/zero gross.
  const takeHomePct =
    grossCents != null && grossCents > 0
      ? Math.max(0, Math.min(100, Math.round((netCents / grossCents) * 100)))
      : null;

  const card = (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{period}</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
            {formatMoney(netCents, currency)}
          </Text>
          {payDate ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Paid {payDate}</Text> : null}
        </View>
        {status ? <StatusPill meta={PAYSLIP_STATUS_META[status]} size="sm" /> : null}
      </View>

      {grossCents != null || deductionsCents != null ? (
        <View style={{ gap: tokens.spacing.xs, padding: tokens.spacing.sm, borderRadius: tokens.radius.md, backgroundColor: withAlpha(colors.onSurface, 0.04) }}>
          {grossCents != null ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Gross</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{formatMoney(grossCents, currency)}</Text>
            </View>
          ) : null}
          {deductionsCents != null ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Deductions</Text>
              <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>−{formatMoney(deductionsCents, currency)}</Text>
            </View>
          ) : null}
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.xs / 2 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>Net</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{formatMoney(netCents, currency)}</Text>
          </View>

          {takeHomePct != null ? (
            <View style={{ gap: tokens.spacing.xs / 2, marginTop: tokens.spacing.xs / 2 }}>
              <View
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: 100, now: takeHomePct }}
                style={{ height: 6, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.onSurface, 0.1), overflow: 'hidden' }}
              >
                <View style={{ width: `${takeHomePct}%`, height: '100%', backgroundColor: colors.success }} />
              </View>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Take-home {takeHomePct}% of gross</Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Payslip ${period}, net ${formatMoney(netCents, currency)}`}
        onPress={onPress}
        testID={testID}
      >
        {card}
      </Pressable>
    );
  }
  return <View testID={testID}>{card}</View>;
}
