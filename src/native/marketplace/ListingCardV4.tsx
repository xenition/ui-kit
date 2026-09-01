import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/nav-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { PriceTagV4 } from '../commerce/PriceTagV4';
import { GenerativeCoverV4 } from '../commerce/GenerativeCoverV4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import type { MoneyFormatter } from '../commerce/money';
import { ConditionBadgeV4, CONDITION_V4_LABEL } from './ConditionBadgeV4';
import type { ListingCardProps, ListingCardVariant } from './ListingCard';

export type { ListingCardVariant };

/**
 * The media box's proportion — **the same four names `ProductCardV4` uses.**
 *
 * That card's own doc comment asks for this by name: "four ratios, no
 * free-form number, because `ListingCardV4` in `marketplace` mirrors this card
 * and the two must be able to agree by name — a storefront and a marketplace
 * have to read as one product."
 *
 * The union is restated here rather than imported so that neither module
 * depends on the other's build order; the values are identical and a shared
 * type is a reasonable thing for the barrel pass to hoist later.
 */
export type ListingCardV4Aspect = '1:1' | '4:5' | '3:4' | '16:9';

/** The named ratios as RN's `aspectRatio` (width ÷ height). */
const ASPECT_VALUE: Record<ListingCardV4Aspect, number> = {
  '1:1': 1,
  '4:5': 4 / 5,
  '3:4': 3 / 4,
  '16:9': 16 / 9,
};

/**
 * The default ratio per layout, so a caller who says nothing still gets the
 * right shape: a grid tile mirrors `ProductCardV4`'s `4:5`, a featured card is
 * a banner, and a list row's thumbnail is a square because the *row* owns the
 * height.
 */
const DEFAULT_ASPECT: Record<ListingCardVariant, ListingCardV4Aspect> = {
  grid: '4:5',
  list: '1:1',
  featured: '16:9',
};

export interface ListingCardV4Props extends ListingCardProps {
  /**
   * The media box's proportion. Defaults per {@link ListingCardProps.variant} —
   * `4:5` for `grid` (the storefront tile's shape), `16:9` for `featured`,
   * `1:1` for the `list` thumbnail.
   *
   * A **fixed** ratio is the point, and it is the fix for a real twin
   * divergence: this twin gave the grid a fixed height of `160` while the web
   * twin gave the same variant `aspect-[4/3]`, so one prop produced two
   * shapes.
   */
  aspect?: ListingCardV4Aspect;
  /**
   * Carry `elevation.card`. Default `true` — §4.6 gives a shadow to "a card
   * sitting on the page", and a listing in a browse grid is exactly that.
   * Pass `false` for a listing card nested inside another card; §4.6 forbids
   * nesting a shadow in a shadow.
   */
  raised?: boolean;
  /**
   * Locale override for the price, handed straight to `PriceTagV4`.
   *
   * Rule 1 asks that every amount go through `formatMoney` **and** stay
   * overridable per call; the base card composed `PriceTag` without exposing
   * the override, so a card inside a locale-aware page could not be told about
   * it while the tag it contained could.
   */
  formatMoney?: MoneyFormatter;
  /**
   * The card's **one** badge slot, drawn over the top-left of the media —
   * the same slot, in the same corner, as `ProductCardV4`'s. Defaults to a
   * `ConditionBadgeV4` built from {@link ListingCardProps.condition}.
   *
   * One slot, deliberately: a tile that can carry three badges gets three
   * badges, and a page of tiles each shouting two things has no hierarchy left
   * for the thing it is selling (§7). Passing this **replaces** the condition
   * chip rather than adding to it.
   */
  badge?: React.ReactNode;
}

/**
 * **V4 listing card** — the marketplace's product card, and deliberately
 * indistinguishable from the storefront's.
 *
 * Brief §3 Group C: "`ListingCardV4` mirrors `ProductCardV4` — same ground,
 * same image ratio — so a storefront and a marketplace read as one product."
 * The anatomy below is that card's, slot for slot, read off
 * `commerce/ProductCardV4` rather than guessed:
 *
 * ```
 * [ media at a FIXED ratio, one badge over its top-left ]   ← edge to edge
 * [ title, at most two lines                            ]   ┐
 * [ PriceTagV4                                          ]   │ padding md
 * [ location line                                       ]   ┘
 * ```
 *
 * The card is `padding="none"` and the body carries the inset, so the photo
 * runs to the card's corners exactly as the storefront tile's does. The one
 * slot the storefront card does not have is the **watch toggle**, top-right,
 * opposite the badge — a marketplace affordance with no catalogue equivalent.
 *
 * That anatomy settles the one thing the base got backwards. **The price moved
 * below the title.** The base led with the price and put the title under it,
 * which reads as a price list rather than a catalogue: a shopper scanning a
 * grid is looking for *what a thing is*, then what it costs. It is also the
 * order `ProductCardV4` is built in, and the whole point of this component is
 * that the two are one card.
 *
 * The rest:
 *
 * 1. **The ground is `card`** (§4.2). The base painted `surface` — the colour
 *    of the page — so a grid on a dark page was a flat sheet of same-coloured
 *    rectangles held apart by hairlines.
 * 2. **The price is `PriceTagV4`** (rule 7), which carries the tabular figures
 *    (rule 2), the display face, the step up the type scale, and the announced
 *    `Was …` on a compare-at. Nothing here draws a number.
 * 3. **The watch chip clears the tap floor.** It was a 32 square — a control a
 *    shopper taps repeatedly, drawn below the 44 HIG floor, which is the same
 *    defect §2 records against `QuantityStepper`.
 * 4. **A watched listing is not in danger.** The base painted the filled heart
 *    `danger`; rule 3 reserves that tone for *bad*, and saving something you
 *    like is the opposite. It takes the brand.
 * 5. **The accessible name says the grade in words.** The base announced the
 *    raw slug — "Vintage camera, $125.00, like-new". See
 *    {@link CONDITION_V4_LABEL}.
 * 6. **Loading is a skeleton at the card's own footprint**, not the string
 *    "Loading listing…", which is a sentence where a card should be.
 * 7. **Press feedback is the state layer** (§4.3). `opacity: pressed ? 0.9`
 *    is deleted rather than translated: dimming fades the card's own content,
 *    which is the signal M3 spends `0.38` on to mean *disabled*.
 *
 * Composes `CardV4`, `PriceTagV4`, `ConditionBadgeV4`, `IconV4`, `TextV4` and
 * `SkeletonV4` (rule 7). Renders **nothing** without a title (§4.5).
 */
