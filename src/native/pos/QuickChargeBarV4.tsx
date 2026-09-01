import * as React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, safeCents } from './internal';
import { registerGradient, registerInk } from './internal/register';
import { GradientSurface } from './internal/GradientSurface';
import type { QuickChargeBarProps } from './QuickChargeBar';

/** Drop-in for {@link QuickChargeBarProps} — same props, the V4 "register" design. */
export type QuickChargeBarV4Props = QuickChargeBarProps;

/**
 * QuickChargeBar — **V4** "register" design. The checkout peak: the running
 * **total is big and bold** (integer **cents** via `formatMoney`) on the crisp
 * bar, and the large (≥44px) **Charge** button sits on the brand gradient
 * (`registerGradient`) with the total repeated in near-white `registerInk` — the
 * moment the counter is built around. An empty cart (`itemCount === 0`) disables
 * charging and swaps the total for the `emptyLabel` hint, so the empty state
 * reads by text + the button's `accessibilityState.disabled`, never color alone.
 * `loading` shows a spinner and blocks the charge. Same props/behavior as
 * {@link QuickChargeBarProps}; token-only colors (bar surface via
 * `useXenitionTheme()`, gradient via `GradientSurface`).
 */
export function QuickChargeBarV4({
  totalCents,
  currency = 'USD',
  itemCount,
  onCharge,
  chargeLabel = 'Charge',
  loading = false,
  disabled = false,
  emptyLabel = 'Cart empty',
  secondaryAction,
  variant = 'bar',
  testID,
  style,
}: QuickChargeBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isEmpty = itemCount === 0;
  const canCharge = !disabled && !isEmpty && !loading;
  const total = safeCents(totalCents);
  const ink = registerInk(tokens.ramps);
  const gradient = registerGradient(tokens.ramps);
  const chargeText = isEmpty ? chargeLabel : `${chargeLabel} ${formatMoney(total, currency)}`;

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: variant === 'bar' ? tokens.spacing.md : 0,
          borderTopWidth: variant === 'bar' ? 1 : 0,
          borderTopColor: colors.border,
          backgroundColor: variant === 'bar' ? colors.surface : 'transparent',
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        {isEmpty ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {emptyLabel}
          </Text>
        ) : (
          <>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {formatMoney(total, currency)}
            </Text>
            {typeof itemCount === 'number' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
                {itemCount} item{itemCount === 1 ? '' : 's'}
              </Text>
            ) : null}
          </>
        )}
      </View>

      {secondaryAction ? <View>{secondaryAction}</View> : null}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !canCharge }}
        accessibilityLabel={chargeText}
        disabled={!canCharge}
        onPress={onCharge}
        style={({ pressed }) => ({
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          opacity: canCharge ? (pressed ? 0.92 : 1) : 0.5,
          ...(canCharge
            ? { shadowColor: gradient[gradient.length - 1], shadowOpacity: 0.24, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
        })}
      >
        <GradientSurface
          colors={gradient}
          style={{
            minHeight: 44,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.sm,
          }}
        >
          {loading ? <ActivityIndicator size="small" color={ink} /> : null}
          <Text
            allowFontScaling={false}
            style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }}
          >
            {chargeText}
          </Text>
        </GradientSurface>
      </Pressable>
    </View>
  );
}
