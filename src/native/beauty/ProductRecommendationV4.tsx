import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { ProductRecommendationProps } from './ProductRecommendation';

export interface ProductRecommendationV4Props extends ProductRecommendationProps {
  /** Copy on the button once the item is in the basket. Default `'Added'`. */
  addedLabel?: string;
  /** Copy when the item cannot be bought. Default `'Sold out'`. */
  soldOutLabel?: string;
  /** Label above the reason. Default `'Why this'`. */
  reasonLabel?: string;
}

/** The thumbnail's proportion. Fixed, so a shelf of tiles has one baseline. */
const THUMB_ASPECT = 1;

/**
 * **V4 product recommendation** — same props as {@link ProductRecommendation}
 * plus `addedLabel`, `soldOutLabel` and `reasonLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number** — `RatingV4 showValue`. Five glyphs is
 *    not a number, and this is a shelf where a shopper compares two products.
 * 2. **Sold out disables the button rather than only greying it.** The base
 *    dimmed the CTA and left it pressable.
 * 3. **The reason is labelled.** "Because you booked a keratin treatment" read
 *    as a second description; it is the whole point of a recommendation and
 *    now says what it is.
 * 4. **The thumbnail's ground is `colors.muted` at a fixed ratio**, so a shelf
 *    does not reflow as images arrive.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function ProductRecommendationV4({
  name,
  priceCents,
  currency = 'USD',
  brand,
  rating,
  imageUrl,
  reason,
  added = false,
  soldOut = false,
  formatMoney = defaultFormatMoney,
  addLabel = 'Add',
  addedLabel = 'Added',
  soldOutLabel = 'Sold out',
  reasonLabel = 'Why this',
  onAdd,
  onPress,
  style,
}: ProductRecommendationV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const price = formatMoney(priceCents, currency);
  const cta = soldOut ? soldOutLabel : added ? addedLabel : addLabel;

  const body = (
    <>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
        <View
          style={{
            width: tokens.spacing['2xl'] * 1.5,
            aspectRatio: THUMB_ASPECT,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: colors.muted,
          }}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              accessible={false}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          ) : null}
        </View>

        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          {brand ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {brand}
            </TextV4>
          ) : null}
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={2}>
            {name}
          </TextV4>
          {typeof rating === 'number' ? <RatingV4 value={rating} size="sm" showValue /> : null}
          <TextV4 face="heading" size="lg" weight="bold" tone="onCard" numeric="tabular">
            {price}
          </TextV4>
        </View>

        {soldOut ? (
          <BadgeV4 tone="neutral" variant="soft" size="sm">
            {soldOutLabel}
          </BadgeV4>
        ) : null}
      </View>

      {reason ? (
        <View style={{ gap: tokens.spacing.xs / 2, marginTop: tokens.spacing.sm }}>
          <TextV4 size="xs" weight="semibold" tone="mutedText">
            {reasonLabel}
          </TextV4>
          <TextV4 size="sm" tone="onCard">
            {reason}
          </TextV4>
        </View>
      ) : null}

      {onAdd ? (
        <ButtonV4
          variant={added ? 'secondary' : 'primary'}
          size="sm"
          // Sold out DISABLES the control. The base dimmed it and left it live.
          disabled={soldOut}
          onPress={onAdd}
          accessibilityLabel={`${cta}, ${name}`}
          style={{ alignSelf: 'stretch', marginTop: tokens.spacing.md }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            {added ? <IconV4 name="check" size="sm" /> : null}
            <TextV4 size="sm" weight="semibold" tone={added ? 'primaryText' : 'onPrimary'}>
              {cta}
            </TextV4>
          </View>
        </ButtonV4>
      ) : null}
    </>
  );

  if (!onPress) {
    return (
      <CardV4 style={[{ opacity: disabledOpacity(theme.state, soldOut) }, style]}>{body}</CardV4>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metaLine([brand, name, price, soldOut ? soldOutLabel : null])}
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      })}
    >
      <CardV4 style={[{ opacity: disabledOpacity(theme.state, soldOut) }, style]}>{body}</CardV4>
    </Pressable>
  );
}
