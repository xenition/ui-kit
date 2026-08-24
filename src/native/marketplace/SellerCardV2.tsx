import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Avatar, Badge, Button, Rating } from '../primitives';
import { withAlpha } from './internal';
import { shadow } from '../primitives/internal/elevation';
import type { SellerCardProps } from './SellerCard';

/** Drop-in alternate of {@link SellerCardProps} — identical prop contract. */
export type SellerCardV2Props = SellerCardProps;

/**
 * SellerCard — Design V2: a **profile-banner** card. A primary-tinted cover band
 * fills the header; the avatar overlaps it, centered; and the name, verified
 * badge, rating, and a row of stat cells (sales / rating) stack beneath, with a
 * full-width contact action at the foot. Vertical and centered — a shop
 * "storefront" identity rather than the V1 horizontal row. Same props as
 * `SellerCard`; the contact button stays outside the profile press target;
 * token-pure colors with `withAlpha` tints; elevated surface.
 */
export function SellerCardV2({
  name,
  avatarUrl,
  rating,
  reviewCount,
  salesCount,
  location,
  verified = false,
  actionLabel = 'Contact',
  onContact,
  onPress,
  style,
}: SellerCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const statCell = (label: string, value: string): React.ReactElement => (
    <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{value}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
    </View>
  );

  const stats: React.ReactElement[] = [];
  if (typeof rating === 'number') {
    stats.push(<React.Fragment key="rating">{statCell('rating', rating.toFixed(1))}</React.Fragment>);
  }
  if (typeof salesCount === 'number') {
    stats.push(<React.Fragment key="sales">{statCell('sales', salesCount.toLocaleString())}</React.Fragment>);
  }
  if (typeof reviewCount === 'number') {
    stats.push(<React.Fragment key="reviews">{statCell('reviews', reviewCount.toLocaleString())}</React.Fragment>);
  }

  const identity = (
    <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
      <Avatar src={avatarUrl} name={name} size="xl" />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
        >
          {name}
        </Text>
        {verified ? (
          <Badge tone="accent" variant="soft" size="sm">
            ✓ Verified
          </Badge>
        ) : null}
      </View>
      {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
      {location ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {location}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        shadow('md', tokens),
        style,
      ]}
    >
      {/* Cover band. */}
      <View style={{ height: 56, backgroundColor: withAlpha(colors.primary, 0.14) }} />
      <View style={{ paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, marginTop: -34, gap: tokens.spacing.md }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${name}${verified ? ', verified seller' : ''}${typeof rating === 'number' ? `, rated ${rating} of 5` : ''}`}
            onPress={onPress}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            {identity}
          </Pressable>
        ) : (
          identity
        )}

        {stats.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: tokens.spacing.sm,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: withAlpha(colors.primary, 0.12),
            }}
          >
            {stats}
          </View>
        ) : null}

        {onContact ? (
          <Button variant="primary" size="sm" onPress={onContact}>
            {actionLabel}
          </Button>
        ) : null}
      </View>
    </View>
  );
}
