import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine, skeletonFill } from './internal/salon-v4';
import type { StylistCardProps } from './StylistCard';

export interface StylistCardV4Props extends StylistCardProps {
  /** Copy on the fully-booked chip. Default `'Fully booked'`. */
  fullyBookedLabel?: string;
  /** Prefix on the from-price. Default `'from'`. */
  fromLabel?: string;
  /** Build the review count. Default `'128 reviews'`. */
  formatReviewCount?: (count: number) => string;
  /** At most this many specialty chips are drawn. Default `3`. */
  maxSpecialties?: number;
}

/**
 * **V4 stylist card** — same props as {@link StylistCard} plus
 * `fullyBookedLabel`, `fromLabel`, `formatReviewCount` and `maxSpecialties`.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number and its count.** A stylist list is
 *    exactly where a client compares 4.9 against 4.6, and the base drew five
 *    glyphs at `sm` and left the count as loose muted text.
 * 2. **Fully booked disables the CTA.** The base showed the chip and left
 *    "Book" live, so a client could tap through to a stylist with no slots.
 * 3. **The specialty chips are capped and wrap.** Seven specialties pushed the
 *    price off the row; §7 says chips wrap and are never clipped.
 * 4. **The from-price is tabular** with its prefix as a separate muted
 *    element, so a column of stylists lines up.
 * 5. **The skeleton is opaque** and press is a state layer.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function StylistCardV4({
  name,
  role,
  specialties = [],
  avatarUrl,
  rating,
  reviewCount,
  priceFromCents,
  currency = 'USD',
  formatMoney = defaultFormatMoney,
  availability,
  fullyBooked = false,
  variant = 'detailed',
  loading = false,
  bookLabel = 'Book',
  fullyBookedLabel = 'Fully booked',
  fromLabel = 'from',
  formatReviewCount,
  maxSpecialties = 3,
  onBook,
  onPress,
  style,
}: StylistCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <CardV4 style={[{ flexDirection: 'row', gap: tokens.spacing.sm }, style]}>
        <View
          style={{
            width: tokens.spacing['2xl'],
            height: tokens.spacing['2xl'],
            borderRadius: tokens.radius.full,
            backgroundColor: skeletonFill(theme),
          }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View
            style={{
              height: tokens.typography.scale.base,
              width: '55%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View
            style={{
              height: tokens.typography.scale.sm,
              width: '75%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        </View>
      </CardV4>
    );
  }

  if (!name) return null;

  const compact = variant === 'compact';
  const chips = specialties.filter(Boolean).slice(0, Math.max(0, maxSpecialties));
  const price =
    typeof priceFromCents === 'number' && Number.isFinite(priceFromCents)
      ? formatMoney(priceFromCents, currency)
      : null;
  const reviews =
    typeof reviewCount === 'number'
      ? (formatReviewCount ?? ((n: number) => `${n.toLocaleString()} reviews`))(reviewCount)
      : null;

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <AvatarV4 src={avatarUrl} name={name} size={compact ? 'sm' : 'md'} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {role ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {role}
            </TextV4>
          ) : null}
          {typeof rating === 'number' ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <RatingV4 value={rating} size="sm" showValue />
              {reviews ? (
                <TextV4 size="xs" tone="mutedText" numeric="tabular">
                  {reviews}
                </TextV4>
              ) : null}
            </View>
          ) : null}
        </View>
        {fullyBooked ? (
          <BadgeV4 tone="neutral" variant="soft" size="sm">
            {fullyBookedLabel}
          </BadgeV4>
        ) : availability ? (
          <BadgeV4 tone="success" variant="soft" size="sm">
            {availability}
          </BadgeV4>
        ) : null}
      </View>

      {/* §7: chips wrap and are never clipped, and the list is capped. */}
      {!compact && chips.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: tokens.spacing.xs,
            marginTop: tokens.spacing.sm,
          }}
        >
          {chips.map((s) => (
            <BadgeV4 key={s} tone="neutral" variant="outline" size="sm">
              {s}
            </BadgeV4>
          ))}
        </View>
      ) : null}

      {price || onBook ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
            marginTop: tokens.spacing.md,
          }}
        >
          {price ? (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
              <TextV4 size="xs" tone="mutedText">
                {fromLabel}
              </TextV4>
              <TextV4 face="heading" size="base" weight="bold" tone="onCard" numeric="tabular">
                {price}
              </TextV4>
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {onBook ? (
            <ButtonV4
              variant="primary"
              size="sm"
              // Fully booked DISABLES the CTA. The base showed the chip and
              // left the button live.
              disabled={fullyBooked}
              onPress={onBook}
              accessibilityLabel={`${bookLabel}, ${name}`}
            >
              {bookLabel}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (!onPress) return <CardV4 style={style}>{body}</CardV4>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metaLine([
        name,
        role,
        typeof rating === 'number' ? `rated ${rating}` : null,
        reviews,
        fullyBooked ? fullyBookedLabel : availability,
      ])}
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
