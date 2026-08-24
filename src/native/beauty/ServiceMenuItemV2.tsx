import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { formatMoney } from '../commerce/money';
import type { ServiceMenuItemProps, ServiceCategory } from './ServiceMenuItem';

/** Drop-in alternate of {@link ServiceMenuItemProps} — identical prop contract. */
export type ServiceMenuItemV2Props = ServiceMenuItemProps;

interface CategoryMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const CATEGORY_META: Record<ServiceCategory, CategoryMeta> = {
  hair: { glyph: '💇', label: 'Hair', color: 'primary' },
  nails: { glyph: '💅', label: 'Nails', color: 'accent' },
  skin: { glyph: '✨', label: 'Skin', color: 'success' },
  massage: { glyph: '💆', label: 'Massage', color: 'primary' },
  makeup: { glyph: '💄', label: 'Makeup', color: 'danger' },
  brows: { glyph: '👁️', label: 'Brows', color: 'accent' },
  waxing: { glyph: '🕯️', label: 'Waxing', color: 'warn' },
  spa: { glyph: '🧖', label: 'Spa', color: 'success' },
};

/**
 * ServiceMenuItem — design variant **V2**: an **elevated card** rather than V1's
 * flat bordered row. A large rounded category glyph tile anchors the top-left,
 * the name + optional "Popular" badge and description stack beside it, and a
 * footer band carries a duration chip, the price, and a dedicated **Book** chip.
 * Same props as {@link ServiceMenuItemProps}; `onPress` powers the Book chip.
 * `unavailable` dims the card and disables the chip. Token-only colors.
 */
export function ServiceMenuItemV2({
  name,
  priceCents,
  currency = 'USD',
  category = 'spa',
  durationMin,
  description,
  popular = false,
  unavailable = false,
  pricePrefix,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: ServiceMenuItemV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });
  const meta = CATEGORY_META[category] ?? CATEGORY_META.spa;
  const accent = colors[meta.color];
  const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
  const interactive = !unavailable && !!onPress;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.lg,
      borderWidth: 0,
      padding: tokens.spacing.md,
      gap: tokens.spacing.md,
      opacity: unavailable ? 0.5 : 1,
      ...shadow('md', tokens),
    },
    style,
  ];

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <View style={containerStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(accent, 0.16),
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
              {meta.glyph}
            </Text>
          </View>

          <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Text
                numberOfLines={1}
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }}
              >
                {name}
              </Text>
              {popular ? (
                <View
                  style={{
                    borderRadius: tokens.radius.sm,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: 1,
                    backgroundColor: withAlpha(colors.accent, 0.16),
                  }}
                >
                  <Text style={{ color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Popular</Text>
                </View>
              ) : null}
            </View>
            <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{meta.label}</Text>
            {description ? (
              <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {description}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
            paddingTop: tokens.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: withAlpha(colors.muted, 0.16),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            {durationMin != null ? (
              <View
                style={{
                  borderRadius: tokens.radius.full,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: 2,
                  backgroundColor: withAlpha(colors.muted, 0.14),
                }}
              >
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{durationMin} min</Text>
              </View>
            ) : null}
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>{priceText}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Book ${name}, ${priceText}${unavailable ? ', unavailable' : ''}`}
            accessibilityState={{ disabled: !interactive }}
            disabled={!interactive}
            onPress={interactive ? onPress : undefined}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
            style={({ pressed }) => ({
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
              backgroundColor: withAlpha(accent, 0.16),
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text style={{ color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {unavailable ? 'Unavailable' : 'Book'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
