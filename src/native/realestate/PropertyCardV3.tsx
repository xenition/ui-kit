import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, formatMoney, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PropertyCardProps, PropertyStatus } from './PropertyCard';

/** Drop-in alternate of {@link PropertyCardProps} — identical prop contract. */
export type PropertyCardV3Props = PropertyCardProps;

const STATUS_TONE: Record<PropertyStatus, BadgeTone> = {
  active: 'success',
  pending: 'warn',
  sold: 'danger',
  new: 'primary',
};

const STATUS_LABEL: Record<PropertyStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  sold: 'Sold',
  new: 'New',
};

/**
 * PropertyCard — design variant **V3**: a horizontal **list row** with a square
 * thumbnail on the left, the address block in the middle, and a **price rail**
 * pinned to the right — a primary-tinted panel with an accent edge that carries
 * the price. Where V1 is a vertical media-top tile, V3 scans as a dense list
 * item. Same props as {@link PropertyCardProps}; only the layout differs.
 * Token-only: the rail fill is `withAlpha` of the primary token.
 */
export function PropertyCardV3({
  address,
  locality,
  priceCents,
  currency = 'USD',
  variant = 'sale',
  beds,
  baths,
  sqft,
  imageUrl,
  status,
  onPress,
  loading = false,
  style,
}: PropertyCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const facts: string[] = [];
  if (typeof beds === 'number') facts.push(`${beds} bd`);
  if (typeof baths === 'number') facts.push(`${baths} ba`);
  if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);

  const thumb = (
    <View
      style={{
        width: 104,
        alignSelf: 'stretch',
        backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No photo</Text>
      )}
    </View>
  );

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          minHeight: 96,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {thumb}

      <View style={{ flex: 1, minWidth: 0, paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.md, gap: 2, justifyContent: 'center' }}>
        {loading ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading listing…</Text>
        ) : (
          <>
            {status ? (
              <View style={{ flexDirection: 'row', marginBottom: tokens.spacing.xs }}>
                <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
              </View>
            ) : null}
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {address}
            </Text>
            {locality ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {locality}
              </Text>
            ) : null}
            {facts.length > 0 ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{facts.join(' · ')}</Text>
            ) : null}
          </>
        )}
      </View>

      {/* Price rail. */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: tokens.spacing.md,
          borderLeftWidth: 2,
          borderLeftColor: withAlpha(colors.primary, 0.5),
          backgroundColor: withAlpha(colors.primary, 0.08),
        }}
      >
        {loading ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>—</Text>
        ) : (
          <>
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {formatMoney(priceCents, currency)}
            </Text>
            {variant === 'rent' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>/mo</Text>
            ) : null}
          </>
        )}
      </View>
    </View>
  );

  if (!onPress) return body;

  const priceLabel = `${formatMoney(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${address}, ${priceLabel}${facts.length ? `, ${facts.join(', ')}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
