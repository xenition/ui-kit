import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { SpeakerCardProps } from './SpeakerCard';

/**
 * Alternate design (V2) for {@link SpeakerCard}. Same props — a drop-in swap.
 *
 * A **centered profile hero**: a soft primary-tinted top band, a large ringed
 * `xl` avatar straddling it, then the name, role, rating, bio and topic tags
 * all centered beneath — an elevated card built for a "meet the speaker"
 * spotlight rather than a list row. Ignores `variant` (always the hero form) so
 * it stays visually one thing. Token-pure.
 */
export type SpeakerCardV2Props = SpeakerCardProps;

export function SpeakerCardV2({
  name,
  role,
  company,
  avatarUrl,
  bio,
  rating,
  tags = [],
  onPress,
  style,
}: SpeakerCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const roleLine = [role, company].filter(Boolean).join('  ·  ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      ...shadow('md', tokens),
    },
    style,
  ];

  const content = (
    <View>
      {/* Tinted banner the avatar overlaps. */}
      <View style={{ height: 56, backgroundColor: withAlpha(colors.primary, 0.1) }} />
      <View style={{ alignItems: 'center', paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.sm, marginTop: -36 }}>
        <Avatar src={avatarUrl} name={name} size="xl" ring />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }}>
          {name}
        </Text>
        {roleLine ? (
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600', textAlign: 'center' }}>
            {roleLine}
          </Text>
        ) : null}
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        {bio ? (
          <Text numberOfLines={4} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
            {bio}
          </Text>
        ) : null}
        {tags.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, justifyContent: 'center', marginTop: tokens.spacing.xs }}>
            {tags.map((t, i) => (
              <Badge key={`${t}-${i}`} tone="primary" variant="soft" size="sm">{t}</Badge>
            ))}
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
          accessibilityLabel={name}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          <Animated.View style={[containerStyle, { transform: [{ scale: press.scale }] }]}>{content}</Animated.View>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}>{content}</Animated.View>
  );
}
