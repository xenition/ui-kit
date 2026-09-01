import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, PriceTag, formatMoney, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PropertyCardProps, PropertyStatus } from './PropertyCard';

/** Drop-in for {@link PropertyCardProps} — same props, the V4 "listing" design. */
export type PropertyCardV4Props = PropertyCardProps;

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
 * PropertyCard — **V4** "listing" design. The image-forward, editorial take on a
 * listing summary: an elevated card with a floating rounded photo, an overlaid
 * status chip, a price-forward header, and the beds/baths/sqft facts as small
 * soft-primary chips. Same props/behavior as {@link PropertyCardProps}; the
 * `sale`/`rent` variant only changes the price suffix. Token-only colors via
 * `useXenitionTheme()`. `loading` shows a recap.
 */
export function PropertyCardV4({
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
}: PropertyCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const facts: { glyph: string; value: string }[] = [];
  if (typeof beds === 'number') facts.push({ glyph: '🛏', value: `${beds} bd` });
  if (typeof baths === 'number') facts.push({ glyph: '🛁', value: `${baths} ba` });
  if (typeof sqft === 'number') facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });

  const body = (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Floating rounded photo. */}
      <View style={{ height: 190, borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: withAlpha(colors.onSurface, 0.08), alignItems: 'center', justifyContent: 'center' }}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No photo</Text>
        )}
        {status ? (
          <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
            <Badge tone={STATUS_TONE[status]} variant="soft">
              {STATUS_LABEL[status]}
            </Badge>
          </View>
        ) : null}
      </View>

      <View style={{ paddingHorizontal: tokens.spacing.xs, paddingTop: tokens.spacing.md, paddingBottom: tokens.spacing.xs, gap: tokens.spacing.xs }}>
        {loading ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading listing…</Text>
        ) : (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
              <PriceTag cents={priceCents} currency={currency} size="lg" />
              {variant === 'rent' ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>/mo</Text> : null}
            </View>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {address}
            </Text>
            {locality ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {locality}
              </Text>
            ) : null}
            {facts.length > 0 ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, marginTop: 2 }}>
                {facts.map((f) => (
                  <View
                    key={f.value}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      paddingHorizontal: tokens.spacing.sm,
                      paddingVertical: 2,
                      borderRadius: tokens.radius.full,
                      backgroundColor: withAlpha(colors.primary, 0.1),
                    }}
                  >
                    <Text style={{ fontSize: tokens.typography.scale.xs }}>{f.glyph}</Text>
                    <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{f.value}</Text>
                  </View>
                ))}
              </View>
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
      accessibilityLabel={`${address}, ${priceLabel}${facts.length ? `, ${facts.map((f) => f.value).join(', ')}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
