import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Button, Card, Icon, useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { spotlightGlow, spotlightInk } from './internal/spotlight';
import type { PodcastCardProps } from './PodcastCard';

/** Drop-in for {@link PodcastCardProps} — same props, the V4 "spotlight" design. */
export type PodcastCardV4Props = PodcastCardProps;

/**
 * PodcastCard — **V4** "spotlight" design. The artwork-forward show card: the
 * cover sits on a subtle brand-gradient **glow** backdrop (`spotlightGlow`) — the
 * signature immersive touch of this line — with title, publisher · episode-count,
 * and (in `featured`) a description plus a `primary` subscribe button.
 * `onPress(podcast)` opens the show. Same props/behavior as
 * {@link PodcastCardProps}; token-only colors via `useXenitionTheme()`. Composes
 * `Card` / `Button`.
 */
export function PodcastCardV4({
  podcast,
  subscribed = false,
  variant = 'grid',
  onPress,
  onSubscribeToggle,
  style,
}: PodcastCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const list = variant === 'list';
  const featured = variant === 'featured';
  const art = featured ? 120 : list ? 64 : 140;

  const meta = [
    podcast.publisher,
    podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  // Cover on a gradient glow backdrop — the V4 spotlight signature.
  const artwork = (
    <GradientSurface
      colors={spotlightGlow(r)}
      style={{
        width: list ? art : '100%',
        height: list ? art : undefined,
        aspectRatio: list ? undefined : 1,
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
        padding: tokens.spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {podcast.artworkUrl ? (
        <Image
          source={{ uri: podcast.artworkUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: tokens.radius.md,
            backgroundColor: colors.border,
          }}
        />
      ) : (
        <Text style={{ color: spotlightInk(r), fontSize: tokens.typography.scale['2xl'] }}>🎙</Text>
      )}
    </GradientSurface>
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
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}
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

  const card = (
    <Card
      style={[
        {
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {inner}
    </Card>
  );

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
