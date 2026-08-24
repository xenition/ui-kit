import * as React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { Rating } from '../primitives/Rating';

/** Emphasis of a {@link VenueCard}. */
export type VenueCardVariant = 'default' | 'compact';

export interface VenueCardProps {
  /** Venue name. */
  name: string;
  /** Street / address line. */
  address?: string;
  /** Distance label, e.g. `1.2 mi`. */
  distance?: string;
  /** Seating / attendee capacity. */
  capacity?: number;
  /** Optional 0–5 rating. */
  rating?: number;
  /** Photo URL. When absent a token map placeholder is drawn. */
  imageUrl?: string;
  /** Alt text for the photo (defaults to the name). */
  imageAlt?: string;
  /** Density. `compact` drops the media band. */
  variant?: VenueCardVariant;
  /** Press handler, e.g. open in maps. */
  onPress?: () => void;
  /** Directions handler; renders a small directions affordance when provided. */
  onDirections?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Venue summary — a photo (or token placeholder), name, address, and optional
 * capacity / rating / distance meta. `compact` removes the media for dense
 * lists. Colors come from the compiled theme tokens; no literal colors.
 */
export function VenueCard({
  name,
  address,
  distance,
  capacity,
  rating,
  imageUrl,
  imageAlt,
  variant = 'default',
  onPress,
  onDirections,
  style,
}: VenueCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isCompact = variant === 'compact';

  const media = !isCompact ? (
    <View style={{ height: 120, width: '100%', backgroundColor: tokens.ramps.neutral[100] }}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          accessible
          accessibilityLabel={imageAlt ?? name}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Icon glyph="🗺️" size="2xl" />
        </View>
      )}
    </View>
  ) : null;

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
      <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {name}
      </Text>
      {address ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="📍" size="sm" color="muted" />
          <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {address}
          </Text>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        {typeof capacity === 'number' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`Seats ${capacity}`}</Text>
        ) : null}
        {distance ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{distance}</Text>
        ) : null}
      </View>
      {onDirections ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Directions to ${name}`}
          onPress={onDirections}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, alignSelf: 'flex-start', marginTop: tokens.spacing.xs })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Directions</Text>
        </Pressable>
      ) : null}
    </View>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      flexDirection: isCompact ? 'row' : 'column',
    },
    style,
  ];

  const inner = (
    <>
      {media}
      {body}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }
  return <View style={containerStyle}>{inner}</View>;
}
