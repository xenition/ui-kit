import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, spokenLine } from './internal/event-v4';
import type { SpeakerCardProps } from './SpeakerCard';

export interface SpeakerCardV4Props extends SpeakerCardProps {}

/** `Rating`'s own scale. A value outside it draws six filled stars out of five. */
const RATING_MAX = 5;

/**
 * **V4 speaker card** — same props as {@link SpeakerCard}.
 *
 * ## Four changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel={name}` on the
 *    pressable root replaces the subtree, so the role, the company, the
 *    rating, the bio and every tag were unreachable — a conference app's
 *    speaker directory read as a list of bare names.
 * 2. **`rating` is clamped before it reaches `Rating`.** The primitive fills
 *    `Math.round(value)` glyphs out of `max`, so a `7` from an unvalidated
 *    feed drew seven stars in a five-star row and a negative one drew none
 *    while still announcing itself.
 * 3. **A press is a state layer.** `opacity: 0.9` fades the card's own
 *    content, which is the signal M3 spends on *disabled*.
 * 4. **The card is a raised surface**, so its text takes the `onCard` pair
 *    rather than being inked for the page underneath it.
 *
 * **Renders nothing without a `name`.**
 */
export function SpeakerCardV4({
  name,
  role,
  company,
  avatarUrl,
  bio,
  rating,
  tags = [],
  variant = 'row',
  onPress,
  style,
}: SpeakerCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const stacked = variant === 'stacked';
  const roleLine = [role, company].filter(Boolean).join(' · ');
  const stars =
    typeof rating === 'number' && Number.isFinite(rating)
      ? Math.max(0, Math.min(RATING_MAX, rating))
      : null;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    style,
  ];

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: stacked ? 'column' : 'row',
        alignItems: stacked ? 'center' : 'flex-start',
        gap: tokens.spacing.md,
        padding: tokens.spacing.lg,
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <AvatarV4 src={avatarUrl} name={name} size={stacked ? 'lg' : 'md'} />
      <View
        style={{
          flex: stacked ? undefined : 1,
          minWidth: 0,
          alignItems: stacked ? 'center' : 'flex-start',
          gap: tokens.spacing.xs,
        }}
      >
        <TextV4 size="lg" weight="bold" tone="onCard" align={stacked ? 'center' : 'left'}>
          {name}
        </TextV4>
        {roleLine ? (
          <TextV4 size="sm" tone="mutedText" align={stacked ? 'center' : 'left'}>
            {roleLine}
          </TextV4>
        ) : null}
        {stars != null ? <RatingV4 value={stars} size="sm" showValue /> : null}
        {bio ? (
          <TextV4
            size="sm"
            tone="onCard"
            align={stacked ? 'center' : 'left'}
            numberOfLines={stacked ? 3 : 2}
          >
            {bio}
          </TextV4>
        ) : null}
        {tags.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing.xs,
              justifyContent: stacked ? 'center' : 'flex-start',
            }}
          >
            {tags.map((t, i) => (
              <BadgeV4 key={`${t}-${i}`} {...BADGE_V4} tone="neutral">
                {t}
              </BadgeV4>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );

  const spoken = spokenLine([
    name,
    roleLine,
    stars != null ? `${stars} out of ${RATING_MAX}` : null,
    bio,
    ...tags,
  ]);

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={spoken}
        onPress={onPress}
        style={containerStyle}
      >
        {({ pressed }) => content(pressed)}
      </Pressable>
    );
  }
  return (
    <View accessible accessibilityLabel={spoken} style={containerStyle}>
      {content(false)}
    </View>
  );
}
