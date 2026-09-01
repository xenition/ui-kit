import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { ratingParts } from '../primitives/internal/tone-v4';
import { BADGE_V4, IDENTITY_TONE, placeholderGround, spokenLine } from './internal/arcade-v4';
import type { GameCardProps } from './GameCard';

export interface GameCardV4Props extends GameCardProps {
  /** The primary action's label once the title is installed. Default `'Play'`. */
  playLabel?: string;
  /** Its label while the title is not installed. Default `'Install'`; `game.price` still wins. */
  installLabel?: string;
}

/**
 * **V4 game card** — same props as {@link GameCard} plus `playLabel` and
 * `installLabel`.
 *
 * ## Five changes
 *
 * 1. **Play is reachable, and it is a sibling of the card's activation.** The
 *    base wrapped the whole card — Play included — in a `Pressable` that is
 *    `accessible` by default and carried `accessibilityLabel={game.title}`, so
 *    VoiceOver flattened the card to one leaf and there was no gesture that
 *    installed or launched a game. (The web twin fails the same moment through
 *    the other door: Enter on Play fires both handlers and Space fires only the
 *    card's, because the card's bubbled keydown `preventDefault()`s the
 *    button's own activation.) The activation now wraps the cover and the meta
 *    only; the button sits beside it.
 * 2. **The card announces what it shows** — title, genre, price or installed
 *    state, and the rating — where the base's name was the title and nothing
 *    else, and the star row was a second, wordless stop.
 * 3. **A genre is identity, not a status.** It was `accent` here and `primary`
 *    on web, so the same genre was two colours across the product and a
 *    category was wearing a slot that should mean something happened. It is a
 *    neutral chip on both twins now.
 * 4. **A missing cover is a placeholder, not a brand-filled tile.** The base
 *    painted it `colors.primary` and the loaded `Image`'s ground `colors.border`
 *    — the hairline token used as a fill. Both are now the module's opaque
 *    placeholder ground, which is mixed from the card and so survives dark
 *    mode.
 * 5. **A press is a state layer** on the activation region, not
 *    `opacity: 0.9` on the whole card — 0.38 is M3's *disabled* band, so
 *    dimming a pressed card makes it read as unavailable.
 */
export function GameCardV4({
  game,
  variant = 'grid',
  loading = false,
  playLabel = 'Play',
  installLabel = 'Install',
  onPress,
  onPlay,
  style,
}: GameCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const list = variant === 'list';
  const featured = variant === 'featured';
  const tap = minTap(tokens.spacing);
  const art = tokens.spacing['2xl'] + tokens.spacing.lg;

  /** The card's pressed state layer, or nothing — never a dimmed content. */
  const pressGround = (pressed: boolean): string =>
    pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent';

  const rating = ratingParts({ value: game.rating, max: 5 });
  const rated = game.rating != null && Number.isFinite(game.rating);
  const actionText = game.installed ? playLabel : (game.price ?? installLabel);

  const coverStyle: ViewStyle = {
    width: list ? art : '100%',
    height: list ? art : undefined,
    aspectRatio: list ? undefined : featured ? 16 / 9 : 3 / 4,
    borderRadius: tokens.radius.md,
    backgroundColor: placeholderGround(theme),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cover = (
    <View style={coverStyle}>
      {game.coverUrl ? (
        <Image
          source={{ uri: game.coverUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <IconV4 glyph="🎮" size="2xl" color="onCard" />
      )}
    </View>
  );

  const meta = (
    <View style={{ flex: list ? 1 : undefined, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
      <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={2}>
        {game.title}
      </TextV4>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          flexWrap: 'wrap',
        }}
      >
        {game.genre ? (
          <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE}>
            {game.genre}
          </BadgeV4>
        ) : null}
        {game.installed ? (
          <BadgeV4 {...BADGE_V4} tone="success">
            Installed
          </BadgeV4>
        ) : null}
      </View>
      {rated ? (
        // The glyphs repeat the name's "4 out of 5"; five loose stars is not a
        // number, and reading them one by one is noise.
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ flexDirection: 'row', gap: tokens.spacing.xs / 2 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <TextV4
              key={i}
              size="sm"
              style={{ color: i < rating.filled ? colors.warnText : colors.mutedText }}
            >
              ★
            </TextV4>
          ))}
        </View>
      ) : null}
    </View>
  );

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={
        list
          ? {
              flex: 1,
              minWidth: 0,
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              backgroundColor: pressGround(pressed),
            }
          : {
              gap: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              backgroundColor: pressGround(pressed),
            }
      }
    >
      {cover}
      {meta}
    </View>
  );

  const name = spokenLine([
    game.title,
    game.genre,
    game.installed ? 'Installed' : game.price,
    rated ? rating.label : null,
  ]);

  const activation = onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={() => onPress(game)}
      style={list ? { flex: 1, minWidth: 0 } : undefined}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  ) : (
    <View accessible accessibilityLabel={name} style={list ? { flex: 1, minWidth: 0 } : undefined}>
      {body(false)}
    </View>
  );

  // Change 1: a sibling of the activation, never a descendant of it.
  const action = onPlay ? (
    <ButtonV4
      variant={game.installed ? 'secondary' : 'primary'}
      size="sm"
      loading={loading}
      onPress={() => onPlay(game)}
      accessibilityLabel={spokenLine([game.installed ? playLabel : installLabel, game.title])}
      style={{ minHeight: tap }}
    >
      {actionText}
    </ButtonV4>
  ) : null;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      gap: tokens.spacing.sm,
      padding: tokens.spacing.lg,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    style,
  ];

  if (list) {
    return (
      <View style={containerStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          {activation}
          {action}
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      {activation}
      {action ? (
        <View style={{ alignSelf: featured ? 'stretch' : 'flex-start' }}>{action}</View>
      ) : null}
    </View>
  );
}
