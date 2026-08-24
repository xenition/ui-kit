import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { formatMoney, PAYSLIP_STATUS_META, toneColor } from './internal';
import type { PayslipRowProps } from './PayslipRow';

/** Drop-in alternate design for {@link PayslipRow} — identical Props. */
export type PayslipRowV3Props = PayslipRowProps;

/**
 * PayslipRow, design **V3** — a dense statement line for a payroll list. Period
 * (and pay date) on the left, net pay pinned right with a leading status glyph +
 * word beneath it (never color alone). Money stays integer **cents** through
 * `formatMoney`. Same Props as {@link PayslipRow}; the gross/deductions
 * breakdown is dropped for density. Press-scales on tap; token-pure.
 */
export function PayslipRowV3({
  period,
  netCents,
  currency = 'USD',
  status,
  payDate,
  onPress,
  testID,
  style,
}: PayslipRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const statusMeta = status ? PAYSLIP_STATUS_META[status] : undefined;

  const row = (
    <Animated.View
      style={[
        {
          transform: [{ scale: press.scale }],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{period}</Text>
        {payDate ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Paid {payDate}</Text> : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{formatMoney(netCents, currency)}</Text>
        {statusMeta ? (
          <View accessibilityLabel={statusMeta.label} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}>
            <Text style={{ color: toneColor(colors, statusMeta.tone), fontSize: tokens.typography.scale.xs }}>{statusMeta.glyph}</Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{statusMeta.label}</Text>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Payslip ${period}, net ${formatMoney(netCents, currency)}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        testID={testID}
      >
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
