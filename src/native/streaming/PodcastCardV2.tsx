import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { Button, Icon, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { PodcastCardProps } from './PodcastCard';

/** Drop-in for {@link PodcastCardProps} — a genuinely different design, same props. */
export type PodcastCardV2Props = PodcastCardProps;

/**
 * **PodcastCard — design V2 (hero).** A big square-artwork hero: full-bleed
 * cover artwork with a floating play affordance in the corner and a legibility
 * scrim, the show meta stacked below on an elevated (shadowed, borderless)
 * surface. Distinct at a glance from the classic bordered card. Same
 * `PodcastCardProps`; token-pure; a11y-complete.
 */
export function PodcastCardV2({
  podcast,
  subscribed = false,
  variant = 'grid',
  onPress,
  onSubscribeToggle,
  style,
}: PodcastCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const press = usePressScale(0.98);
  const featured = variant === 'featured';

  const meta = [
    podcast.publisher,
    podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
  ]
    .filter(Boolean)
    .join('  ·  ');

  const artwork = (
    <View style={{ width: '100%', aspectRatio: 1, borderRadius: tokens.radius.lg, overflow: 'hidden' }}>
      {podcast.artworkUrl ? (
        <Image
          source={{ uri: podcast.artworkUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ width: '100%', height: '100%', backgroundColor: colors.border }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="🎙" size="3xl" color="onAccent" />
        </View>
      )}
      {/* Bottom scrim for legibility of the corner FAB (token-derived rgba). */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '38%',
          backgroundColor: withAlpha(tokens.ramps.neutral[900] ?? colors.onSurface, 0.28),
        }}
      />
      {/* Floating play affordance (decorative — the card body is the button). */}
      <View
        style={{
          position: 'absolute',
          right: tokens.spacing.sm,
          bottom: tokens.spacing.sm,
          width: 48,
          height: 48,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadow('md', tokens),
        }}
      >
        <Icon glyph="▶" size="lg" color="onPrimary" />
      </View>
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

  const card = (
    <Animated.View
      style={[
        {
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
          opacity: enter.opacity,
          transform: [...enter.transform, { scale: press.scale }],
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      {artwork}
      <View style={{ gap: 2, paddingHorizontal: tokens.spacing.xs }}>
        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
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
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.sm,
              marginTop: tokens.spacing.xs,
            }}
          >
            {podcast.description}
          </Text>
        ) : null}
      </View>
      {subscribeBtn ? (
        <View style={{ alignSelf: 'flex-start', paddingHorizontal: tokens.spacing.xs }}>{subscribeBtn}</View>
      ) : null}
    </Animated.View>
  );

  if (!onPress) return card;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={podcast.title}
      onPress={() => onPress(podcast)}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {card}
    </Pressable>
  );
}
