import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, formatMoney, type BadgeTone } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import {
  listingGradient,
  listingScrim,
  listingInk,
  listingInkSoft,
  listingTile,
  listingBorder,
} from './internal/listing';
import type { PropertyStatus } from './PropertyCard';

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

export interface ListingHeroProps {
  /** Hero photo URI. Omit to fall back to the brand-gradient ground. */
  imageUrl?: string;
  /** Price in integer minor units (cents). For `rent`, this is the monthly rent. */
  priceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Sale vs. rent — `rent` appends a "/mo" suffix to the price. Default `sale`. */
  variant?: 'sale' | 'rent';
  /** Street address / headline line, overlaid on the scrim. */
  address: string;
  /** Secondary locality line (e.g. "Brooklyn, NY 11201"). */
  locality?: string;
  /** Optional status chip overlaid on the photo. */
  status?: PropertyStatus;
  /** Bedroom count, shown in the facts strip. */
  beds?: number;
  /** Bathroom count, shown in the facts strip. */
  baths?: number;
  /** Interior area in square feet, shown in the facts strip. */
  sqft?: number;
  /** Total photo count, shown as a frosted counter over the media. */
  photoCount?: number;
  /** Whether the listing is currently saved (fills the heart). */
  saved?: boolean;
  /** Fires when the saved/heart control is toggled. Hidden when unset. */
  onSave?: () => void;
  /** Fires when the share control is pressed. Hidden when unset. */
  onShare?: () => void;
  /** Fires on the primary tour CTA. The CTA is hidden when unset. */
  onTour?: () => void;
  /** Primary CTA label (default "Schedule tour"). */
  tourLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * ListingHero — the property-detail **peak** for the real-estate V4 "listing"
 * line. A full-bleed hero photo with a bottom `listingScrim` gradient carries the
 * near-white price + address; a status chip, a frosted photo counter, and
 * saved/share controls float over the media; the beds/baths/sqft facts read as
 * frosted tiles and a near-white Tour pill anchors the bottom. With no `imageUrl`
 * it falls back to the brand gradient ground (`listingGradient`). Presentational
 * — shaped data + callbacks, nothing fetches. Token-only colors via
 * `useXenitionTheme()` + the listing ramp helpers, dark-mode safe. The
 * `sale`/`rent` variant only changes the price suffix.
 */
export function ListingHero({
  imageUrl,
  priceCents,
  currency = 'USD',
  variant = 'sale',
  address,
  locality,
  status,
  beds,
  baths,
  sqft,
  photoCount,
  saved = false,
  onSave,
  onShare,
  onTour,
  tourLabel = 'Schedule tour',
  style,
}: ListingHeroProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = listingInk(r);
  const inkSoft = listingInkSoft(r);

  const facts: { glyph: string; value: string }[] = [];
  if (typeof beds === 'number') facts.push({ glyph: '🛏', value: `${beds} bd` });
  if (typeof baths === 'number') facts.push({ glyph: '🛁', value: `${baths} ba` });
  if (typeof sqft === 'number') facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });

  const priceText = `${formatMoney(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;

  const RoundControl = ({ label, glyph, onPress }: { label: string; glyph: string; onPress: () => void }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: listingTile(r),
        borderWidth: 1,
        borderColor: listingBorder(r),
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
        {glyph}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={[{ minHeight: 380, borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border }, style]}
    >
      {/* Hero photo, or the brand gradient ground when absent. */}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ ...absoluteFill }} resizeMode="cover" />
      ) : (
        <GradientSurface colors={listingGradient(r)} style={{ ...absoluteFill }} />
      )}
      {/* Bottom scrim for legible near-white overlays. */}
      <GradientSurface
        colors={listingScrim(r)}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '66%' }}
      />

      {/* Top overlays: status + controls. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }}>
          {status ? (
            <Badge tone={STATUS_TONE[status]} variant="soft">
              {STATUS_LABEL[status]}
            </Badge>
          ) : null}
          {typeof photoCount === 'number' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: listingTile(r),
                borderWidth: 1,
                borderColor: listingBorder(r),
              }}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs }}>
                📷
              </Text>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                {photoCount.toLocaleString()}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {onSave ? (
            <RoundControl label={saved ? 'Remove from saved' : 'Save listing'} glyph={saved ? '❤️' : '🤍'} onPress={onSave} />
          ) : null}
          {onShare ? <RoundControl label="Share listing" glyph="↗" onPress={onShare} /> : null}
        </View>
      </View>

      {/* Bottom content: price, address, facts, CTA. */}
      <View style={{ marginTop: 'auto', gap: tokens.spacing.md, padding: tokens.spacing.lg }}>
        <View style={{ gap: tokens.spacing.xs }}>
          <Text
            allowFontScaling={false}
            accessibilityLabel={`Price ${priceText}`}
            style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }}
          >
            {priceText}
          </Text>
          <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {address}
          </Text>
          {locality ? (
            <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>
              {locality}
            </Text>
          ) : null}
        </View>

        {facts.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
            {facts.map((f) => (
              <View
                key={f.value}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radius.md,
                  backgroundColor: listingTile(r),
                  borderWidth: 1,
                  borderColor: listingBorder(r),
                }}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
                  {f.glyph}
                </Text>
                <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{f.value}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {onTour ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tourLabel}
            onPress={onTour}
            style={({ pressed }) => ({
              minHeight: 44,
              paddingVertical: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ink,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
              {tourLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } as const;
