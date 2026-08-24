import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, PriceTag, formatMoney, type BadgeTone } from '../primitives';

/** Whether the listing is for sale or for rent (drives the price suffix). */
export type PropertyCardVariant = 'sale' | 'rent';

/** Listing status chip shown over the media. */
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'new';

export interface PropertyCardProps {
  /** Street address / headline line. */
  address: string;
  /** Secondary locality line (e.g. "Brooklyn, NY 11201"). */
  locality?: string;
  /** Price in integer minor units (cents). For `rent`, this is the monthly rent. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Sale vs. rent — `rent` appends a "/mo" suffix to the price. */
  variant?: PropertyCardVariant;
  /** Bedroom count. */
  beds?: number;
  /** Bathroom count. */
  baths?: number;
  /** Interior area in square feet. */
  sqft?: number;
  /** Hero image URI. Omit for a token-styled placeholder. */
  imageUrl?: string;
  /** Optional status chip rendered on the media. */
  status?: PropertyStatus;
  /** Fires when the card is pressed (e.g. open the detail screen). */
  onPress?: () => void;
  /** Renders a lightweight placeholder recap instead of data. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

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
 * A single real-estate listing summary — hero media, price, address, and the
 * beds/baths/sqft fact row. Data + `onPress` only; nothing fetches. The `sale`
 * vs. `rent` variant only changes the price suffix ("/mo" for rentals). Colors
 * come exclusively from the compiled theme via `useXenitionTheme()`; the media
 * placeholder and status chip are token-styled. Pass `loading` for a recap.
 */
export function PropertyCard({
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
}: PropertyCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const facts: string[] = [];
  if (typeof beds === 'number') facts.push(`${beds} bd`);
  if (typeof baths === 'number') facts.push(`${baths} ba`);
  if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);

  const media = (
    <View
      style={{
        height: 180,
        borderTopLeftRadius: tokens.radius.lg,
        borderTopRightRadius: tokens.radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No photo</Text>
      )}
      {status ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
        </View>
      ) : null}
    </View>
  );

  const body = (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {media}
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.xs }}>
        {loading ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading listing…</Text>
        ) : (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
              <PriceTag cents={priceCents} currency={currency} size="lg" />
              {variant === 'rent' ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>/mo</Text>
              ) : null}
            </View>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
            >
              {address}
            </Text>
            {locality ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {locality}
              </Text>
            ) : null}
            {facts.length > 0 ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {facts.join(' · ')}
              </Text>
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
