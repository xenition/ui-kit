import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export type TreatmentVariant = 'facial' | 'massage' | 'body' | 'nails' | 'hair' | 'wellness';

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

export interface TreatmentCardProps {
  /** Treatment name, e.g. "Deep-tissue massage". */
  name: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Category; drives icon, tag, and accent. Falls back to `wellness`. */
  variant?: TreatmentVariant;
  /** Duration in minutes. */
  durationMin?: number;
  /** Short description. */
  description?: string;
  /** Hero image URL; a token-tinted band shows when absent. */
  imageUrl?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** CTA label (default "Book"). Hidden when no `onBook`. */
  bookLabel?: string;
  /** Fires when the CTA is pressed. */
  onBook?: () => void;
  /** Fires when the card body is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A spa/salon treatment card: a hero image band with a category tag, the
 * treatment name, a duration · price meta line, an optional description, and a
 * "Book" CTA. `variant` sets the icon/tag/accent; a missing image degrades to a
 * token-tinted band with the category glyph. Prices are integer cents via
 * {@link formatMoney}. Token-only colors (semantic slots + `withAlpha`).
 */
export function TreatmentCard({
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
}: TreatmentCardProps): React.ReactElement {
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
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          opacity: pressed && onPress ? 0.94 : 1,
        },
        style,
      ]}
    >
      <View style={{ height: 132, backgroundColor: withAlpha(colors[meta.color], 0.16), alignItems: 'center', justifyContent: 'center' }}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        ) : (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
            {meta.glyph}
          </Text>
        )}
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.sm,
            left: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            backgroundColor: withAlpha(colors.onSurface, 0.55),
          }}
        >
          <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
        </View>
      </View>

      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {durationMin != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{durationMin} min</Text>
          ) : null}
          <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{priceText}</Text>
        </View>
        {description ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}
        {onBook ? (
          <Button variant="primary" onPress={onBook}>
            {bookLabel}
          </Button>
        ) : null}
      </View>
    </Pressable>
  );
}
