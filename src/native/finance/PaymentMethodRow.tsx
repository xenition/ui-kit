import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Badge } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import type { CardBrand } from './CreditCardView';

/** Payment instrument kind. */
export type PaymentMethodKind = 'card' | 'bank' | 'wallet';

export interface PaymentMethodRowProps {
  /** Primary label (e.g. "Visa" or "Chase Checking"). */
  label: string;
  /** Instrument kind — selects the default glyph (default `card`). */
  kind?: PaymentMethodKind;
  /** Card network, when `kind === 'card'` (affects the glyph only). */
  brand?: CardBrand;
  /** Last four digits, shown as `•• 4242`. */
  last4?: string;
  /** Expiry caption (e.g. `"08/28"`). */
  expiry?: string;
  /** Override the leading glyph. */
  icon?: string;
  /** Marks this method as the default (shows a badge). */
  isDefault?: boolean;
  /** Selected state — draws the primary ring + check (for a picker list). */
  selected?: boolean;
  /** Fires on row press (selection). */
  onPress?: () => void;
  /**
   * Surface treatment (visual-diversity preset). Defaults to `classic` —
   * byte-for-byte the historical bordered row. The `selected` primary ring is
   * preserved across every appearance.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

const KIND_GLYPH: Record<PaymentMethodKind, string> = {
  card: '💳',
  bank: '🏦',
  wallet: '👛',
};

/**
 * A selectable payment-method row for a wallet / checkout picker: leading
 * glyph, label with a masked `•• last4` and expiry sub-line, an optional
 * "Default" badge, and a trailing selection check. `selected` draws a `primary`
 * ring; unselected rows use the `border` token. Becomes a radio-style button
 * when `onPress` is supplied. Token-bound throughout.
 */
export function PaymentMethodRow({
  label,
  kind = 'card',
  brand: _brand,
  last4,
  expiry,
  icon,
  isDefault = false,
  selected = false,
  onPress,
  appearance = 'classic',
  style,
}: PaymentMethodRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const sub = [last4 != null ? `•• ${last4}` : null, expiry != null ? `exp ${expiry}` : null]
    .filter(Boolean)
    .join('  ·  ');

  // Appearance surface FIRST; layout (radius/padding) AFTER. Classic reproduces
  // the historical bordered surface byte-for-byte. In every appearance the
  // `selected` primary ring wins as an overlaid border.
  const surface =
    appearance === 'classic'
      ? {
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: colors.surface,
        }
      : appearanceStyle(appearance, colors, tokens);

  const body = (
    <View
      style={[
        surface,
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
        },
        selected && appearance !== 'classic' ? { borderWidth: 1, borderColor: colors.primary } : null,
        style,
      ]}
    >
      <Icon glyph={icon ?? KIND_GLYPH[kind]} color={selected ? 'primary' : 'onSurface'} size="xl" />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {label}
          </Text>
          {isDefault ? <Badge tone="success">Default</Badge> : null}
        </View>
        {sub.length > 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{sub}</Text>
        ) : null}
      </View>
      {selected ? <Icon glyph="✓" color="primary" size="lg" accessibilityLabel="Selected" /> : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={label}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
