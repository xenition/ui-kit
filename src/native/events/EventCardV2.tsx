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
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { EventCardProps } from './EventCard';

/**
 * Alternate design (V2) for {@link EventCard}. Same props — a drop-in swap.
 *
 * Where the original stacks a cover above a text body, V2 is a **full-bleed
 * cover hero**: the image (or a token placeholder) fills the whole card, a
 * floating date chip sits top-left, the category badge top-right, and the
 * title + meta ride a bottom gradient scrim. The scrim is faked from stacked
 * `onSurface`-alpha bands (RN has no gradient without a dep) so the overlaid
 * text uses the guaranteed `surface`/`onSurface` contrast pair. Token-pure.
 */
export type EventCardV2Props = EventCardProps;

export function EventCardV2({
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
}: EventCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const coverHeight = variant === 'featured' ? 260 : variant === 'compact' ? 160 : 200;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      ...shadow('lg', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading event" style={containerStyle}>
        <View style={{ height: coverHeight, backgroundColor: tokens.ramps.neutral[200] }} />
      </View>
    );
  }

  const metaParts = [time, location].filter(Boolean).join('  ·  ');

  const hero = (
    <View style={{ height: coverHeight, width: '100%', backgroundColor: tokens.ramps.neutral[100] }}>
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

      {/* Faux-gradient scrim: stacked translucent bands anchored to the bottom. */}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%', backgroundColor: withAlpha(colors.onSurface, 0.28) }}
      />
      <View
        pointerEvents="none"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '24%', backgroundColor: withAlpha(colors.onSurface, 0.4) }}
      />
      <View
        pointerEvents="none"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '12%', backgroundColor: withAlpha(colors.onSurface, 0.55) }}
      />

      {/* Floating date chip, top-left. */}
      {date ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.md,
            left: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            ...shadow('sm', tokens),
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {date}
          </Text>
        </View>
      ) : null}

      {category ? (
        <View style={{ position: 'absolute', top: tokens.spacing.md, right: tokens.spacing.md }}>
          <Badge tone="primary">{category}</Badge>
        </View>
      ) : null}

      {/* Title + meta over the scrim, in the light `surface` token. */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: tokens.spacing.lg, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={2}
          style={{
            color: colors.surface,
            fontSize: variant === 'featured' ? tokens.typography.scale['2xl'] : tokens.typography.scale.xl,
            fontWeight: '800',
          }}
        >
          {title}
        </Text>
        {metaParts ? (
          <Text numberOfLines={1} style={{ color: withAlpha(colors.surface, 0.88), fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {metaParts}
          </Text>
        ) : null}
        {typeof attendeeCount === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Icon glyph="👥" size="sm" />
            <Text style={{ color: withAlpha(colors.surface, 0.88), fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {`${attendeeCount} going`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
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
          <Animated.View style={[containerStyle, { transform: [{ scale: press.scale }] }]}>{hero}</Animated.View>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}>{hero}</Animated.View>
  );
}
