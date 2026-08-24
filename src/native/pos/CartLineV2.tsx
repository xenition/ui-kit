import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { QuantityStepper } from '../commerce/QuantityStepper';
import { shadow } from '../primitives/internal/elevation';
import { formatMoney, safeCents, initials, seedRampStep } from './internal';
import type { CartLineProps } from './CartLine';

/** Drop-in alternate of {@link CartLineProps} — identical prop contract. */
export type CartLineV2Props = CartLineProps;

/**
 * CartLine — design variant **V2**: an **elevated card** with a token-tinted
 * thumbnail plate. Where V1 is a flat row, V2 gives the line its own floating
 * surface — a rounded plate carrying the item's initials (the kit ships no image
 * loader, so a line never blanks), a title + modifiers/note header, and a footer
 * that pairs the inline {@link QuantityStepper} with a bold line total and a
 * per-line discount. `voided` strikes + mutes (state by text, not color alone).
 * Same props as {@link CartLineProps}. Token-only; money is integer cents.
 */
export function CartLineV2({
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
}: CartLineV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const gross = safeCents(unitPriceCents) * quantity;
  const discount = Math.min(safeCents(discountCents), gross);
  const lineTotal = gross - discount;
  const nameColor = voided ? colors.muted : colors.onSurface;
  const plateTint = tokens.ramps.neutral[seedRampStep(name)];

  const body = (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.md,
          backgroundColor: plateTint,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {initials(name)}
        </Text>
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text
              numberOfLines={1}
              style={{
                color: nameColor,
                fontSize: tokens.typography.scale.base,
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
          </View>
          {onVoid ? (
            <Pressable accessibilityRole="button" accessibilityLabel={voidLabel ?? `Void ${name}`} onPress={onVoid} hitSlop={8}>
              <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {voided ? 'Voided' : 'Void'}
              </Text>
            </Pressable>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          {onQuantityChange && !voided ? (
            <QuantityStepper value={quantity} min={min} max={max} onChange={onQuantityChange} label={`Quantity for ${name}`} />
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {quantity} × {formatMoney(unitPriceCents, currency)}
            </Text>
          )}
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                color: nameColor,
                fontSize: tokens.typography.scale.base,
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
          </View>
        </View>
      </View>
    </View>
  );

  const cardStyle = {
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    opacity: voided ? 0.6 : 1,
    ...shadow('md', tokens),
  } as const;

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${quantity} for ${formatMoney(lineTotal, currency)}`}
        onPress={onPress}
        testID={testID}
        style={[cardStyle, style]}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={[cardStyle, style]}>
      {body}
    </View>
  );
}
