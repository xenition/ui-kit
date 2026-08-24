import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Badge, Button, Card, Icon, useXenitionTheme } from '../primitives';
import { clamp, type GameRecord } from './types';

export type GameCardVariant = 'grid' | 'list' | 'featured';

export interface GameCardProps {
  /** The game to render. */
  game: GameRecord;
  /**
   * - `grid`     — cover above stacked meta (default).
   * - `list`     — cover left, meta right, single row.
   * - `featured` — large cover + rating + prominent action.
   */
  variant?: GameCardVariant;
  /** Show a spinner + block the action (e.g. install in flight). */
  loading?: boolean;
  /** Called when the card body is tapped — open the store page. */
  onPress?: (game: GameRecord) => void;
  /**
   * Called by the primary action. Shows a Play / Install button when set; the
   * label + a11y reflect `game.installed`.
   */
  onPlay?: (game: GameRecord) => void;
  style?: StyleProp<ViewStyle>;
}

/** Render up to 5 star glyphs for a `[0,5]` rating; empty when unrated. */
function Stars({ rating }: { rating?: number }): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (rating == null || !Number.isFinite(rating)) return null;
  const filled = Math.round(clamp(rating, 0, 5));
  return (
    <View
      style={{ flexDirection: 'row', gap: 1 }}
      accessible
      accessibilityLabel={`Rated ${filled} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Text
          key={i}
          allowFontScaling={false}
          style={{ color: i < filled ? colors.warn : colors.border, fontSize: tokens.typography.scale.sm }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

/**
 * A game / store title card — key art, title, genre, star rating, and a
 * Play/Install action. `onPress(game)` opens the title; `onPlay(game)` runs the
 * primary action with its label bound to `game.installed`. Composes `Card`,
 * `Button`, `Badge`. Token-only — no literal hex.
 */
export function GameCard({
  game,
  variant = 'grid',
  loading = false,
  onPress,
  onPlay,
  style,
}: GameCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = variant === 'list';
  const featured = variant === 'featured';
  const art = list ? 72 : featured ? 132 : 148;

  const cover = game.coverUrl ? (
    <Image
      source={{ uri: game.coverUrl }}
      accessibilityIgnoresInvertColors
      resizeMode="cover"
      style={{
        width: list ? art : '100%',
        height: list ? art : undefined,
        aspectRatio: list ? undefined : featured ? 16 / 9 : 3 / 4,
        borderRadius: tokens.radius.md,
        backgroundColor: colors.border,
      }}
    />
  ) : (
    <View
      style={{
        width: list ? art : '100%',
        height: list ? art : undefined,
        aspectRatio: list ? undefined : featured ? 16 / 9 : 3 / 4,
        borderRadius: tokens.radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon glyph="🎮" size="2xl" color="onPrimary" />
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

  const meta = (
    <View style={{ flex: list ? 1 : undefined, gap: 3 }}>
      <Text
        numberOfLines={2}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
      >
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
      <Stars rating={game.rating} />
    </View>
  );

  const inner = list ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {cover}
      {meta}
      {action ? <View>{action}</View> : null}
    </View>
  ) : (
    <View style={{ gap: tokens.spacing.sm }}>
      {cover}
      {meta}
      {action ? <View style={{ alignSelf: featured ? 'stretch' : 'flex-start' }}>{action}</View> : null}
    </View>
  );

  const card = (
    <Card variant={featured ? 'elevated' : 'outlined'} style={[{ gap: tokens.spacing.sm }, style]}>
      {inner}
    </Card>
  );

  if (!onPress) return card;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={game.title}
      onPress={() => onPress(game)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {card}
    </Pressable>
  );
}
