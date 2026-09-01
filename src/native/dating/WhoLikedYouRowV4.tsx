import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import {
  PHOTO_INK,
  PHOTO_SCRIM,
  skeletonFill,
  spokenLine,
} from './internal/profile-v4';
import type { Liker, WhoLikedYouRowProps } from './WhoLikedYouRow';

export interface WhoLikedYouRowV4Props extends WhoLikedYouRowProps {
  /** Say the total. Default `'12 likes'` / `'1 like'`. */
  formatCount?: (count: number) => string;
  /** Announced for an obscured tile. Default `'Locked'`. */
  lockedLabel?: string;
}

/** Avatar tile geometry — one size on both twins. */
const TILE = 72;
const AVATAR = 64;
/** The tint behind the unlock CTA. */
const CTA_TINT = 0.12;

/**
 * **V4 who-liked-you row** — same props as {@link WhoLikedYouRow} plus
 * `formatCount` and `lockedLabel`.
 *
 * ## Five changes
 *
 * 1. **The like count is not an error.** "14 people liked you" is the most
 *    positive number in the product and the base painted it in `danger`, the
 *    slot reserved for something having gone wrong — a red pill beside
 *    "Liked you" reads as a warning at a glance, which is the opposite of what
 *    it says. It is a `primary` badge.
 * 2. **The lock scrim is dark in a dark theme.** It was
 *    `withAlpha(colors.onSurface, 0.45)` over a face — the ink slot, which is
 *    *light* on a dark scheme, so the veil hiding an identity became a pale
 *    wash that revealed it, with a near-white padlock on top of it. Fixed
 *    photo scrim and photo ink: an obscured face is obscured in both schemes.
 * 3. **A locked tile with nowhere to go is disabled.** With `locked` and no
 *    `onUnlock`, every tile was a button whose press did nothing. It is
 *    genuinely disabled now — announced as such, at M3's 0.38 — rather than
 *    silently inert.
 * 4. **The heading is a heading**, so a reader can jump to the section
 *    instead of walking the rail to find out what it is; the total travels
 *    with it through `formatCount` rather than being a loose numeral.
 * 5. **Press is a state layer, loading is a real skeleton**, and the tiles
 *    are the same size as the web twin's.
 */
export function WhoLikedYouRowV4({
  likers,
  total,
  locked = true,
  title = 'Liked you',
  onPressLiker,
  onUnlock,
  loading = false,
  emptyLabel = 'No likes yet — keep swiping!',
  formatCount,
  lockedLabel = 'Locked',
  style,
}: WhoLikedYouRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const list = likers ?? [];
  const count = total ?? list.length;
  const countText = (formatCount ?? ((n: number) => `${n} ${n === 1 ? 'like' : 'likes'}`))(count);

  const header = (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel={spokenLine([title, count > 0 ? countText : null])}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        marginBottom: tokens.spacing.sm,
      }}
    >
      <TextV4 size="base" weight="bold" tone="onSurface">
        {title}
      </TextV4>
      {count > 0 ? (
        <BadgeV4 tone="primary" variant="soft" size="sm" count={count} />
      ) : null}
    </View>
  );

  if (loading) {
    return (
      <View accessibilityRole="progressbar" accessibilityLabel={`${title}: loading`} style={style}>
        {header}
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                width: AVATAR,
                height: AVATAR,
                borderRadius: AVATAR / 2,
                backgroundColor: skeletonFill(theme),
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  if (count === 0) {
    return (
      <View style={style}>
        {header}
        <View
          accessible
          accessibilityRole="summary"
          accessibilityLabel={emptyLabel}
          style={{
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: tokens.spacing.lg,
            alignItems: 'center',
          }}
        >
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      </View>
    );
  }

  const tile = (liker: Liker): React.ReactElement => {
    // Locked with no upsell to reach is not a control, it is a picture.
    const dead = locked && !onUnlock;
    const label = locked
      ? lockedLabel
      : spokenLine([liker.name ?? 'Someone', liker.superLiked ? 'super liked you' : null]);
    return (
      <Pressable
        key={liker.id}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: dead }}
        disabled={dead}
        onPress={() => (locked ? onUnlock?.() : onPressLiker?.(liker.id))}
        style={({ pressed }) => ({
          alignItems: 'center',
          width: TILE,
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.radius.md,
          backgroundColor: pressed
            ? pressOver(theme, colors.surface, colors.onSurface)
            : 'transparent',
          opacity: disabledOpacity(theme.state, dead),
        })}
      >
        <View>
          <AvatarV4
            src={locked ? undefined : liker.photoUri}
            name={locked ? '?' : liker.name}
            size="xl"
            ring={liker.superLiked}
          />
          {locked ? (
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: AVATAR / 2,
                alignItems: 'center',
                justifyContent: 'center',
                // Fixed: this veil covers a photograph of a face, and a themed
                // scrim inverts to a pale wash that shows it.
                backgroundColor: PHOTO_SCRIM,
              }}
            >
              <TextV4 size="lg" allowFontScaling={false} style={{ color: PHOTO_INK }}>
                🔒
              </TextV4>
            </View>
          ) : null}
        </View>
        {!locked ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1} style={{ maxWidth: TILE - 4 }}>
            {liker.name ?? 'Someone'}
          </TextV4>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={style}>
      {header}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm, paddingRight: tokens.spacing.md }}
      >
        {list.map(tile)}
      </ScrollView>
      {locked ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spokenLine(['Unlock to see who liked you', countText])}
          accessibilityState={{ disabled: !onUnlock }}
          disabled={!onUnlock}
          onPress={onUnlock}
          style={({ pressed }) => ({
            marginTop: tokens.spacing.sm,
            minHeight: minTap(tokens.spacing),
            borderRadius: tokens.radius.full,
            backgroundColor: pressed
              ? pressOver(theme, mixToken(colors.surface, colors.primary, CTA_TINT), colors.primaryText)
              : mixToken(colors.surface, colors.primary, CTA_TINT),
            paddingVertical: tokens.spacing.sm,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabledOpacity(theme.state, !onUnlock),
          })}
        >
          <TextV4 size="sm" weight="bold" tone="primaryText">
            See all {countText}
          </TextV4>
        </Pressable>
      ) : null}
    </View>
  );
}
