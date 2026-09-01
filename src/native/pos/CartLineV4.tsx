import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, safeCents, toneColor, withAlpha } from './internal';
import type { CartLineProps } from './CartLine';

/** Drop-in for {@link CartLineProps} — same props, the V4 "register" design. */
export type CartLineV4Props = CartLineProps;

/**
 * CartLine — **V4** "register" design. The tactile checkout take on a ticket
 * line: product name + modifiers on the left, a **big bold line total** in
 * `tabular-nums` weight on the right (the number a busy counter scans), and a
 * chunky ≥44px −/+ qty stepper with a satisfying press. A `voided` line strikes
 * through and mutes (state by text + style, never color alone). One accent =
 * **primary**; money is integer **cents** via `formatMoney`. Same props/behavior
 * as {@link CartLineProps}; token-only via `useXenitionTheme()`.
 */
export function CartLineV4({
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
}: CartLineV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const accent = toneColor(colors, 'primary');
  const gross = safeCents(unitPriceCents) * quantity;
  const discount = Math.min(safeCents(discountCents), gross);
  const lineTotal = gross - discount;
  const nameColor = voided ? colors.muted : colors.onSurface;

  const atMin = quantity <= min;
  const atMax = typeof max === 'number' && quantity >= max;

  const StepButton = ({
    glyph,
    label,
    disabled,
    onPress: onStep,
  }: {
    glyph: string;
    label: string;
    disabled: boolean;
    onPress: () => void;
  }): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onStep}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: pressed ? withAlpha(accent, 0.12) : colors.surface,
        opacity: disabled ? 0.4 : 1,
      })}
    >
      <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
        {glyph}
      </Text>
    </Pressable>
  );

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
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{
            color: nameColor,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
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
          <View
            accessibilityRole="adjustable"
            accessibilityLabel={`Quantity for ${name}`}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}
          >
            <StepButton glyph="−" label="Decrease quantity" disabled={atMin} onPress={() => onQuantityChange(quantity - 1)} />
            <Text
              allowFontScaling={false}
              style={{ minWidth: 28, textAlign: 'center', color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}
            >
              {quantity}
            </Text>
            <StepButton glyph="+" label="Increase quantity" disabled={atMax} onPress={() => onQuantityChange(quantity + 1)} />
          </View>
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
            fontSize: tokens.typography.scale.lg,
            fontWeight: '800',
            textDecorationLine: voided ? 'line-through' : 'none',
          }}
        >
          {formatMoney(lineTotal, currency)}
        </Text>
        {discount > 0 && !voided ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            −{formatMoney(discount, currency)}
          </Text>
        ) : null}
        {onVoid ? (
          <Pressable accessibilityRole="button" accessibilityLabel={voidLabel ?? `Void ${name}`} onPress={onVoid}>
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
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
