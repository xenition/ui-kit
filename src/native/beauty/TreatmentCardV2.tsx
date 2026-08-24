import * as React from 'react';
import { Animated, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { formatMoney } from '../commerce/money';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';

/** Drop-in alternate of {@link TreatmentCardProps} — identical prop contract. */
export type TreatmentCardV2Props = TreatmentCardProps;

interface TreatmentMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const TREATMENT_META: Record<TreatmentVariant, TreatmentMeta> = {
  facial: { glyph: '🧖', label: 'Facial', color: 'success' },
  massage: { glyph: '💆', label: 'Massage', color: 'primary' },
  body: { glyph: '🌿', label: 'Body', color: 'accent' },
  nails: { glyph: '💅', label: 'Nails', color: 'accent' },
  hair: { glyph: '💇', label: 'Hair', color: 'primary' },
  wellness: { glyph: '🧘', label: 'Wellness', color: 'success' },
};

/**
 * TreatmentCard — design variant **V2**: a **full-bleed image hero**. The image
 * fills the whole tile; a bottom scrim (`withAlpha` of the on-surface token)
 * carries the title, a duration · price line, and an inline **Book** chip in
 * inverse (surface-colored) text, with the category badge floated top-left.
 * Where V1 splits into an image band above a text body, V2 is one immersive
 * poster. Missing images degrade to a token-tinted panel with the glyph. Same
 * props as {@link TreatmentCardProps}. Token-only colors.
 */
export function TreatmentCardV2({
  name,
  priceCents,
  currency = 'USD',
  variant = 'wellness',
  durationMin,
  description,
  imageUrl,
  formatMoney: format = formatMoney,
  bookLabel = 'Book',
  onBook,
  onPress,
  style,
}: TreatmentCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });
  const meta = TREATMENT_META[variant] ?? TREATMENT_META.wellness;
  const priceText = format(priceCents, currency);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      height: 220,
      borderRadius: tokens.radius.lg,
      borderWidth: 0,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      backgroundColor: withAlpha(colors[meta.color], 0.16),
      ...shadow('md', tokens),
    },
    style,
  ];

  const inner = (
    <>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      ) : (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
            {meta.glyph}
          </Text>
        </View>
      )}

      <View
        style={{
          position: 'absolute',
          top: tokens.spacing.sm,
          left: tokens.spacing.sm,
          borderRadius: tokens.radius.full,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: 2,
          backgroundColor: withAlpha(colors[meta.color], 0.9),
        }}
      >
        <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
      </View>

      <View
        style={{
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(colors.onSurface, 0.55),
        }}
      >
        <Text numberOfLines={1} style={{ color: colors.surface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
          {name}
        </Text>
        {description ? (
          <Text numberOfLines={2} style={{ color: withAlpha(colors.surface, 0.85), fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
            {durationMin != null ? (
              <Text style={{ color: withAlpha(colors.surface, 0.85), fontSize: tokens.typography.scale.sm }}>{durationMin} min</Text>
            ) : null}
            <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{priceText}</Text>
          </View>
          {onBook ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Book ${name}, ${priceText}`}
              onPress={onBook}
              onPressIn={press.onPressIn}
              onPressOut={press.onPressOut}
              style={({ pressed }) => ({
                borderRadius: tokens.radius.full,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                backgroundColor: colors.surface,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{bookLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${meta.label}: ${name}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}`}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={containerStyle}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, containerStyle]}>{inner}</Animated.View>
  );
}
