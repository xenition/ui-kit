import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { formatMoney as defaultFormat } from '../commerce';
import { withAlpha } from '../primitives/internal/color';
import type { CartBarProps } from './CartBar';

/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV3Props = CartBarProps;

const MAX_DOTS = 6;

/**
 * CartBar, alternate design **V3** — a *full-width itemised bar*. A surface-
 * toned bar with a top hairline that splits into a summary block (a row of dots
 * previewing how many items are in the cart, plus the running total) and a
 * distinct filled action Button — rather than the classic single filled pill.
 * The whole bar is pressable when `onPress` is set; empty/`loading` behave as
 * the classic. Same props as the classic.
 */
export function CartBarV3({
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
}: CartBarV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const empty = itemCount <= 0;
  const accent = variant === 'accent' ? colors.accent : colors.primary;
  const disabled = empty || loading;

  const barStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: tokens.spacing.md,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderColor: colors.border,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
    },
    style,
  ];

  if (empty) {
    return (
      <View accessibilityRole="summary" style={barStyle}>
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const dotCount = Math.min(MAX_DOTS, Math.max(1, itemCount));
  const dots = Array.from({ length: dotCount }, (_, i) => (
    <View
      key={i}
      style={{ width: 6, height: 6, borderRadius: tokens.radius.full, backgroundColor: withAlpha(accent, 0.55) }}
    />
  ));

  const summary = (
    <View style={{ flex: 1, gap: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>{dots}</View>
        {itemCount > MAX_DOTS ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>+{itemCount - MAX_DOTS}</Text>
        ) : null}
      </View>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
        {formatMoney(totalCents, currency)}
      </Text>
    </View>
  );

  const action = (
    <Button
      size="md"
      variant={variant === 'accent' ? 'secondary' : 'primary'}
      disabled={disabled}
      loading={loading}
      onPress={onPress}
    >
      {label}
    </Button>
  );

  // The action Button is the sole press target — no outer Pressable, so the
  // handler never double-fires. The bar itself is a plain summary container.
  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`${itemCount} items, ${formatMoney(totalCents, currency)}`}
      style={barStyle}
    >
      {summary}
      {action}
    </View>
  );
}
