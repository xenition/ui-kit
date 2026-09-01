import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Avatar, Button, Icon } from '../primitives';
import { listingGradient, listingTile } from './internal/listing';
import { GradientSurface } from './internal/GradientSurface';
import type { AgentCardProps } from './AgentCard';

/** Drop-in for {@link AgentCardProps} — same props, the V4 "listing" design. */
export type AgentCardV4Props = AgentCardProps;

/**
 * AgentCard — **V4** "listing" design. The image-forward, editorial take on a
 * listing-agent summary: an elevated rounded card with the avatar floating over
 * a subtle soft-primary gradient accent, a name-forward header, a warm star
 * rating, and a contact affordance. Same props/behavior as {@link AgentCardProps};
 * `variant="compact"` drops the rating row for dense lists. Token-only colors via
 * `useXenitionTheme()` (+ the listing gradient helpers for the avatar accent).
 */
export function AgentCardV4({
  name,
  title,
  agency,
  avatarUrl,
  rating,
  reviewCount,
  contactLabel = 'Contact',
  onContact,
  onPress,
  variant = 'default',
  style,
}: AgentCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const hasRating = typeof rating === 'number';
  const fullStars = hasRating ? Math.round(Math.min(Math.max(rating!, 0), 5)) : 0;
  const meta = [title, agency].filter(Boolean).join(' · ');

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Avatar floating over a subtle soft-primary gradient accent. */}
      <GradientSurface
        colors={listingGradient(tokens.ramps)}
        style={{ borderRadius: tokens.radius.full, padding: 3, backgroundColor: listingTile(tokens.ramps) }}
      >
        <Avatar src={avatarUrl} name={name} size={compact ? 'md' : 'lg'} />
      </GradientSurface>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {meta}
          </Text>
        ) : null}
        {hasRating && !compact ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }}>
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
      </View>
      {onContact ? (
        <Button variant="secondary" size="sm" onPress={onContact}>
          {contactLabel}
        </Button>
      ) : null}
    </View>
  );

  if (!onPress) return body;

  const ratingLabel = hasRating ? `, rated ${rating} of 5` : '';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}${meta ? `, ${meta}` : ''}${ratingLabel}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
