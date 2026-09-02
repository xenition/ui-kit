import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import {
  MOOD_GLYPH,
  MOOD_LABEL,
  cardStyle,
  metaLine,
  skeletonBlockStyle,
  spokenLine,
} from './internal/tone-v4';
import type { ChildMood, ChildProfileCardProps } from './ChildProfileCard';

export interface ChildProfileCardV4Props extends ChildProfileCardProps {
  /** The word each mood is printed and announced with. */
  moodLabels?: Partial<Record<ChildMood, string>>;
}

/**
 * **V4 child profile card** — same props as {@link ChildProfileCard} plus
 * `moodLabels`.
 *
 * ## Four changes
 *
 * 1. **The card's summary is not silently dropped.** The non-pressable branch
 *    wrapped the card in a bare `View` carrying `accessibilityLabel` and no
 *    `accessible`, which Android ignores outright — so a child's whole profile
 *    read as one name on iOS and as six loose fragments on Android. It is now
 *    explicitly `accessible`, and it carries the birthday and the interests it
 *    used to leave off.
 * 2. **A sad or unwell child is not a system fault, and is not coloured like
 *    one.** Mood is a glyph and a word, on no chip at all — this module does
 *    not grade a child by hue.
 * 3. **The card is a card and its skeleton is a skeleton.** It painted
 *    `colors.surface` — the *page* colour — so it never read as raised and dark
 *    mode went flat; the skeleton painted `colors.border`, the hairline colour
 *    used as a fill, which on a dark seed is very nearly invisible.
 * 4. **Press is a state layer** over a `card` ground rather than
 *    `opacity: pressed ? 0.85 : 1`, which sits inside M3's *disabled* band, and
 *    the pressable region clears the 44 floor.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function ChildProfileCardV4({
  name,
  photoUrl,
  age,
  grade,
  birthday,
  mood,
  interests,
  loading = false,
  moodLabels,
  onPress,
  style,
}: ChildProfileCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const container = [cardStyle(theme), style];

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading child profile" style={container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={skeletonBlockStyle(theme, {
              height: minTap(tokens.spacing),
              width: minTap(tokens.spacing),
              round: true,
            })}
          />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View
              style={skeletonBlockStyle(theme, {
                height: tokens.typography.scale.base,
                width: '55%',
              })}
            />
            <View
              style={skeletonBlockStyle(theme, { height: tokens.typography.scale.xs, width: '40%' })}
            />
          </View>
        </View>
      </View>
    );
  }

  if (!name) return null;

  const moodWord = mood ? (moodLabels?.[mood] ?? MOOD_LABEL[mood]) : null;
  const moodGlyph = mood ? MOOD_GLYPH[mood] : null;
  const caption = metaLine([age, grade]);
  const spoken = spokenLine([
    name,
    age,
    grade,
    birthday,
    moodWord,
    interests && interests.length > 0 ? interests.join(', ') : null,
  ]);

  const header = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        minHeight: minTap(tokens.spacing),
        padding: tokens.spacing.xs,
        marginHorizontal: -tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      <AvatarV4 src={photoUrl} name={name} size="lg" />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4 size="xl" weight="bold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        {caption ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
        {birthday ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {`🎂 ${birthday}`}
          </TextV4>
        ) : null}
      </View>
      {moodGlyph && moodWord ? (
        <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          <TextV4
            size="xl"
            allowFontScaling={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {moodGlyph}
          </TextV4>
          {/* The word, always — a mood carried by an emoji alone is carried by
              nothing at all for a reader. */}
          <TextV4 size="xs" tone="mutedText">
            {moodWord}
          </TextV4>
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={container}>
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={spoken} onPress={onPress}>
          {({ pressed }) => header(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={spoken}>
          {header(false)}
        </View>
      )}

      {interests && interests.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {interests.map((interest, i) => (
            /* `accent` is a brand colour, not a status one, so an interest may
               wear it — the rule bans success/warn/danger on identity. */
            <BadgeV4 key={`${interest}-${i}`} tone="accent" variant="soft" size="sm">
              {interest}
            </BadgeV4>
          ))}
        </View>
      ) : null}
    </View>
  );
}
