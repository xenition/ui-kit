import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Avatar, Button, Card, useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { spotlightGlow } from './internal/spotlight';
import { LiveBadge } from './LiveBadge';
import { formatCount } from './types';
import type { ChannelCardProps } from './ChannelCard';

/** Drop-in for {@link ChannelCardProps} — same props, the V4 "spotlight" design. */
export type ChannelCardV4Props = ChannelCardProps;

/**
 * ChannelCard — **V4** "spotlight" design. A rounded, elevated live/creator card:
 * the avatar sits inside a subtle brand-gradient glow ring (the V4 signature —
 * gradient reserved for the cover glow), with the name, category, and — when
 * `channel.live` — a `LiveBadge` plus a `formatCount` viewer label.
 * `onFollowToggle(next)` renders a **primary** follow `Button` (the one accent,
 * secondary once following). `onPress(channel)` opens the card with a ≥44px tap
 * target. Composes `Card` / `Avatar` / `Button`. Same props/behavior as
 * {@link ChannelCardProps}; token-only colors via `useXenitionTheme()`.
 */
export function ChannelCardV4({
  channel,
  following = false,
  variant = 'row',
  onPress,
  onFollowToggle,
  style,
}: ChannelCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const grid = variant === 'grid';
  const featured = variant === 'featured';
  const avatarSize = featured ? 'lg' : grid ? 'lg' : 'md';

  const followBtn = onFollowToggle ? (
    <Button
      variant={following ? 'secondary' : 'primary'}
      size="sm"
      onPress={() => onFollowToggle(!following)}
      accessibilityLabel={following ? `Unfollow ${channel.name}` : `Follow ${channel.name}`}
    >
      {following ? 'Following' : 'Follow'}
    </Button>
  ) : null;

  const subtitle = [
    channel.category,
    channel.live && channel.viewers != null ? `${formatCount(channel.viewers)} watching` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  /* Avatar wrapped in a soft brand-gradient glow ring — the V4 cover glow. */
  const glowAvatar = (
    <GradientSurface
      colors={spotlightGlow(r)}
      style={{ padding: 2, borderRadius: tokens.radius.full, alignSelf: 'flex-start' }}
    >
      <View style={{ padding: 2, borderRadius: tokens.radius.full, backgroundColor: colors.card }}>
        <Avatar src={channel.avatarUrl} name={channel.name} size={avatarSize} />
      </View>
    </GradientSurface>
  );

  const nameRow = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
      <Text
        numberOfLines={1}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
      >
        {channel.name}
      </Text>
      {channel.live ? <LiveBadge variant={featured ? 'solid' : 'dot'} /> : null}
    </View>
  );

  const meta = subtitle ? (
    <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
      {subtitle}
    </Text>
  ) : null;

  const inner = grid ? (
    <View style={{ alignItems: 'center', gap: tokens.spacing.sm }}>
      {glowAvatar}
      {nameRow}
      {meta}
      {followBtn}
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {glowAvatar}
      <View style={{ flex: 1, gap: 2 }}>
        {nameRow}
        {meta}
      </View>
      {followBtn}
    </View>
  );

  const card = <Card style={[{ gap: tokens.spacing.sm, borderRadius: tokens.radius.lg }, style]}>{inner}</Card>;

  if (!onPress) return card;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={channel.name}
      onPress={() => onPress(channel)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {card}
    </Pressable>
  );
}
