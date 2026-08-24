import * as React from 'react';
import {
  Animated,
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
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { EventCardProps } from './EventCard';

/**
 * Alternate design (V3) for {@link EventCard}. Same props — a drop-in swap.
 *
 * A **horizontal media-left row**: a square cover thumbnail on the left carries
 * a floating token date block (the date string), and a text column on the right
 * holds the category badge, title, and location / attendee meta. Far denser and
 * more list-friendly than the original vertical card, and distinct from its
 * cover-less `compact` row (this keeps the media). Token-pure.
 */
export type EventCardV3Props = EventCardProps;

export function EventCardV3({
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
}: EventCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });
  const press = usePressScale();
  const media = variant === 'featured' ? 112 : 92;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      flexDirection: 'row',
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
        <View style={{ width: media, height: media, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.sm, justifyContent: 'center' }}>
          <View style={{ height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: tokens.spacing.md, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const metaLine = [time, location].filter(Boolean).join('  ·  ');

  const inner = (
    <>
      <View style={{ width: media, height: media, backgroundColor: tokens.ramps.neutral[100] }}>
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
            <Icon glyph="🎟️" size="lg" />
          </View>
        )}
        {date ? (
          <View
            style={{
              position: 'absolute',
              bottom: tokens.spacing.xs,
              left: tokens.spacing.xs,
              right: tokens.spacing.xs,
              alignItems: 'center',
              backgroundColor: colors.surface,
              borderRadius: tokens.radius.sm,
              paddingVertical: 1,
              ...shadow('sm', tokens),
            }}
          >
            <Text numberOfLines={1} style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.5 }}>
              {date}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={{ flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.xs, justifyContent: 'center' }}>
        {category ? <Badge tone="primary" size="sm">{category}</Badge> : null}
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {metaLine ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {metaLine}
          </Text>
        ) : null}
        {typeof attendeeCount === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Icon glyph="👥" size="sm" color="muted" />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`${attendeeCount} going`}</Text>
          </View>
        ) : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          <Animated.View style={[containerStyle, { transform: [{ scale: press.scale }] }]}>{inner}</Animated.View>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}>{inner}</Animated.View>
  );
}
