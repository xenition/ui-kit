import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { Badge, Icon, Spinner, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { clamp, withAlpha } from './types';
import type { GameCardProps } from './GameCard';

/** Drop-in alternate of {@link GameCardProps} — identical prop contract. */
export type GameCardV2Props = GameCardProps;

/** Light star row drawn on a dark scrim; empty when unrated. */
function HeroStars({ rating, light }: { rating?: number; light: string }): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (rating == null || !Number.isFinite(rating)) return null;
  const filled = Math.round(clamp(rating, 0, 5));
  return (
    <View style={{ flexDirection: 'row', gap: 1 }} accessible accessibilityLabel={`Rated ${filled} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Text
          key={i}
          allowFontScaling={false}
          style={{ color: i < filled ? colors.warn : withAlpha(light, 0.4), fontSize: tokens.typography.scale.sm }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

/**
 * GameCard — design variant **V2**: a **full-bleed cover hero** with a centered
 * play overlay and the title / genre / rating laid over a bottom scrim. Where V1
 * is a media-top card with a separate body, V2 is one immersive key-art tile —
 * the cover fills the frame, a circular play control floats at the center, and
 * the facts sit on a dark gradient scrim. Same props as {@link GameCardProps};
 * only the layout differs. Token-only: the scrim is `withAlpha` of the neutral
 * ramp, overlay text is the lightest neutral step, the play control uses
 * `primary`.
 */
export function GameCardV2({
  game,
  loading = false,
  onPress,
  onPlay,
  style,
}: GameCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });

  const scrim = (a: number): string => withAlpha(tokens.ramps.neutral[900] ?? colors.onSurface, a);
  const light = tokens.ramps.neutral[50] ?? colors.onPrimary;
  const playLabel = `${game.installed ? 'Play' : 'Install'} ${game.title}`;

  const playOverlay = onPlay ? (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={playLabel}
        accessibilityState={{ disabled: loading }}
        disabled={loading}
        onPress={() => onPlay(game)}
        style={{
          width: 64,
          height: 64,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.primary, 0.92),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: withAlpha(light, 0.5),
        }}
      >
        {loading ? <Spinner size="sm" /> : <Icon glyph={game.installed ? '▶' : '⬇'} size="xl" color="onPrimary" />}
      </Pressable>
    </View>
  ) : null;

  const body = (
    <View
      style={[
        {
          aspectRatio: 3 / 4,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
          justifyContent: 'flex-end',
        },
        style,
      ]}
    >
      {game.coverUrl ? (
        <Image
          source={{ uri: game.coverUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        />
      ) : (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="🎮" size="3xl" color="onPrimary" />
        </View>
      )}

      {/* Stacked bands read as a bottom-up gradient scrim. */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '62%', backgroundColor: scrim(0.2) }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', backgroundColor: scrim(0.44) }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '20%', backgroundColor: scrim(0.68) }} />

      <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm, flexDirection: 'row', gap: tokens.spacing.xs }}>
        {game.genre ? (
          <Badge tone="accent" variant="soft" size="sm">
            {game.genre}
          </Badge>
        ) : null}
        {game.installed ? (
          <Badge tone="success" variant="soft" size="sm">
            Installed
          </Badge>
        ) : null}
      </View>

      {playOverlay}

      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.xs }}>
        <Text numberOfLines={2} style={{ color: light, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
          {game.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <HeroStars rating={game.rating} light={light} />
          {game.price ? (
            <Text style={{ color: light, fontSize: tokens.typography.scale.sm, fontWeight: '600', opacity: 0.9 }}>
              {game.installed ? 'Installed' : game.price}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (!onPress) {
    return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={game.title}
        onPress={() => onPress(game)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={shadow('lg', tokens)}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
