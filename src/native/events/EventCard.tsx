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
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';

/** Visual density / emphasis of an {@link EventCard}. */
export type EventCardVariant = 'default' | 'compact' | 'featured';

export interface EventCardProps {
  /** Event name. */
  title: string;
  /** Pre-formatted date label, e.g. `Sat, Aug 24`. */
  date?: string;
  /** Pre-formatted time label, e.g. `7:00 PM`. */
  time?: string;
  /** Venue / location line. */
  location?: string;
  /** Cover image URL. When absent a token-filled placeholder is drawn. */
  imageUrl?: string;
  /** Alt text for the cover (defaults to the title). */
  imageAlt?: string;
  /** Short category label rendered as a badge (e.g. `Music`). */
  category?: string;
  /** Attendee count shown with a people glyph. */
  attendeeCount?: number;
  /** Density / emphasis. `featured` enlarges the cover and title. */
  variant?: EventCardVariant;
  /** Press handler for the whole card. */
  onPress?: () => void;
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Summary tile for a single event — the entry point of the events module.
 * Renders a cover (image or token placeholder), an optional category badge,
 * the title, and a date / time / location meta row. `variant` switches between
 * a full card, a `compact` list row (no cover), and a larger `featured`
 * treatment. The whole card is pressable via `onPress`. All colors come from
 * the compiled theme tokens — no literal colors.
 */
export function EventCard({
  title,
  date,
  time,
  location,
  imageUrl,
  imageAlt,
  category,
  attendeeCount,
  variant = 'default',
  onPress,
  loading = false,
  style,
}: EventCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading event" style={containerStyle}>
        {!isCompact ? (
          <View style={{ height: isFeatured ? 200 : 140, backgroundColor: tokens.ramps.neutral[200] }} />
        ) : null}
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: tokens.spacing.md, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const metaLine = [date, time].filter(Boolean).join(' · ');

  const cover =
    !isCompact ? (
      <View style={{ height: isFeatured ? 200 : 140, width: '100%', backgroundColor: tokens.ramps.neutral[100] }}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            accessible
            accessibilityLabel={imageAlt ?? title}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon glyph="🎟️" size="2xl" />
          </View>
        )}
        {category ? (
          <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
            <Badge tone="primary">{category}</Badge>
          </View>
        ) : null}
      </View>
    ) : null;

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
      {isCompact && category ? (
        <Badge tone="primary">{category}</Badge>
      ) : null}
      <Text
        numberOfLines={2}
        style={{
          color: colors.onSurface,
          fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.base,
          fontWeight: '700',
        }}
      >
        {title}
      </Text>
      {metaLine ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="🗓️" size="sm" color="muted" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{metaLine}</Text>
        </View>
      ) : null}
      {location ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="📍" size="sm" color="muted" />
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {location}
          </Text>
        </View>
      ) : null}
      {typeof attendeeCount === 'number' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="👥" size="sm" color="muted" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {`${attendeeCount} going`}
          </Text>
        </View>
      ) : null}
    </View>
  );

  const inner = isCompact ? (
    body
  ) : (
    <>
      {cover}
      {body}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { flexDirection: isCompact ? 'row' : 'column', opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={[containerStyle, { flexDirection: isCompact ? 'row' : 'column' }]}>{inner}</View>;
}
