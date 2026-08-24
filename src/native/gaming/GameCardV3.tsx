import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { Badge, Button, Icon, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { clamp } from './types';
import type { GameCardProps } from './GameCard';

/** Drop-in alternate of {@link GameCardProps} — identical prop contract. */
export type GameCardV3Props = GameCardProps;

/** Inline star row; empty when unrated. */
function StarRow({ rating }: { rating?: number }): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (rating == null || !Number.isFinite(rating)) return null;
  const filled = Math.round(clamp(rating, 0, 5));
  return (
    <View style={{ flexDirection: 'row', gap: 1 }} accessible accessibilityLabel={`Rated ${filled} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Text
          key={i}
          allowFontScaling={false}
          style={{ color: i < filled ? colors.warn : colors.border, fontSize: tokens.typography.scale.xs }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

/**
 * GameCard — design variant **V3**: a **horizontal cover-left row**. A compact
 * square of key art on the left, the title / genre / rating stacked in the
 * middle, and the Play / Install control pinned to the right — a dense library
 * list line rather than V1's boxed tile or V2's hero. Same props as
 * {@link GameCardProps}; the action label + a11y still bind to `game.installed`.
 * Token-only, elevated surface (no border).
 */
export function GameCardV3({
  game,
  loading = false,
  onPress,
  onPlay,
  style,
}: GameCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 6 });
  const art = 64;

  const cover = game.coverUrl ? (
    <Image
      source={{ uri: game.coverUrl }}
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
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon glyph="🎮" size="xl" color="onPrimary" />
    </View>
  );

  const action = onPlay ? (
    <Button
      variant={game.installed ? 'secondary' : 'primary'}
      size="sm"
      loading={loading}
      onPress={() => onPlay(game)}
      accessibilityLabel={`${game.installed ? 'Play' : 'Install'} ${game.title}`}
    >
      {game.installed ? 'Play' : game.price ?? 'Install'}
    </Button>
  ) : null;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
          ...shadow('sm', tokens),
        },
        style,
      ]}
    >
      {cover}
      <View style={{ flex: 1, gap: 3 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {game.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
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
        <StarRow rating={game.rating} />
      </View>
      {action ? <View>{action}</View> : null}
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
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
