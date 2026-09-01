import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarGroupV4 } from '../primitives/AvatarGroupV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, placeholderGround, seatParts, spokenLine, toneInk } from './internal/event-v4';
import type { SessionCardProps } from './SessionCard';

export interface SessionCardV4Props extends SessionCardProps {
  /** Name of the bookmark control while the session is not bookmarked. Default `'Bookmark session'`. */
  bookmarkLabel?: string;
  /** Name of the bookmark control once it is. Default `'Remove bookmark'`. */
  unbookmarkLabel?: string;
  /** The seat meter's caption. Default `'12 / 100 seats taken'`. */
  formatSeats?: (taken: number, capacity: number) => string;
}

/** The highlight rail down a keynote. 4px — a bar, not a hairline. */
const RAIL = 4;

/**
 * **V4 session card** — same props as {@link SessionCard} plus
 * `bookmarkLabel`, `unbookmarkLabel` and `formatSeats`.
 *
 * ## Six changes
 *
 * 1. **The bookmark is reachable.** The outer `Pressable` is `accessible` by
 *    default and carried the title as its name, so VoiceOver flattened the
 *    entire card — bookmark star included — into one leaf. There was no
 *    gesture that bookmarked a session. The card's activation now wraps only
 *    the media and text, and the star is its **sibling** inside the card, on
 *    both twins. (The web twin fails the same way through a different door:
 *    its card-level `onKeyDown` cancels Enter's default action on the nested
 *    button and navigates instead.)
 * 2. **A negative seat count stops being printed.** The base clamped the
 *    *bar* and then printed the raw number, so `seatsTaken: -5` drew an empty
 *    meter beside the words "−5 / 100 seats taken". `seatParts()` clamps both.
 * 3. **The meter is a real `progressbar` with a value**, and it sits outside
 *    the card's activation so a reader can reach it at all.
 * 4. **The card announces its content** — track, title, time, room, speakers
 *    and seats — where `accessibilityLabel={title}` replaced all of it.
 * 5. **A track is identity, so its badge holds one tone.** The base switched
 *    the badge to `primary` on a highlighted card, which made the same track
 *    two colours depending on the card it appeared in.
 * 6. **The bookmarked star is `primary` on both twins, drawn as ink** — it was
 *    `accent` here and `primary` on web, and web's `IconColor` has no `accent`
 *    member to match with. The meter's track, the last neutral-ramp index in
 *    the file, is the shared opaque placeholder.
 *
 * **Renders nothing without a `title`.**
 */
export function SessionCardV4({
  title,
  time,
  room,
  track,
  abstract,
  speakers = [],
  capacity,
  seatsTaken,
  bookmarked = false,
  bookmarkLabel = 'Bookmark session',
  unbookmarkLabel = 'Remove bookmark',
  formatSeats,
  onBookmark,
  onPress,
  variant = 'default',
  style,
}: SessionCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const isHighlight = variant === 'highlight';
  const tap = minTap(tokens.spacing);
  const seats = seatParts(seatsTaken, capacity);
  const speakerNames = speakers.map((s) => s.name).join(', ');
  const meta = [time, room].filter(Boolean).join(' · ');
  const seatCaption = seats
    ? seats.full
      ? 'Session full'
      : (formatSeats ?? ((t: number, c: number) => `${t} / ${c} seats taken`))(
          seats.taken,
          seats.capacity
        )
    : null;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      flexDirection: 'row',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: isHighlight ? colors.primary : colors.border,
      backgroundColor: colors.card,
    },
    style,
  ];

  const heading = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <View style={{ gap: tokens.spacing.xs }}>
        {track ? (
          <BadgeV4 {...BADGE_V4} tone="neutral">
            {track}
          </BadgeV4>
        ) : null}
        <TextV4 size="lg" weight="bold" tone="onCard">
          {title}
        </TextV4>
        {meta ? (
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {meta}
          </TextV4>
        ) : null}
      </View>

      {abstract ? (
        <TextV4 size="sm" tone="onCard" numberOfLines={3}>
          {abstract}
        </TextV4>
      ) : null}

      {speakers.length > 0 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <AvatarGroupV4
            avatars={speakers.map((s) => ({ src: s.avatarUrl, name: s.name }))}
            size="sm"
            max={3}
          />
          <TextV4 size="sm" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
            {speakerNames}
          </TextV4>
        </View>
      ) : null}
    </View>
  );

  const name = spokenLine([track, title, time, room, speakerNames, seatCaption]);

  return (
    <View style={containerStyle}>
      {isHighlight ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ width: RAIL, backgroundColor: colors.primary }}
        />
      ) : null}
      <View style={{ flex: 1, gap: tokens.spacing.sm, padding: tokens.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          {onPress ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={name}
              onPress={onPress}
              style={{ flex: 1, minWidth: 0 }}
            >
              {({ pressed }) => heading(pressed)}
            </Pressable>
          ) : (
            <View accessible accessibilityLabel={name} style={{ flex: 1, minWidth: 0 }}>
              {heading(false)}
            </View>
          )}

          {/* Change 1: a sibling of the card's activation, never a descendant
              of it — that nesting is what made this control unreachable. */}
          {onBookmark ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: bookmarked }}
              accessibilityLabel={bookmarked ? unbookmarkLabel : bookmarkLabel}
              onPress={() => onBookmark(!bookmarked)}
              style={({ pressed }) => ({
                width: tap,
                height: tap,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                backgroundColor: pressed
                  ? pressOver(theme, colors.card, colors.onCard)
                  : 'transparent',
              })}
            >
              {/* Drawn as text in the contrast-corrected ink: `Icon`'s colour
                  slot takes a fill token, and web's `IconColor` has no
                  `accent` to pair with this side's. */}
              <TextV4
                size="lg"
                style={{ color: bookmarked ? toneInk(theme, 'primary') : colors.mutedText }}
              >
                {bookmarked ? '★' : '☆'}
              </TextV4>
            </Pressable>
          ) : null}
        </View>

        {seats && seatCaption ? (
          <View style={{ gap: tokens.spacing.xs }}>
            <View
              accessibilityRole="progressbar"
              accessibilityLabel={seatCaption}
              accessibilityValue={{ min: 0, max: seats.capacity, now: seats.taken }}
              style={{
                height: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: placeholderGround(theme),
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${Math.round(seats.ratio * 100)}%`,
                  height: '100%',
                  backgroundColor: seats.full ? colors.danger : colors.primary,
                }}
              />
            </View>
            <TextV4
              size="xs"
              weight="semibold"
              numeric="tabular"
              style={{ color: seats.full ? toneInk(theme, 'danger') : colors.mutedText }}
            >
              {seatCaption}
            </TextV4>
          </View>
        ) : null}
      </View>
    </View>
  );
}
