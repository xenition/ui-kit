import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Button, Icon, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PodcastCardProps } from './PodcastCard';

/** Drop-in for {@link PodcastCardProps} — a genuinely different design, same props. */
export type PodcastCardV3Props = PodcastCardProps;

/**
 * **PodcastCard — design V3 (horizontal shelf row).** Artwork on the left,
 * meta on the right, laid out as a single low-profile line with a soft
 * primary-tinted fill and a hairline — the "browse list" counterpart to the
 * V2 hero. Same `PodcastCardProps`; token-pure; a11y-complete.
 */
export function PodcastCardV3({
  podcast,
  subscribed = false,
  variant = 'grid',
  onPress,
  onSubscribeToggle,
  style,
}: PodcastCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const featured = variant === 'featured';
  const art = featured ? 88 : 64;

  const meta = [
    podcast.publisher,
    podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
  ]
    .filter(Boolean)
    .join('  ·  ');

  const artwork = podcast.artworkUrl ? (
    <Image
      source={{ uri: podcast.artworkUrl }}
      accessibilityIgnoresInvertColors
      resizeMode="cover"
      style={{ width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
    />
  ) : (
    <View
      style={{
        width: art,
        height: art,
        borderRadius: tokens.radius.md,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon glyph="🎙" size="xl" color="onAccent" />
    </View>
  );

  const subscribeBtn = onSubscribeToggle ? (
    <Button
      variant={subscribed ? 'secondary' : 'primary'}
      size="sm"
      onPress={() => onSubscribeToggle(!subscribed)}
      accessibilityLabel={
        subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`
      }
    >
      {subscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  ) : null;

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: withAlpha(colors.primary, 0.06),
          borderColor: withAlpha(colors.primary, 0.14),
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {artwork}
      <View style={{ flex: 1, gap: 2 }}>
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
            numberOfLines={2}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: 2 }}
          >
            {podcast.description}
          </Text>
        ) : null}
        {featured && subscribeBtn ? (
          <View style={{ marginTop: tokens.spacing.xs, alignSelf: 'flex-start' }}>{subscribeBtn}</View>
        ) : null}
      </View>
      {!featured && subscribeBtn ? <View>{subscribeBtn}</View> : null}
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={podcast.title}
      onPress={() => onPress(podcast)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