export function ListingCardV4({
  title,
  priceCents,
  currency = 'USD',
  compareAtCents,
  imageUrl,
  condition,
  subtitle,
  watched = false,
  onToggleWatch,
  onPress,
  variant = 'grid',
  loading = false,
  aspect,
  raised = true,
  formatMoney = defaultFormatMoney,
  badge,
  style,
}: ListingCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [pressed, setPressed] = React.useState(false);

  const horizontal = variant === 'list';

  // A listing with no headline is the blank bordered box §4.5 rules out.
  if (title === undefined || title === null || title === '') return null;

  const ratio = ASPECT_VALUE[aspect ?? DEFAULT_ASPECT[variant]];
  const tap = minTap(tokens.spacing);

  const chip =
    badge !== undefined ? (
      badge
    ) : condition !== undefined ? (
      <ConditionBadgeV4 condition={condition} size="sm" />
    ) : null;

  const watchChip =
    onToggleWatch != null ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={watched ? `Unwatch ${title}` : `Watch ${title}`}
        accessibilityState={{ selected: watched }}
        onPress={() => onToggleWatch(!watched)}
        style={{
          position: 'absolute',
          top: tokens.spacing.sm,
          right: tokens.spacing.sm,
          // The HIG tap floor, not a 32 square: this is a control a shopper
          // taps repeatedly.
          width: tap,
          height: tap,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.card,
        }}
      >
        {/*
          `heart` is in the named set; its hollow twin is not, so the unwatched
          state takes `glyph` — the escape hatch `IconV4` documents for "a
          one-off glyph the named set has no name for". Rule 3: a saved listing
          is emphasis, so the filled heart is `primary`, never `danger`.
        */}
        <IconV4
          name={watched ? 'heart' : undefined}
          glyph={watched ? undefined : '♡'}
          size="base"
          color={watched ? 'primary' : 'muted'}
        />
      </Pressable>
    ) : null;

  const media = (
    <View
      testID="xen-v4-listing-media"
      style={{
        aspectRatio: ratio,
        width: horizontal ? tokens.spacing['2xl'] * 2 : '100%',
        /*
          `muted`, not a neutral ramp step. The ramps carry the LIGHT
          orientation in both schemes, so a ramp placeholder is a pale
          rectangle punched into a dark page — the same trap `ProductCardV4`
          documents, and the same semantic slot it reaches for instead.
        */
        backgroundColor: colors.muted,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {imageUrl !== undefined && imageUrl !== '' ? (
        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        /*
          The same plate `ProductCardV4` falls back to, from the same seed — so
          a listing with no photo and a catalogue product with no photo are the
          same picture rather than two different apologies.

          Deliberately unlabelled: it is a placeholder, not a picture of the
          item, and the title is printed directly beneath it. Labelling it
          would announce the listing twice.
        */
        <GenerativeCoverV4 seed={title} style={{ width: '100%', height: '100%' }} />
      )}
      {/* One badge, top-left — the same slot, in the same corner, as `ProductCardV4`'s. */}
      {chip !== null ? (
        <View style={{ position: 'absolute', left: tokens.spacing.sm, top: tokens.spacing.sm }}>
          {chip}
        </View>
      ) : null}
    </View>
  );

  const info = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md, justifyContent: 'center' }}>
      {loading ? (
        <SkeletonV4 variant="text" lines={3} />
      ) : (
        <>
          <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={2}>
            {title}
          </TextV4>
          <PriceTagV4
            cents={priceCents}
            currency={currency}
            compareAtCents={compareAtCents}
            formatMoney={formatMoney}
            size={variant === 'featured' ? 'lg' : 'md'}
          />
          {subtitle !== undefined && subtitle !== '' ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {subtitle}
            </TextV4>
          ) : null}
        </>
      )}
    </View>
  );

  const card = (ground: string): React.ReactElement => (
    <CardV4
      testID="xen-v4-listing-card"
      variant={raised ? 'elevated' : 'outlined'}
      radius="lg"
      // The media runs to the card's corners; the body carries the inset.
      padding="none"
      // `style` is the last entry in `CardV4`'s own array, so this is how a
      // composite overrides the `surface` fill the primitive hard-codes — the
      // native equivalent of the web twin's specificity sheet.
      style={[
        { flexDirection: horizontal ? 'row' : 'column', backgroundColor: ground, overflow: 'hidden' },
        style,
      ]}
    >
      {media}
      {info}
      {watchChip}
    </CardV4>
  );

  if (!onPress) return card(colors.card);

  const priceLabel = formatMoney(priceCents, currency);
  const grade = condition !== undefined ? (CONDITION_V4_LABEL[condition] ?? condition) : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${priceLabel}${grade !== undefined ? `, ${grade}` : ''}`}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      {card(pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card)}
    </Pressable>
  );
}
