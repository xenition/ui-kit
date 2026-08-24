import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { SpeakerCardProps } from './SpeakerCard';

/**
 * Alternate design (V3) for {@link SpeakerCard}. Same props — a drop-in swap.
 *
 * A **compact directory row**: a small avatar beside a tight two-line name /
 * role, with the rating and (at most two) topic tags folded onto the trailing
 * edge. No bio, no banner — the densest speaker treatment, sized for long
 * scrolling lists. Uses a minimal hairline-bottom rule rather than a full card
 * border. Token-pure.
 */
export type SpeakerCardV3Props = SpeakerCardProps;

export function SpeakerCardV3({
  name,
  role,
  company,
  avatarUrl,
  rating,
  tags = [],
  onPress,
  style,
}: SpeakerCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });
  const press = usePressScale();
  const roleLine = [role, company].filter(Boolean).join('  ·  ');
  const shownTags = tags.slice(0, 2);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  const content = (
    <>
      <Avatar src={avatarUrl} name={name} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {roleLine ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{roleLine}</Text>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        {typeof rating === 'number' ? <Rating value={rating} size="sm" /> : null}
        {shownTags.length > 0 ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
            {shownTags.map((t, i) => (
              <Badge key={`${t}-${i}`} tone="neutral" size="sm">{t}</Badge>
            ))}
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
          accessibilityLabel={name}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.85 : 1 }]}
        >
          <Animated.View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, transform: [{ scale: press.scale }] }}>
            {content}
          </Animated.View>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}>{content}</Animated.View>
  );
}
