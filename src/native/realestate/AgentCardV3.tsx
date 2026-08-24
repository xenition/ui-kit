import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Avatar, Button, Icon } from '../primitives';
import type { AgentCardProps } from './AgentCard';

/** Drop-in alternate of {@link AgentCardProps} — identical prop contract. */
export type AgentCardV3Props = AgentCardProps;

/**
 * AgentCard — design variant **V3**: an **ultra-compact borderless row**. A
 * small avatar, a single-line name + inline collapsed rating ("★ 4.0 · 87"),
 * and a `link`-style contact action with a trailing chevron. Where V1 is a
 * bordered card with a stacked star row, V3 is chrome-free for dense directory
 * lists — separation comes from spacing, not a box. Same props as
 * {@link AgentCardProps}. Token-only.
 */
export function AgentCardV3({
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
}: AgentCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasRating = typeof rating === 'number';
  const clamped = hasRating ? Math.min(Math.max(rating!, 0), 5) : 0;
  const meta = [title, agency].filter(Boolean).join(' · ');

  const ratingBits: string[] = [];
  if (hasRating) ratingBits.push(clamped.toFixed(1));
  if (typeof reviewCount === 'number') ratingBits.push(`${reviewCount}`);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Avatar src={avatarUrl} name={name} size="sm" />
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {hasRating ? <Icon glyph="★" size="xs" color="warn" /> : null}
          {ratingBits.length > 0 ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {ratingBits.join(' · ')}
              {meta ? `  ·  ${meta}` : ''}
            </Text>
          ) : meta ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {meta}
            </Text>
          ) : null}
        </View>
      </View>
      {onContact ? (
        <Button variant="link" size="sm" onPress={onContact} style={{ paddingHorizontal: 0 }}>
          {contactLabel}
        </Button>
      ) : onPress ? (
        <Icon glyph="›" size="lg" color="muted" />
      ) : null}
    </View>
  );

  if (!onPress) return body;

  const ratingLabel = hasRating ? `, rated ${clamped} of 5` : '';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}${meta ? `, ${meta}` : ''}${ratingLabel}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
