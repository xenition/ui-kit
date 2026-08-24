import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, formatMoney, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { PropertyCardProps, PropertyStatus } from './PropertyCard';

/** Drop-in alternate of {@link PropertyCardProps} — identical prop contract. */
export type PropertyCardV2Props = PropertyCardProps;

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
 * PropertyCard — design variant **V2**: a **full-bleed hero photo** with a
 * bottom gradient scrim and the price / address / beds-baths chips overlaid
 * directly on the image. Where V1 is a media-top card with a separate white
 * body, V2 is one immersive tile — the photo fills the frame and the facts sit
 * on a dark scrim at the bottom. Same props as {@link PropertyCardProps}; only
 * the layout differs. Token-only: the scrim is `withAlpha` of the neutral ramp,
 * overlay text is the lightest neutral step, chips are translucent.
 */
export function PropertyCardV2({
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
}: PropertyCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });

  const scrim = (a: number): string => withAlpha(tokens.ramps.neutral[900] ?? colors.onSurface, a);
  const light = tokens.ramps.neutral[50] ?? colors.onPrimary;

  const facts: string[] = [];
  if (typeof beds === 'number') facts.push(`${beds} bd`);
  if (typeof baths === 'number') facts.push(`${baths} ba`);
  if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);

  const body = (
    <View
      style={[
        {
          height: 300,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
          justifyContent: 'flex-end',
        },
        style,
      ]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        />
      ) : (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No photo</Text>
        </View>
      )}

      {/* Stacked bands read as a bottom-up gradient scrim. */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '70%', backgroundColor: scrim(0.22) }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '45%', backgroundColor: scrim(0.42) }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '22%', backgroundColor: scrim(0.66) }} />

      {status ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
        </View>
      ) : null}

      {loading ? (
        <View style={{ padding: tokens.spacing.lg }}>
          <Text style={{ color: light, fontSize: tokens.typography.scale.sm }}>Loading listing…</Text>
        </View>
      ) : (
        <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <Text style={{ color: light, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
              {formatMoney(priceCents, currency)}
            </Text>
            {variant === 'rent' ? (
              <Text style={{ color: light, fontSize: tokens.typography.scale.sm, opacity: 0.85 }}>/mo</Text>
            ) : null}
          </View>
          <Text numberOfLines={1} style={{ color: light, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {address}
          </Text>
          {locality ? (
            <Text numberOfLines={1} style={{ color: light, fontSize: tokens.typography.scale.sm, opacity: 0.85 }}>
              {locality}
            </Text>
          ) : null}
          {facts.length > 0 ? (
            <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
              {facts.map((f) => (
                <View
                  key={f}
                  style={{
                    backgroundColor: withAlpha(light, 0.2),
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                  }}
                >
                  <Text style={{ color: light, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{f}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      )}
    </View>
  );

  if (!onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>
    );
  }

  const priceLabel = `${formatMoney(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${address}, ${priceLabel}${facts.length ? `, ${facts.join(', ')}` : ''}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
