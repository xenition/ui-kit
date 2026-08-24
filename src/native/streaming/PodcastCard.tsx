import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Button, Card, Icon, useXenitionTheme } from '../primitives';
import type { StreamPodcast } from './types';

export type PodcastCardVariant = 'grid' | 'list' | 'featured';

export interface PodcastCardProps {
  /** The show to render. */
  podcast: StreamPodcast;
  /** Whether the user is subscribed (controlled) — toggles the action label. */
  subscribed?: boolean;
  /**
   * - `grid`     — square artwork above stacked meta (default).
   * - `list`     — artwork left, meta right, single row.
   * - `featured` — large artwork + description + prominent subscribe button.
   */
  variant?: PodcastCardVariant;
  /** Called when the card body is tapped — open the show. */
  onPress?: (podcast: StreamPodcast) => void;
  /** Called with the next subscribed state; shows a subscribe control when set. */
  onSubscribeToggle?: (next: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A podcast show card — artwork, title, publisher, episode count, and (in
 * `featured`) a description plus a subscribe button. `onPress(podcast)` opens
 * the show; `onSubscribeToggle(next)` flips the subscription, with the button
 * label + a11y reflecting `subscribed`. Composes `Card` / `Button`. Token-only
 * — no literal hex.
 */
export function PodcastCard({
  podcast,
  subscribed = false,
  variant = 'grid',
  onPress,
  onSubscribeToggle,
  style,
}: PodcastCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = variant === 'list';
  const featured = variant === 'featured';
  const art = featured ? 120 : list ? 64 : 140;

  const meta = [
    podcast.publisher,
    podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  const artwork =
    podcast.artworkUrl ? (
      <Image
        source={{ uri: podcast.artworkUrl }}
        accessibilityIgnoresInvertColors
        resizeMode="cover"
        style={{
          width: list ? art : '100%',
          height: list ? art : undefined,
          aspectRatio: list ? undefined : 1,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.border,
        }}
      />
    ) : (
      <View
        style={{
          width: list ? art : '100%',
          height: list ? art : undefined,
          aspectRatio: list ? undefined : 1,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.accent,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon glyph="🎙" size="2xl" color="onAccent" />
      </View>
    );

  const subscribeBtn = onSubscribeToggle ? (
    <Button
      variant={subscribed ? 'secondary' : 'primary'}
      size="sm"
      onPress={() => onSubscribeToggle(!subscribed)}
      accessibilityLabel={subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`}
    >
      {subscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  ) : null;

  const textBlock = (
    <View style={{ flex: list ? 1 : undefined, gap: 2 }}>
      <Text
        numberOfLines={2}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
      >
        {podcast.title}
      </Text>
      {meta ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {meta}
        </Text>
      ) : null}
      {featured && podcast.description ? (
        <Text
          numberOfLines={3}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}
        >
          {podcast.description}
        </Text>
      ) : null}
      {featured && subscribeBtn ? (
        <View style={{ marginTop: tokens.spacing.sm, alignSelf: 'flex-start' }}>{subscribeBtn}</View>
      ) : null}
    </View>
  );

  const inner = list ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {artwork}
      {textBlock}
      {!featured && subscribeBtn ? <View>{subscribeBtn}</View> : null}
    </View>
  ) : featured ? (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
      <View style={{ width: art }}>{artwork}</View>
      {textBlock}
    </View>
  ) : (
    <View style={{ gap: tokens.spacing.sm }}>
      {artwork}
      {textBlock}
      {subscribeBtn ? <View style={{ alignSelf: 'flex-start' }}>{subscribeBtn}</View> : null}
    </View>
  );

  const card = <Card style={[{ gap: tokens.spacing.sm }, style]}>{inner}</Card>;

  if (!onPress) return card;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={podcast.title}
      onPress={() => onPress(podcast)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {card}
    </Pressable>
  );
}
