import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine, ratingParts } from '../primitives/internal/tone-v4';
import { BADGE_V4, placeholderGround, spokenLine, TABULAR, type ToneV4 } from './internal/menu-v4';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';

export interface RestaurantCardV4Props extends RestaurantCardProps {
  /** Override the availability words. Default `Open` / `Closed` / `Busy`. */
  openLabels?: Partial<Record<RestaurantOpenState, string>>;
  /**
   * The text equivalent of the `$$$` chip, for the card's spoken name. Default
   * `'Price level 3 of 4'`. The chip itself keeps its currency glyphs.
   */
  formatPriceLevel?: (level: number) => string;
}

/** `Rating`'s own scale. A value outside it draws six filled stars out of five. */
const RATING_MAX = 5;

/** The steps `priceLevel` is documented to take. */
const PRICE_LEVELS = 4;

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

/**
 * Availability is a genuine status, so it takes a status tone — but `busy` is
 * a caution rather than a neutral, which is what the base drew it as.
 */
const OPEN_TONE: Record<RestaurantOpenState, ToneV4> = {
  open: 'success',
  closed: 'neutral',
  busy: 'warn',
};

/**
 * **V4 restaurant card** — same props as {@link RestaurantCard} plus
 * `openLabels` and `formatPriceLevel`.
 *
 * ## Five changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel` carried the
 *    name, the cuisine and the open state, and the `Pressable` around it is
 *    `accessible` — so the rating, the rating count, the price level, the ETA
 *    and the delivery fee were all removed from the tree. Every one of those
 *    is what a person is actually choosing between.
 * 2. **`$$$` gets words.** Three currency symbols announce as three currency
 *    symbols; `formatPriceLevel` gives the chip a text equivalent while the
 *    eye keeps the glyphs.
 * 3. **One dim, on one element.** The base put `0.75` on the container *and*
 *    `0.7` on the photo inside it, landing a closed restaurant's picture at
 *    0.525 — and then brightened the whole card to `0.9` on press, so a closed
 *    card lit up when touched. The photo carries M3's disabled band and
 *    nothing else does; press is a state layer.
 * 4. **The card reads as raised.** It was `surface` — the page's own colour —
 *    with a hairline, so on a dark page a list of restaurants was a flat
 *    field. `card`/`onCard` is the pair that exists for this.
 * 5. **The photo placeholder survives dark mode**, where it was
 *    `tokens.ramps.neutral[100]`: a near-white slab behind every unloaded
 *    thumbnail on a dark page.
 *
 * **Renders nothing without a `name`.**
 */
export function RestaurantCardV4({
  name,
  cuisine,
  rating,
  ratingCount,
  priceLevel,
  etaText,
  feeText,
  imageUrl,
  openState = 'open',
  openLabels,
  formatPriceLevel,
  variant = 'list',
  onPress,
  style,
}: RestaurantCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const horizontal = variant === 'list';
  const dimmed = openState !== 'open';
  const openWord = openLabels?.[openState] ?? OPEN_LABEL[openState];

  const level =
    typeof priceLevel === 'number'
      ? Math.min(PRICE_LEVELS, Math.max(1, Math.round(priceLevel)))
      : null;
  const priceGlyphs = level != null ? '$'.repeat(level) : null;
  // Change 2: the glyphs stay on screen; the words go to the reader.
  const priceWords =
    level != null
      ? (formatPriceLevel ?? ((l: number) => `Price level ${l} of ${PRICE_LEVELS}`))(level)
      : null;

  const clamped =
    typeof rating === 'number' && Number.isFinite(rating)
      ? Math.max(0, Math.min(RATING_MAX, rating))
      : null;
  const stars =
    clamped != null
      ? ratingParts({ value: clamped, max: RATING_MAX, count: ratingCount })
      : null;

  const metaBits = metaLine([priceGlyphs, cuisine]);
  const deliveryLine = metaLine([etaText, feeText]);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    style,
  ];

  const media = (
    <View
      style={{
        width: horizontal ? tokens.spacing['2xl'] * 2 + tokens.spacing.sm : '100%',
        height: horizontal
          ? tokens.spacing['2xl'] * 2 + tokens.spacing.sm
          : variant === 'hero'
            ? tokens.spacing['2xl'] * 4
            : tokens.spacing['2xl'] * 2 + tokens.spacing.xl,
        borderRadius: horizontal ? tokens.radius.md : 0,
        overflow: 'hidden',
        // Change 3: the ONE dim in this component, and press is not an opacity,
        // so a closed card can no longer brighten under a finger.
        opacity: disabledOpacity(theme.state, dimmed),
        backgroundColor: placeholderGround(theme),
      }}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : null}
    </View>
  );

  const body = (
    <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1} style={{ flex: 1 }}>
          {name}
        </TextV4>
        <BadgeV4 tone={OPEN_TONE[openState]} variant={BADGE_V4.variant} size={BADGE_V4.size}>
          {openWord}
        </BadgeV4>
      </View>
      {metaBits ? (
        <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
          {metaBits}
        </TextV4>
      ) : null}
      {clamped != null && stars != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <RatingV4 value={clamped} size="sm" showValue label={stars.label} />
          {typeof ratingCount === 'number' ? (
            <TextV4 size="xs" tone="mutedText" style={TABULAR}>
              ({ratingCount})
            </TextV4>
          ) : null}
        </View>
      ) : null}
      {deliveryLine ? (
        <TextV4 size="sm" tone="onCard" style={TABULAR}>
          {deliveryLine}
        </TextV4>
      ) : null}
    </View>
  );

  // Change 1: everything the eye can see about this restaurant, in one name.
  const spoken = spokenLine([
    name,
    cuisine,
    priceWords,
    stars?.label,
    etaText,
    feeText,
    openWord,
  ]);

  const inner = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: horizontal ? 'row' : 'column',
        gap: tokens.spacing.md,
        padding: horizontal ? tokens.spacing.md : 0,
        paddingBottom: tokens.spacing.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      {media}
      <View style={{ flex: 1, minWidth: 0, paddingHorizontal: horizontal ? 0 : tokens.spacing.md }}>
        {body}
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken} style={containerStyle}>
        {inner(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={containerStyle}
    >
      {({ pressed }) => inner(pressed)}
    </Pressable>
  );
}
