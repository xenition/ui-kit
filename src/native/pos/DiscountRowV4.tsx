import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, safeCents, withAlpha, type DiscountType } from './internal';
import type { DiscountRowProps } from './DiscountRow';

/** Re-exported so consumers of the V4 line can type discount kinds. */
export type { DiscountType };

/** Drop-in for {@link DiscountRowProps} — same props, the V4 "register" design. */
export type DiscountRowV4Props = DiscountRowProps;

/**
 * DiscountRow — **V4** "register" design. The tactile checkout take on a discount
 * line: a tag glyph in a soft-tint disc, the label with its percent/amount basis,
 * an optional note, and the **negative money impact drawn big and bold** in
 * `tabular-nums` (the savings that matter at the counter) — plus a large (≥44px)
 * remove affordance. With no active discount it collapses to a crisp, rounded
 * dashed "Add discount" button that fires `onAdd`. Same props/behavior as
 * {@link DiscountRowProps}; token-only tints via `useXenitionTheme()` +
 * `withAlpha`. Savings tone = `success`; one accent = `primary`. Dark-mode safe.
 */
export function DiscountRowV4({
  label,
  type = 'amount',
  value,
  amountCents,
  currency = 'USD',
  note,
  active,
  onEdit,
  onRemove,
  onAdd,
  addLabel = 'Add discount',
  variant = 'default',
  testID,
  style,
}: DiscountRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const isActive = active ?? (safeCents(amountCents) > 0 || (label != null && label !== ''));

  if (!isActive) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={addLabel}
        onPress={onAdd}
        testID={testID}
        style={({ pressed }) => [
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            minHeight: 44,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: colors.border,
            backgroundColor: pressed ? withAlpha(colors.primary, 0.08) : colors.surface,
          },
          style,
        ]}
      >
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Text allowFontScaling={false} style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
            ＋
          </Text>
        </View>
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {addLabel}
        </Text>
      </Pressable>
    );
  }

  const basis: string | undefined =
    type === 'percent' && typeof value === 'number'
      ? `${value}%`
      : type === 'amount' && typeof value === 'number'
        ? formatMoney(value, currency)
        : undefined;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
          paddingHorizontal: compact ? tokens.spacing.sm : tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: compact ? 32 : 36,
            height: compact ? 32 : 36,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.success, 0.14),
          }}
        >
          <Text allowFontScaling={false} style={{ color: colors.success, fontSize: tokens.typography.scale.sm }}>
            🏷
          </Text>
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {label ?? 'Discount'}
            {basis ? ` · ${basis}` : ''}
          </Text>
          {!compact && note ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {note}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            borderRadius: tokens.radius.md,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
            backgroundColor: withAlpha(colors.success, 0.14),
          }}
        >
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            −{formatMoney(amountCents ?? 0, currency)}
          </Text>
        </View>
        {onRemove ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remove ${label ?? 'discount'}`}
            onPress={onRemove}
            hitSlop={8}
            style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: tokens.radius.full }}
          >
            <Text allowFontScaling={false} style={{ color: colors.danger, fontSize: tokens.typography.scale.lg }}>
              ✕
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  if (onEdit) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Edit ${label ?? 'discount'}`}
        onPress={onEdit}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
