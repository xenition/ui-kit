import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';

export interface TreatmentCardV4Props extends TreatmentCardProps {
  /** Override the treatment names — six English words lived inside. */
  variantLabels?: Partial<Record<TreatmentVariant, string>>;
  /** Format the duration. Default `'60 min'`. */
  formatDuration?: (minutes: number) => string;
}

/**
 * Treatment → glyph and default word.
 *
 * As with `ServiceMenuItemV4`: a treatment kind is **not** a status, so it
 * does not get a status colour. The base gave each one a `keyof
 * SemanticColors`, which spent `success` and `danger` on categories.
 */
const TREATMENT_META: Record<TreatmentVariant, { label: string; glyph: string }> = {
  facial: { label: 'Facial', glyph: '🧖' },
  massage: { label: 'Massage', glyph: '💆' },
  body: { label: 'Body', glyph: '🌿' },
  nails: { label: 'Nails', glyph: '💅' },
  hair: { label: 'Hair', glyph: '💇' },
  wellness: { label: 'Wellness', glyph: '🧘' },
};

/** The media box's proportion. Fixed, so a grid of treatments has one baseline. */
const MEDIA_ASPECT = 16 / 9;

/**
 * **V4 treatment card** — same props as {@link TreatmentCard} plus
 * `variantLabels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **The category stops spending a status colour** — see
 *    {@link TREATMENT_META}.
 * 2. **The media box has a fixed ratio and a `muted` ground**, so a grid does
 *    not reflow as images arrive and a missing image is not a pale rectangle
 *    on a dark page.
 * 3. **The price is in the display face and tabular**, because it is the
 *    figure the decision turns on.
 * 4. **Press is a state layer** over the card's own fill, and the whole card
 *    has one accessible name.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function TreatmentCardV4({
  name,
  priceCents,
  currency = 'USD',
  variant = 'facial',
  durationMin,
  description,
  imageUrl,
  formatMoney = defaultFormatMoney,
  bookLabel = 'Book',
  variantLabels,
  formatDuration,
  onBook,
  onPress,
  style,
}: TreatmentCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const meta = TREATMENT_META[variant] ?? TREATMENT_META.facial;
  const word = variantLabels?.[variant] ?? meta.label;
  const price = formatMoney(priceCents, currency);
  const duration =
    typeof durationMin === 'number'
      ? (formatDuration ?? ((m: number) => `${m} min`))(durationMin)
      : null;

  const body = (
    <>
      <View
        style={{
          width: '100%',
          aspectRatio: MEDIA_ASPECT,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: colors.muted,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            accessible={false}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <IconV4 glyph={meta.glyph} size="3xl" />
        )}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {duration ? (
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {duration}
            </TextV4>
          ) : null}
        </View>
        <BadgeV4 tone="neutral" variant="soft" size="sm">
          {word}
        </BadgeV4>
      </View>

      {description ? (
        <TextV4 size="sm" tone="mutedText" numberOfLines={2} style={{ marginTop: tokens.spacing.xs }}>
          {description}
        </TextV4>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          marginTop: tokens.spacing.md,
        }}
      >
        <TextV4 face="heading" size="lg" weight="bold" tone="onCard" numeric="tabular">
          {price}
        </TextV4>
        {onBook ? (
          <ButtonV4
            variant="primary"
            size="sm"
            onPress={onBook}
            accessibilityLabel={`${bookLabel}, ${name}`}
          >
            {bookLabel}
          </ButtonV4>
        ) : null}
      </View>
    </>
  );

  if (!onPress) return <CardV4 style={style}>{body}</CardV4>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metaLine([name, word, duration, price])}
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      })}
    >
      <CardV4 style={style}>{body}</CardV4>
    </Pressable>
  );
}
