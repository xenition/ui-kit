import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { formatMoney, safeCents } from './internal';

export type QuickChargeBarVariant = 'bar' | 'inline';

export interface QuickChargeBarProps {
  /** Order total in integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Item count — when `0` the bar disables and shows the empty hint. */
  itemCount?: number;
  /** Charge handler. */
  onCharge?: () => void;
  /** Charge button copy (default `Charge`). The total is appended. */
  chargeLabel?: string;
  /** Show a spinner and block the charge (payment in flight). */
  loading?: boolean;
  /** Force-disable regardless of item count. */
  disabled?: boolean;
  /** Copy shown (in place of the total) when the cart is empty. */
  emptyLabel?: string;
  /** Secondary action slot (e.g. a "Split" button) rendered before Charge. */
  secondaryAction?: React.ReactNode;
  /** `bar` (default) is a bordered sticky footer; `inline` drops the chrome. */
  variant?: QuickChargeBarVariant;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The register's charge affordance — a sticky footer showing the running total
 * (integer **cents** via `formatMoney`) and item count beside a primary Charge
 * button. An empty cart (`itemCount === 0`) disables charging and swaps the
 * total for an `emptyLabel` hint, so the empty state is conveyed by text and the
 * button's `accessibilityState.disabled`, never color alone. `loading` shows the
 * `Button` spinner. Composed from the `Button` primitive; token-only colors.
 */
export function QuickChargeBar({
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
}: QuickChargeBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isEmpty = itemCount === 0;
  const canCharge = !disabled && !isEmpty && !loading;
  const total = safeCents(totalCents);

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
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
              {formatMoney(total, currency)}
            </Text>
            {typeof itemCount === 'number' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {itemCount} item{itemCount === 1 ? '' : 's'}
              </Text>
            ) : null}
          </>
        )}
      </View>

      {secondaryAction ? <View>{secondaryAction}</View> : null}

      <Button
        variant="primary"
        size="lg"
        onPress={onCharge}
        disabled={!canCharge}
        loading={loading}
      >
        {isEmpty ? chargeLabel : `${chargeLabel} ${formatMoney(total, currency)}`}
      </Button>
    </View>
  );
}
