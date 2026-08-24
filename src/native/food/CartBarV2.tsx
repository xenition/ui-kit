import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney as defaultFormat } from '../commerce';
import { shadow } from '../primitives/internal/elevation';
import type { CartBarProps } from './CartBar';

/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV2Props = CartBarProps;

/**
 * CartBar, alternate design **V2** — an *elevated floating pill*. Instead of a
 * full-width filled bar, V2 is a rounded-full, self-centred pill that hovers
 * above the content with a real drop shadow — the classic "N items · total"
 * FAB-style checkout affordance. Empty and `loading` states behave exactly as
 * the classic (collapses to a muted, non-interactive pill). Same props.
 */
export function CartBarV2({
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
}: CartBarV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const empty = itemCount <= 0;
  const bg = variant === 'accent' ? colors.accent : colors.primary;
  const fg = variant === 'accent' ? colors.onAccent : colors.onPrimary;
  const disabled = empty || loading;

  const pillStyle: StyleProp<ViewStyle> = [
    {
      alignSelf: 'center',
      maxWidth: 480,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: tokens.spacing.md,
      borderRadius: tokens.radius.full,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.lg,
      backgroundColor: empty ? colors.surface : bg,
      borderWidth: empty ? 1 : 0,
      borderColor: colors.border,
      ...shadow(empty ? 'sm' : 'lg', tokens),
    },
    style,
  ];

  if (empty) {
    return (
      <View accessibilityRole="summary" style={pillStyle}>
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const content = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            minWidth: 26,
            height: 26,
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: fg,
          }}
        >
          <Text style={{ color: bg, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>{itemCount}</Text>
        </View>
        <Text style={{ color: fg, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {loading ? 'Updating…' : label}
        </Text>
      </View>
      <Text style={{ color: fg, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
        {formatMoney(totalCents, currency)}
      </Text>
    </>
  );

  if (!onPress) {
    return (
      <View accessibilityRole="summary" style={pillStyle}>
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
      style={({ pressed }) => [pillStyle, { opacity: pressed ? 0.9 : 1 }]}
    >
      {content}
    </Pressable>
  );
}
