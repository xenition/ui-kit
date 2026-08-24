import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney as defaultFormat, type MoneyFormatter } from '../commerce';

export type CartBarVariant = 'primary' | 'accent';

export interface CartBarProps {
  /** Number of items in the cart; drives the count pill and empty state. */
  itemCount: number;
  /** Cart total in integer cents. */
  totalCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Primary action label (default `View cart`). */
  label?: string;
  /** Press handler for the bar / checkout action. */
  onPress?: () => void;
  /** Color variant (default `primary`). */
  variant?: CartBarVariant;
  /** Show a spinner-less "Updating…" busy state and block presses. */
  loading?: boolean;
  /** Copy shown when the cart is empty (default `Your cart is empty`). */
  emptyLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sticky bottom cart summary bar — item count, running total, and a primary
 * action. When `itemCount` is 0 it collapses to a muted, non-interactive empty
 * state; `loading` disables the press and shows a busy label. The bar uses the
 * `primary`/`accent` token pair for the filled action, so its text always meets
 * the contrast-guaranteed `on-*` slot. Token-only.
 */
export function CartBar({
  itemCount,
  totalCents,
  currency = 'USD',
  label = 'View cart',
  onPress,
  variant = 'primary',
  loading = false,
  emptyLabel = 'Your cart is empty',
  formatMoney = defaultFormat,
  style,
}: CartBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const empty = itemCount <= 0;
  const bg = variant === 'accent' ? colors.accent : colors.primary;
  const fg = variant === 'accent' ? colors.onAccent : colors.onPrimary;
  const disabled = empty || loading;

  const content = empty ? (
    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
      {emptyLabel}
    </Text>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            minWidth: 24,
            paddingHorizontal: tokens.spacing.xs,
            height: 24,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: fg,
          }}
        >
          <Text style={{ color: bg, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {itemCount}
          </Text>
        </View>
        <Text style={{ color: fg, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {loading ? 'Updating…' : label}
        </Text>
      </View>
      <Text style={{ color: fg, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {formatMoney(totalCents, currency)}
      </Text>
    </View>
  );

  const barStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      backgroundColor: empty ? colors.surface : bg,
      borderWidth: empty ? 1 : 0,
      borderColor: colors.border,
    },
    style,
  ];

  if (empty || !onPress) {
    return (
      <View accessibilityRole="summary" style={barStyle}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${itemCount} items, ${formatMoney(totalCents, currency)}`}
      accessibilityState={{ disabled, busy: loading }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [barStyle, { opacity: pressed ? 0.9 : 1 }]}
    >
      {content}
    </Pressable>
  );
}
