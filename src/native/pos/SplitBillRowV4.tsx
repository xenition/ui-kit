import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, safeCents, withAlpha } from './internal';
import type { SplitBillRowProps } from './SplitBillRow';

/** Drop-in for {@link SplitBillRowProps} — same props, the V4 "register" design. */
export type SplitBillRowV4Props = SplitBillRowProps;

/**
 * SplitBillRow — **V4** "register" design. The tactile checkout take on a
 * split-bill row: a guest/share label with its item count, this party's **share
 * drawn big and bold** in `tabular-nums`, and a clear **paid/unpaid** state —
 * settled parties get a soft-success glow with a `✓ Paid` flag (word, not color
 * alone) and a large (≥44px) check control; unpaid parties get a primary "Pay"
 * settle affordance (≥44px). `selected` draws an accent ring reflected in
 * `accessibilityState`. Same props/behavior as {@link SplitBillRowProps};
 * token-only tints via `useXenitionTheme()` + `withAlpha`. Dark-mode safe.
 */
export function SplitBillRowV4({
  label,
  amountCents,
  currency = 'USD',
  itemCount,
  paid = false,
  selected = false,
  paidCents,
  onPress,
  onTogglePaid,
  variant = 'even',
  testID,
  style,
}: SplitBillRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const amount = safeCents(amountCents);
  const settled = paid || (typeof paidCents === 'number' && safeCents(paidCents) >= amount && amount > 0);
  const remaining = typeof paidCents === 'number' ? Math.max(0, amount - safeCents(paidCents)) : amount;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 2,
          borderColor: selected ? colors.primary : settled ? 'transparent' : colors.border,
          backgroundColor: selected
            ? withAlpha(colors.primary, 0.1)
            : settled
              ? withAlpha(colors.success, 0.12)
              : colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {variant === 'custom' ? 'Custom' : 'Even split'}
          {typeof itemCount === 'number' && itemCount > 0 ? ` · ${itemCount} item${itemCount === 1 ? '' : 's'}` : ''}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
          {formatMoney(amount, currency)}
        </Text>
        {settled ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            ✓ Paid
          </Text>
        ) : typeof paidCents === 'number' && safeCents(paidCents) > 0 ? (
          <Text style={{ color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {formatMoney(remaining, currency)} left
          </Text>
        ) : null}
      </View>

      {onTogglePaid ? (
        settled ? (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: true }}
            accessibilityLabel={`Mark ${label} unpaid`}
            onPress={onTogglePaid}
            hitSlop={8}
            style={{
              width: 44,
              height: 44,
              borderRadius: tokens.radius.full,
              borderWidth: 2,
              borderColor: colors.success,
              backgroundColor: colors.success,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
              ✓
            </Text>
          </Pressable>
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: false }}
            accessibilityLabel={`Mark ${label} paid`}
            onPress={onTogglePaid}
            hitSlop={8}
            style={({ pressed }) => ({
              minWidth: 44,
              height: 44,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              Pay
            </Text>
          </Pressable>
        )
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={`${label}, ${formatMoney(amount, currency)}${settled ? ', paid' : ''}`}
        onPress={onPress}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
