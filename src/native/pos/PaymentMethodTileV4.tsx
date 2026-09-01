import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  formatMoney,
  toneColor,
  withAlpha,
  PAYMENT_METHOD_META,
} from './internal';
import type { PaymentMethodTileProps } from './PaymentMethodTile';

/** Drop-in for {@link PaymentMethodTileProps} — same props, the V4 "register" design. */
export type PaymentMethodTileV4Props = PaymentMethodTileProps;

/**
 * PaymentMethodTile — **V4** "register" design. A tactile tender tile: the method
 * glyph sits in a **soft-tint disc**, the word beside/under it (never color
 * alone), with an optional amount. A big (≥44px) tap target; `selected` lifts
 * with an accent ring + token-tinted fill and a `✓`, all carried in
 * `accessibilityState.selected`. Same props/behavior as
 * {@link PaymentMethodTileProps}; token-only: accent from the method tone, tints
 * via `withAlpha` (no literals).
 */
export function PaymentMethodTileV4({
  method,
  label,
  selected = false,
  disabled = false,
  amountCents,
  currency = 'USD',
  onPress,
  variant = 'grid',
  testID,
  style,
}: PaymentMethodTileV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = PAYMENT_METHOD_META[method];
  const accent = toneColor(colors, meta.tone);
  const isList = variant === 'list';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label ?? meta.label}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        {
          flexDirection: isList ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: isList ? 'flex-start' : 'center',
          gap: tokens.spacing.sm,
          minHeight: isList ? 56 : 96,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? accent : colors.border,
          backgroundColor: selected ? withAlpha(accent, 0.12) : colors.surface,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
          ...(selected
            ? { shadowColor: accent, shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(accent, selected ? 0.2 : 0.1),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          {meta.glyph}
        </Text>
      </View>
      <View style={{ flex: isList ? 1 : undefined, alignItems: isList ? 'flex-start' : 'center' }}>
        <Text
          numberOfLines={1}
          style={{
            color: selected ? accent : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
          }}
        >
          {label ?? meta.label}
        </Text>
        {typeof amountCents === 'number' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {formatMoney(amountCents, currency)}
          </Text>
        ) : null}
      </View>
      {selected ? (
        <Text allowFontScaling={false} style={{ color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          ✓
        </Text>
      ) : null}
    </Pressable>
  );
}
