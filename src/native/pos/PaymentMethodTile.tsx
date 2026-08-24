import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  formatMoney,
  toneColor,
  withAlpha,
  PAYMENT_METHOD_META,
  type PaymentMethod,
} from './internal';

export type PaymentMethodTileVariant = 'grid' | 'list';

export interface PaymentMethodTileProps {
  /** Tender type — drives the glyph, label, and accent tone. */
  method: PaymentMethod;
  /** Override the default label (e.g. "Visa •4242"). */
  label?: string;
  /** Selected state — accent ring + fill (also announced to a11y). */
  selected?: boolean;
  /** Block selection and dim the tile. */
  disabled?: boolean;
  /** Optional amount to charge with this tender, in integer **cents**. */
  amountCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Press handler. */
  onPress?: () => void;
  /** `grid` (default) is a square tap target; `list` is a full-width row. */
  variant?: PaymentMethodTileVariant;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A selectable tender tile for the payment screen — glyph + word (never color
 * alone) with an optional amount. Selection is carried in
 * `accessibilityState.selected` and drawn as an accent ring + token-tinted fill.
 * `grid` is a compact square; `list` is a labelled full-width row. Money is
 * integer **cents**. Token-only: accent from the method tone, fill via a
 * token-tinted `withAlpha`.
 */
export function PaymentMethodTile({
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
}: PaymentMethodTileProps): React.ReactElement {
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
          minHeight: isList ? 56 : 88,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? accent : colors.border,
          backgroundColor: selected ? withAlpha(accent, 0.12) : colors.surface,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
        {meta.glyph}
      </Text>
      <View style={{ flex: isList ? 1 : undefined, alignItems: isList ? 'flex-start' : 'center' }}>
        <Text
          numberOfLines={1}
          style={{
            color: selected ? accent : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
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
