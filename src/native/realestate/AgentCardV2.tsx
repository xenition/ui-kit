import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Avatar, Button, Icon } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { AgentCardProps } from './AgentCard';

/** Drop-in alternate of {@link AgentCardProps} — identical prop contract. */
export type AgentCardV2Props = AgentCardProps;

/**
 * AgentCard — design variant **V2**: a **centered hero profile**. A large
 * avatar sits above a centered name, title/agency, and star rating, with the
 * contact action rendered as a full-width primary button at the foot. Where V1
 * is a horizontal row, V2 is a portrait "business card" for a profile header or
 * a featured-agent slot. Same props as {@link AgentCardProps}; the `variant`
 * prop is accepted but the hero is always centered. Token-only, elevated.
 */
export function AgentCardV2({
  name,
  title,
  agency,
  avatarUrl,
  rating,
  reviewCount,
  contactLabel = 'Contact',
  onContact,
  onPress,
  style,
}: AgentCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 10 });
  const hasRating = typeof rating === 'number';
  const fullStars = hasRating ? Math.round(Math.min(Math.max(rating!, 0), 5)) : 0;
  const meta = [title, agency].filter(Boolean).join(' · ');

  const body = (
    <View
      style={[
        {
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 0,
          backgroundColor: colors.surface,
          paddingVertical: tokens.spacing.xl,
          paddingHorizontal: tokens.spacing.lg,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <Avatar src={avatarUrl} name={name} size="xl" />
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }}>
        {name}
      </Text>
      {meta ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>{meta}</Text>
      ) : null}
      {hasRating ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} glyph={i < fullStars ? '★' : '☆'} size="sm" color={i < fullStars ? 'warn' : 'muted'} />
            ))}
          </View>
          {typeof reviewCount === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`(${reviewCount})`}</Text>
          ) : null}
        </View>
      ) : null}
      {onContact ? (
        <Button variant="primary" size="md" onPress={onContact} style={{ alignSelf: 'stretch', marginTop: tokens.spacing.sm }}>
          {contactLabel}
        </Button>
      ) : null}
    </View>
  );

  if (!onPress) {
    return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
  }

  const ratingLabel = hasRating ? `, rated ${rating} of 5` : '';
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}${meta ? `, ${meta}` : ''}${ratingLabel}`}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
