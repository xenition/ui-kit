import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { rowContainerStyle, rowTextStyle } from '../dashboard/internal/row-v4';
import { metaLine, spokenLine, trackGround } from './internal/tone-v4';
import type { ExerciseRowProps } from './ExerciseRow';

export interface ExerciseRowV4Props extends ExerciseRowProps {
  /** Word for a sets-only prescription. Default `'sets'`. */
  setsLabel?: string;
  /** Word for a reps-only prescription. Default `'reps'`. */
  repsLabel?: string;
  /** Announced for a completed exercise. Default `'done'`. */
  doneLabel?: string;
  /** Announced for one still to do. Default `'not done'`. */
  notDoneLabel?: string;
}

/** The check mark's box, as a fraction of the 44 target it sits in. */
const BOX_RATIO = 0.55;

/**
 * **V4 exercise row** — same props as {@link ExerciseRow} plus `setsLabel`,
 * `repsLabel`, `doneLabel` and `notDoneLabel`.
 *
 * ## Five changes
 *
 * 1. **The checkbox clears 44.** It was a 24px square — the second-smallest
 *    control in the module — on a row a lifter taps between sets with one
 *    sweaty thumb. The drawn box keeps its size; the *target* around it does
 *    not.
 * 2. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` fades the row's
 *    own content, which is the signal M3 spends 0.38 on to mean *disabled*, so
 *    a pressed row and a dead row looked alike.
 * 3. **The non-toggling branch is `accessible`.** It set a full computed name
 *    on a plain `Animated.View`, which is never an accessibility element on
 *    iOS, so a read-only exercise list announced nothing at all.
 * 4. **`'sets'`, `'reps'`, `'done'` and `'not done'` are props.** They were
 *    English literals inside a spoken string, which is the one place a
 *    hard-coded word cannot be worked around by the caller.
 * 5. **It is a row from the shared row family**, so an exercise row, a
 *    settings row and a notification row are one height and one rhythm rather
 *    than a hand-typed `minHeight: 52`.
 *
 * **Renders nothing without a `name`.**
 */
export function ExerciseRowV4({
  name,
  sets,
  reps,
  weight,
  done = false,
  meta,
  setsLabel = 'sets',
  repsLabel = 'reps',
  doneLabel = 'done',
  notDoneLabel = 'not done',
  onToggle,
  appearance = 'classic',
  style,
}: ExerciseRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const prescription =
    sets != null && reps != null
      ? `${sets} × ${reps}`
      : sets != null
        ? `${sets} ${setsLabel}`
        : reps != null
          ? `${reps} ${repsLabel}`
          : undefined;
  const details = [prescription, weight != null ? String(weight) : undefined, meta].filter(
    (part): part is string => part != null && part !== ''
  );
  const spoken = spokenLine([name, ...details, done ? doneLabel : notDoneLabel]);
  const tap = minTap(tokens.spacing);
  const box = Math.round(tap * BOX_RATIO);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        appearance !== 'classic'
          ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.md }
          : null,
        rowContainerStyle(theme, { twoLine: details.length > 0 }),
        pressed ? { backgroundColor: pressFill(theme) } : null,
        style,
      ]}
    >
      <View style={rowTextStyle(theme)}>
        <TextV4
          size="base"
          weight="semibold"
          tone={done ? 'mutedText' : 'onSurface'}
          numberOfLines={1}
        >
          {name}
        </TextV4>
        {details.length > 0 ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {metaLine(details)}
          </TextV4>
        ) : null}
      </View>
      <View style={{ width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: box,
            height: box,
            borderRadius: tokens.radius.sm,
            borderWidth: 2,
            borderColor: done ? colors.success : trackGround(theme),
            backgroundColor: done ? colors.success : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {done ? (
            <TextV4
              size="xs"
              weight="bold"
              allowFontScaling={false}
              style={{ color: colors.onSuccess }}
            >
              ✓
            </TextV4>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (!onToggle) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {content(false)}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      accessibilityLabel={spoken}
      onPress={() => onToggle(!done)}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
