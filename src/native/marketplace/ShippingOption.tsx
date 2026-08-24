import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, formatMoney } from '../primitives';
import { withAlpha } from './internal';

export interface ShippingOptionProps {
  /** Carrier / method name (e.g. "Standard", "Express"). */
  label: string;
  /**
   * Shipping cost in integer minor units (cents). `0` renders as "Free";
   * omit for methods without a price (e.g. local pickup).
   */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Delivery estimate line (e.g. "3–5 business days"). */
  eta?: string;
  /** Optional leading glyph. */
  glyph?: string;
  /** Whether this option is currently selected (radio semantics). */
  selected?: boolean;
  /** Disables selection (e.g. unavailable to this address). */
  disabled?: boolean;
  /** Fires when the option is pressed. */
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A selectable shipping/delivery method row — method name, price ("Free" at
 * zero), an ETA line, and a radio indicator. Behaves as one option in a group:
 * `selected` drives an accent ring, a filled radio dot, and the a11y `selected`
 * state (never color alone); `disabled` dims it and blocks selection. Reuses
 * `Icon` and the shared `formatMoney`; token-only colors with a token-derived
 * alpha tint.
 */
export function ShippingOption({
  label,
  priceCents,
  currency = 'USD',
  eta,
  glyph,
  selected = false,
  disabled = false,
  onSelect,
  style,
}: ShippingOptionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const priceText =
    priceCents === undefined ? undefined : priceCents === 0 ? 'Free' : formatMoney(priceCents, currency);

  const dot = 20;
  const radio = (
    <View
      style={{
        width: dot,
        height: dot,
        borderRadius: dot / 2,
        borderWidth: 2,
        borderColor: selected ? colors.primary : colors.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected ? (
        <View style={{ width: dot / 2, height: dot / 2, borderRadius: dot / 4, backgroundColor: colors.primary }} />
      ) : null}
    </View>
  );

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={`${label}${priceText ? `, ${priceText}` : ''}${eta ? `, ${eta}` : ''}`}
      disabled={disabled || !onSelect}
      onPress={onSelect}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? withAlpha(colors.primary, 0.08) : colors.surface,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {radio}
      {glyph ? <Icon glyph={glyph} size="lg" color={selected ? 'primary' : 'muted'} /> : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {label}
        </Text>
        {eta ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{eta}</Text> : null}
      </View>
      {priceText ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {priceText}
        </Text>
      ) : null}
    </Pressable>
  );
}
