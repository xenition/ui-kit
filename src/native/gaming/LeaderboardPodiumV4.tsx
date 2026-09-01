import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { placeholderGround, spokenLine } from './internal/arcade-v4';
import type { SpacingScale } from '../../theme/types';
import { formatCount } from './types';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';

export interface LeaderboardPodiumV4Props extends LeaderboardPodiumProps {
  /** How a podium score is written. Default {@link formatCount} — `4200` → `'4.2K'`. */
  formatScore?: (score: number) => string;
}

/**
 * Render order (2nd · 1st · 3rd), with each pillar's height composed from the
 * spacing scale rather than typed as 56 / 80 / 40, so a re-scaled seed
 * re-scales the podium instead of leaving it stranded at a size the rest of
 * the product left behind.
 *
 * There is no `color` here any more. A podium place is **identity**: gold was
 * `warn`, bronze was `accent`, and second place spent the `border` hairline as
 * a tier accent. The medal and the height say which place it is, in greyscale
 * and at any colour vision.
 */
const PLACES: ReadonlyArray<{
  index: number;
  /** Steps on the spacing scale, summed — never a typed 56 / 80 / 40. */
  steps: ReadonlyArray<keyof SpacingScale>;
  medal: string;
}> = [
  { index: 1, steps: ['2xl', 'sm'], medal: '🥈' },
  { index: 0, steps: ['2xl', 'xl'], medal: '🥇' },
  { index: 2, steps: ['2xl'], medal: '🥉' },
];

/**
 * **V4 leaderboard podium** — same props as {@link LeaderboardPodium} plus
 * `formatScore`.
 *
 * ## Four changes
 *
 * 1. **A podium place is identity, not status.** Gold was `warn` and bronze
 *    `accent` — two status slots spent on a ribbon — and each pillar was a
 *    translucent 18% wash of that colour, so the same place was a different
 *    shade on every surface it sat on. The medal glyph and the pillar height
 *    carry the place; the ground is the module's one opaque neutral.
 * 2. **Second place stops wearing the hairline as a tier accent.** `border`
 *    exists to draw a 1px rule; used as a fill it means whatever the ramp
 *    happens to be, and it made silver read as "unstyled" rather than as
 *    second.
 * 3. **The pillar heights come off the spacing scale**, so the podium keeps
 *    its proportions when a seed re-scales its rhythm.
 * 4. **A place is one spoken name including its score**, and `formatScore`
 *    makes the drawn number and the announced one the same string — the base
 *    drew `formatCount(score)` and announced the raw integer, so a reader and
 *    a viewer compared different numbers. A press is a state layer.
 */
export function LeaderboardPodiumV4({
  entries,
  emptyLabel = 'No rankings yet',
  formatScore = formatCount,
  onPress,
  style,
}: LeaderboardPodiumV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  /** The card's pressed state layer, or nothing — never a dimmed content. */
  const pressGround = (pressed: boolean): string =>
    pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent';

  if (entries.length === 0) {
    return (
      <EmptyStateV4
        icon={<IconV4 glyph="🏆" size="2xl" color="mutedText" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      {PLACES.map((place) => {
        const entry = entries[place.index];
        if (!entry) return <View key={place.index} style={{ flex: 1 }} />;
        const rank = place.index + 1;
        const height = place.steps.reduce((total, step) => total + tokens.spacing[step], 0);
        const name = spokenLine([`Rank ${rank}`, entry.name, `${formatScore(entry.score)} points`]);

        const column = (pressed: boolean): React.ReactElement => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              gap: tokens.spacing.xs,
              borderRadius: tokens.radius.md,
              backgroundColor: pressGround(pressed),
            }}
          >
            <TextV4 size="xl">{place.medal}</TextV4>
            <AvatarV4
              src={entry.avatarUrl}
              name={entry.name}
              size={place.index === 0 ? 'lg' : 'md'}
              ring
            />
            <TextV4
              size="sm"
              weight="bold"
              tone="onCard"
              numberOfLines={1}
              align="center"
              style={{ maxWidth: '100%' }}
            >
              {entry.name}
            </TextV4>
            <View
              style={{
                width: '100%',
                height,
                borderTopLeftRadius: tokens.radius.md,
                borderTopRightRadius: tokens.radius.md,
                backgroundColor: placeholderGround(theme),
                borderTopWidth: 2,
                borderColor: colors.border,
                alignItems: 'center',
                paddingTop: tokens.spacing.xs,
              }}
            >
              <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
                {`#${rank}`}
              </TextV4>
              <TextV4 size="xs" tone="onCard" numeric="tabular">
                {formatScore(entry.score)}
              </TextV4>
            </View>
          </View>
        );

        if (!onPress) {
          return (
            <View key={entry.id} accessible accessibilityLabel={name} style={{ flex: 1 }}>
              {column(false)}
            </View>
          );
        }
        return (
          <Pressable
            key={entry.id}
            accessibilityRole="button"
            accessibilityLabel={name}
            onPress={() => onPress(entry, rank)}
            style={{ flex: 1 }}
          >
            {({ pressed }) => column(pressed)}
          </Pressable>
        );
      })}
    </View>
  );
}
