import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, safeCents, type DiscountType } from './internal';

export type DiscountRowVariant = 'default' | 'compact';

export interface DiscountRowProps {
  /** Discount label (e.g. "Loyalty 10%", "Manager comp"). */
  label?: string;
  /** How the discount is expressed. */
  type?: DiscountType;
  /** The raw value: a percentage (0–100) for `percent`, else cents for `amount`. */
  value?: number;
  /** The resolved money impact in integer **cents** (always shown negative). */
  amountCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Optional reason / authorization note. */
  note?: string;
  /**
   * When `false` (or omitted with an `onAdd`), the row renders an "Add
   * discount" affordance instead of a resolved discount.
   */
  active?: boolean;
  /** Edit handler; makes the resolved row tappable. */
  onEdit?: () => void;
  /** Remove handler; renders a remove control. */
  onRemove?: () => void;
  /** Add handler; used by the empty/add affordance. */
  onAdd?: () => void;
  /** Copy for the add affordance (default `Add discount`). */
  addLabel?: string;
  /** Density. */
  variant?: DiscountRowVariant;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A discount line on the ticket. In its resolved state it shows the label, the
 * percent/amount basis, an optional note, the negative money impact (integer
 * **cents** via `formatMoney`, drawn in the `success`/savings tone), and a
 * remove control. With no active discount it collapses to a dashed "Add
 * discount" button that fires `onAdd`. Token-only colors; a11y button roles.
 */
export function DiscountRow({
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
}: DiscountRowProps): React.ReactElement {
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
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            backgroundColor: pressed ? colors.border : colors.surface,
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          ＋
        </Text>
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {addLabel}
        </Text>
      </Pressable>
    );
  }

  const basis =
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
          paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ color: colors.success, fontSize: tokens.typography.scale.sm }}>
            🏷
          </Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {label ?? 'Discount'}
            {basis ? ` · ${basis}` : ''}
          </Text>
        </View>
        {!compact && note ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {note}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text style={{ color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          −{formatMoney(amountCents ?? 0, currency)}
        </Text>
        {onRemove ? (
          <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${label ?? 'discount'}`} onPress={onRemove}>
            <Text allowFontScaling={false} style={{ color: colors.danger, fontSize: tokens.typography.scale.base }}>
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
