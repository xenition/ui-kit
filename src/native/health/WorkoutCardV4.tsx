import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { cardStyle, spokenLine, toneInk } from './internal/tone-v4';
import type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';

export type { WorkoutVariant };

export interface WorkoutCardV4Props extends WorkoutCardProps {
  /** Captions above the two stats. Default `'Duration'` and `'Calories'`. */
  statLabels?: { duration?: string; calories?: string };
  /** The note shown for a finished workout. Default `'Completed'`. */
  completedLabel?: string;
}

const WORKOUT_GLYPH: Record<WorkoutVariant, string> = {
  strength: '🏋️',
  cardio: '❤️',
  yoga: '🧘',
  cycling: '🚴',
  running: '🏃',
  swimming: '🏊',
  hiit: '🔥',
  walking: '🚶',
};

const WORKOUT_LABEL: Record<WorkoutVariant, string> = {
  strength: 'Strength',
  cardio: 'Cardio',
  yoga: 'Yoga',
  cycling: 'Cycling',
  running: 'Running',
  swimming: 'Swimming',
  hiit: 'HIIT',
  walking: 'Walking',
};

/**
 * **V4 workout card** — same props as {@link WorkoutCard} plus `statLabels`
 * and `completedLabel`.
 *
 * ## Five changes
 *
 * 1. **A discipline is not a status.** The base tinted the eyebrow by
 *    variant — `cardio: 'danger'`, `running: 'warn'`, `walking: 'success'` —
 *    so a card announcing a gentle walk was green with approval and one
 *    announcing a cardio session was in the same red the kit uses for an
 *    error. Identity keeps the glyph and the word and takes ordinary ink;
 *    `success` is then free to mean "you finished this".
 * 2. **The stat strip is guarded.** Native laid it out unconditionally, so a
 *    workout with neither a duration nor a calorie figure drew an empty
 *    `xl`-wide gap where the numbers would have been. The web twin already
 *    guarded it — this is the two halves disagreeing.
 * 3. **The card's name is `accessible` and complete.** It sat on a plain
 *    `View` (dead on iOS) and named only the discipline and the title, leaving
 *    out the description, the duration and the calories.
 * 4. **The name sits beside the "Start" button, not around it.** An
 *    `accessible` container would flatten the one control on the card, so the
 *    spoken region wraps the media and text and the button is its sibling.
 * 5. **`Duration`, `Calories` and `Completed` are props**, and the card uses
 *    the V4 button and the `*Text` ink slots throughout.
 *
 * **Renders nothing without a `title`.**
 */
export function WorkoutCardV4({
  title,
  variant,
  durationMin,
  calories,
  description,
  completed = false,
  startLabel = 'Start',
  statLabels,
  completedLabel = 'Completed',
  onStart,
  appearance = 'classic',
  style,
}: WorkoutCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!title) return null;

  const discipline = WORKOUT_LABEL[variant];
  const durationLabel = statLabels?.duration ?? 'Duration';
  const caloriesLabel = statLabels?.calories ?? 'Calories';
  const hasStats = durationMin != null || calories != null;

  const name = spokenLine([
    discipline,
    title,
    description,
    durationMin != null ? `${durationLabel} ${durationMin} min` : null,
    calories != null ? `${caloriesLabel} ${calories} kcal` : null,
    completed ? completedLabel : null,
  ]);

  return (
    <View style={[cardStyle(theme, appearance), { gap: tokens.spacing.md }, style]}>
      {/* The spoken region is a sibling of the action, never its parent: an
          `accessible` card would flatten the button out of existence. */}
      <View accessible accessibilityLabel={name} style={{ gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4 size="xl" allowFontScaling={false}>
            {WORKOUT_GLYPH[variant]}
          </TextV4>
          <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
            <TextV4
              size="xs"
              weight="bold"
              tone="mutedText"
              style={{ textTransform: 'uppercase' }}
            >
              {discipline}
            </TextV4>
            <TextV4 size="lg" weight="bold" tone="onSurface" numberOfLines={1}>
              {title}
            </TextV4>
          </View>
        </View>

        {description ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={2}>
            {description}
          </TextV4>
        ) : null}

        {hasStats ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
            {durationMin != null ? (
              <View style={{ gap: tokens.spacing.xs }}>
                <TextV4 size="xs" tone="mutedText">
                  {durationLabel}
                </TextV4>
                <TextV4 size="base" weight="semibold" tone="onSurface" numeric="tabular">
                  {`${durationMin} min`}
                </TextV4>
              </View>
            ) : null}
            {calories != null ? (
              <View style={{ gap: tokens.spacing.xs }}>
                <TextV4 size="xs" tone="mutedText">
                  {caloriesLabel}
                </TextV4>
                <TextV4 size="base" weight="semibold" tone="onSurface" numeric="tabular">
                  {`${calories} kcal`}
                </TextV4>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>

      {completed ? (
        <TextV4 size="sm" weight="bold" style={{ color: toneInk(theme, 'success') }}>
          {`✓ ${completedLabel}`}
        </TextV4>
      ) : onStart ? (
        <ButtonV4 variant="primary" onPress={onStart}>
          {startLabel}
        </ButtonV4>
      ) : null}
    </View>
  );
}
