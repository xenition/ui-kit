import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, PriceTag, formatMoney } from '../primitives';
import { ConditionBadge } from './ConditionBadge';
import { withAlpha } from './internal';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { ListingCardProps } from './ListingCard';

/** Drop-in alternate of {@link ListingCardProps} — identical prop contract. */
export type ListingCardV2Props = ListingCardProps;

/**
 * ListingCard — Design V2: a horizontal "media-left" card with a dedicated
 * right-hand **price rail**. The hero sits on the left; the middle column
 * carries the title, condition chip, and location; and a tinted vertical rail
 * on the trailing edge isolates the price (plus the ♥ watch toggle) so scanning
 * a feed reads price-first. Elevated (drop shadow, no border) rather than the
 * V1 bordered grid tile, so the two are distinct at a glance. Same props as
 * `ListingCard`; presentational only; token-pure colors with `withAlpha` tints.
 */
export function ListingCardV2({
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
  loading = false,
  style,
}: ListingCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const mediaSize = 104;

  const watchChip =
    onToggleWatch != null ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={watched ? `Unwatch ${title}` : `Watch ${title}`}
        accessibilityState={{ selected: watched }}
        onPress={() => onToggleWatch(!watched)}
        hitSlop={8}
        style={{
          width: 30,
          height: 30,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.surface, 0.9),
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }}>
          {watched ? '♥' : '♡'}
        </Text>
      </Pressable>
    ) : null;

  const media = (
    <View
      style={{
        width: mediaSize,
        height: mediaSize,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No photo</Text>
      )}
    </View>
  );

  const info = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, justifyContent: 'center' }}>
      {loading ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading listing…</Text>
      ) : (
        <>
          <Text
            numberOfLines={2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
            {subtitle ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, flexShrink: 1 }}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </>
      )}
    </View>
  );

  // The trailing price rail — a tinted column that separates money from copy.
  const rail = loading ? null : (
    <View
      style={{
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: tokens.spacing.md,
        marginLeft: tokens.spacing.xs,
        borderLeftWidth: 1,
        borderLeftColor: withAlpha(colors.primary, 0.16),
        gap: tokens.spacing.sm,
      }}
    >
      {watchChip}
      <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
    </View>
  );

  const body = (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
          transform: [{ scale: press.scale }],
        },
        shadow('md', tokens),
        style,
      ]}
    >
      {media}
      {info}
      {rail}
    </Animated.View>
  );

  if (!onPress) return body;
  const priceLabel = formatMoney(priceCents, currency);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`}
      onPress={onPress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {body}
    </Pressable>
  );
}
