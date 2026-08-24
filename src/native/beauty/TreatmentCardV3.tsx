import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Button } from '../primitives';
import { formatMoney } from '../commerce/money';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';

/** Drop-in alternate of {@link TreatmentCardProps} — identical prop contract. */
export type TreatmentCardV3Props = TreatmentCardProps;

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
 * TreatmentCard — design variant **V3**: a **horizontal media-left row**. A
 * square thumbnail sits on the left; the name, a category tag + duration · price
 * meta line, an optional description, and a small **Book** button stack on the
 * right. Where V1 is an image-top card and V2 a full-bleed poster, V3 is the
 * compact list row for a treatment menu. Missing images degrade to a tinted
 * glyph thumbnail. Same props as {@link TreatmentCardProps}. Token-only colors.
 */
export function TreatmentCardV3({
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
}: TreatmentCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TREATMENT_META[variant] ?? TREATMENT_META.wellness;
  const priceText = format(priceCents, currency);

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${meta.label}: ${name}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}`}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
          opacity: pressed && onPress ? 0.94 : 1,
        } as StyleProp<ViewStyle>,
        style,
      ]}
    >
      <View
        style={{
          width: 88,
          height: 88,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors[meta.color], 0.16),
        }}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        ) : (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            {meta.glyph}
          </Text>
        )}
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs, paddingVertical: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
          {durationMin != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {durationMin} min</Text>
          ) : null}
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>· {priceText}</Text>
        </View>
        {description ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}
        {onBook ? (
          <Button size="sm" variant="soft" onPress={onBook} style={{ alignSelf: 'flex-start' }}>
            {bookLabel}
          </Button>
        ) : null}
      </View>
    </Pressable>
  );
}
