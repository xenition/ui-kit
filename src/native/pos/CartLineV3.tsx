import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { QuantityStepper } from '../commerce/QuantityStepper';
import { formatMoney, safeCents } from './internal';
import type { CartLineProps } from './CartLine';

/** Drop-in alternate of {@link CartLineProps} — identical prop contract. */
export type CartLineV3Props = CartLineProps;

/**
 * CartLine — design variant **V3**: a **dense single line**. Where V1 stacks the
 * qty control below the name and V2 is a card, V3 collapses the whole line onto
 * one hairline-separated row — a small `×qty` chip (or the inline stepper), the
 * name with an inline · modifier summary, and a right-aligned line total — for
 * long, scannable tickets. `voided` strikes + mutes. Same props as
 * {@link CartLineProps}. Token-only; money is integer cents.
 */
export function CartLineV3({
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
}: CartLineV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const gross = safeCents(unitPriceCents) * quantity;
  const discount = Math.min(safeCents(discountCents), gross);
  const lineTotal = gross - discount;
  const nameColor = voided ? colors.muted : colors.onSurface;
  const summary = !compact ? [...(modifiers ?? []), note ? `“${note}”` : null].filter(Boolean).join(' · ') : '';

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          opacity: voided ? 0.6 : 1,
        },
        style,
      ]}
    >
      {onQuantityChange && !voided ? (
        <QuantityStepper value={quantity} min={min} max={max} onChange={onQuantityChange} label={`Quantity for ${name}`} />
      ) : (
        <View
          style={{
            minWidth: 28,
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: 1,
            borderRadius: tokens.radius.sm,
            backgroundColor: tokens.ramps.neutral[100] ?? colors.surface,
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', textAlign: 'center' }}>
            ×{quantity}
          </Text>
        </View>
      )}

      <Text numberOfLines={1} style={{ flex: 1, minWidth: 0, color: nameColor, fontSize: tokens.typography.scale.sm }}>
        <Text style={{ fontWeight: '600', textDecorationLine: voided ? 'line-through' : 'none' }}>{name}</Text>
        {summary ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}> · {summary}</Text> : null}
      </Text>

      <Text
        style={{
          color: nameColor,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '700',
          minWidth: 60,
          textAlign: 'right',
          textDecorationLine: voided ? 'line-through' : 'none',
        }}
      >
        {formatMoney(lineTotal, currency)}
      </Text>

      {onVoid ? (
        <Pressable accessibilityRole="button" accessibilityLabel={voidLabel ?? `Void ${name}`} onPress={onVoid} hitSlop={8}>
          <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.base }}>×</Text>
        </Pressable>
      ) : null}
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
