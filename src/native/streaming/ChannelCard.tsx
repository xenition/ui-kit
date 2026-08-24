import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, Button, Card, useXenitionTheme } from '../primitives';
import { LiveBadge } from './LiveBadge';
import { formatCount, type StreamChannel } from './types';

export type ChannelCardVariant = 'row' | 'grid' | 'featured';

export interface ChannelCardProps {
  /** The channel / creator to render. */
  channel: StreamChannel;
  /** Whether the user follows this channel (controlled) — toggles the action. */
  following?: boolean;
  /**
   * - `row`      — avatar left, meta right, single row (default).
   * - `grid`     — centered avatar + name + follow, tile-friendly.
   * - `featured` — larger avatar + category + live badge + follow.
   */
  variant?: ChannelCardVariant;
  /** Called when the card body is tapped — open the channel. */
  onPress?: (channel: StreamChannel) => void;
  /** Called with the next following state; shows a follow control when set. */
  onFollowToggle?: (next: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A channel / creator card — avatar, name, category, a `LiveBadge` (with
 * viewer count) when `channel.live`, and an optional follow button.
 * `onPress(channel)` opens it; `onFollowToggle(next)` flips the follow state
 * with the button label + a11y reflecting `following`. Composes `Card` /
 * `Avatar` / `Button`. Token-only — no literal hex.
 */
export function ChannelCard({
  channel,
  following = false,
  variant = 'row',
  onPress,
  onFollowToggle,
  style,
}: ChannelCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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

  const inner =
    grid ? (
      <View style={{ alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar src={channel.avatarUrl} name={channel.name} size={avatarSize} />
        {nameRow}
        {meta}
        {followBtn}
      </View>
    ) : (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={channel.avatarUrl} name={channel.name} size={avatarSize} />
        <View style={{ flex: 1, gap: 2 }}>
          {nameRow}
          {meta}
        </View>
        {followBtn}
      </View>
    );

  const card = <Card style={[{ gap: tokens.spacing.sm }, style]}>{inner}</Card>;

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
