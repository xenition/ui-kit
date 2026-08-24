import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { QuantityStepper } from '../commerce/QuantityStepper';
import { formatMoney, safeCents } from './internal';

export type CartLineVariant = 'default' | 'compact';

export interface CartLineProps {
  /** Item name. */
  name: string;
  /** Quantity on the ticket. */
  quantity: number;
  /** Unit price in integer **cents**. */
  unitPriceCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Modifier / option chips (e.g. "No onion", "Large"). */
  modifiers?: string[];
  /** Free-text note for the line. */
  note?: string;
  /** Per-line discount already applied, in cents (shown struck from the total). */
  discountCents?: number;
  /** Quantity-change handler. When absent the line is read-only (qty as text). */
  onQuantityChange?: (quantity: number) => void;
  /** Minimum quantity for the stepper (default 1). */
  min?: number;
  /** Maximum quantity for the stepper. */
  max?: number;
  /** Void / remove handler; renders a remove control when provided. */
  onVoid?: () => void;
  /** Void control accessible label (default `Void {name}`). */
  voidLabel?: string;
  /** Marks the line voided — struck through + muted, stepper hidden. */
  voided?: boolean;
  /** Tap handler for the whole row (e.g. open the item editor). */
  onPress?: () => void;
  /** Density. `compact` hides modifiers/notes. */
  variant?: CartLineVariant;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line on the register ticket — the POS sibling of the commerce
 * `CartLineItem`: name, an inline {@link QuantityStepper} (or read-only qty),
 * modifiers/notes, an optional per-line discount, the line total, and a void
 * control. A `voided` line strikes through and mutes (state by text + style,
 * never color alone). Money is integer **cents** via `formatMoney`. Token-only.
 */
export function CartLine({
  name,
  quantity,
  unitPriceCents,
  currency = 'USD',
  modifiers,
  note,
  discountCents,
  onQuantityChange,
  min = 1,
  max,
  onVoid,
  voidLabel,
  voided = false,
  onPress,
  variant = 'default',
  testID,
  style,
}: CartLineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const gross = safeCents(unitPriceCents) * quantity;
  const discount = Math.min(safeCents(discountCents), gross);
  const lineTotal = gross - discount;
  const nameColor = voided ? colors.muted : colors.onSurface;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.md,
          opacity: voided ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{
            color: nameColor,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            textDecorationLine: voided ? 'line-through' : 'none',
          }}
        >
          {name}
        </Text>

        {!compact && modifiers && modifiers.length > 0 ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {modifiers.join(' · ')}
          </Text>
        ) : null}
        {!compact && note ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontStyle: 'italic' }}>
            “{note}”
          </Text>
        ) : null}

        {onQuantityChange && !voided ? (
          <QuantityStepper
            value={quantity}
            min={min}
            max={max}
            onChange={onQuantityChange}
            label={`Quantity for ${name}`}
          />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {quantity} × {formatMoney(unitPriceCents, currency)}
          </Text>
        )}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <Text
          style={{
            color: nameColor,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
            textDecorationLine: voided ? 'line-through' : 'none',
          }}
        >
          {formatMoney(lineTotal, currency)}
        </Text>
        {discount > 0 && !voided ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            −{formatMoney(discount, currency)}
          </Text>
        ) : null}
        {onVoid ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={voidLabel ?? `Void ${name}`}
            onPress={onVoid}
          >
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {voided ? 'Voided' : 'Void'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${quantity} for ${formatMoney(lineTotal, currency)}`}
        onPress={onPress}
        testID={testID}
      >
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
