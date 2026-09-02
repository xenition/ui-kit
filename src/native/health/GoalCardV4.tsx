import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { MiniBar } from '../charts';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { goalParts } from '../../health/goal-v4';
import { cardStyle, percentValue, spokenLine, toneInk } from './internal/tone-v4';
import type { GoalCardProps } from './GoalCard';

export interface GoalCardV4Props extends GoalCardProps {
  /** Shown in place of the meter when there is no usable target. Default `'No target set'`. */
  noGoalLabel?: string;
  /** The note shown once the target is reached. Default `'Goal met'`. */
  metLabel?: string;
  /** Format the measurement. Default `'12400 steps'`. */
  formatValue?: (value: number, unit?: string) => string;
}

/**
 * **V4 goal card** — same props as {@link GoalCard} plus `noGoalLabel`,
 * `metLabel` and `formatValue`.
 *
 * ## Five changes
 *
 * 1. **A walk of 12 400 steps against a 10 000 target is no longer three
 *    different walks.** The base clamped the measurement itself, so the card
 *    showed 12 400, announced "12 400 of 10 000, 100%" and handed the bar a
 *    value of 10 000 — three mutually inconsistent readings of one day.
 *    `goalParts` keeps the measurement, the drawing fraction and the overshoot
 *    as three separate numbers, and the card now says how far past the target
 *    the user actually got.
 * 2. **The meter is a real meter.** `MiniBar` hard-codes
 *    `accessibilityRole="image"`, so the progress this card exists to show was
 *    announced as a picture with no value at all. It is wrapped in a
 *    `progressbar` that carries the percentage, and the bar itself is hidden
 *    from the reader so the number is stated once.
 * 3. **The meter is a *sibling* of the card's activation, not a descendant.**
 *    A `Pressable` is `accessible` by default and flattens everything under
 *    it, so on iOS the meter was pruned outright — inside a button, a
 *    progressbar's value is presentational. The container is now a plain
 *    `View`, the activation wraps only the title and the readout, and the
 *    meter sits beside it.
 * 4. **`MiniBar` is handed a fraction, not a pair.** It rescales any `max`
 *    below 1 to 1, so a half-hour meditation against a half-hour target drew a
 *    half-full bar under the words "Goal met". It is given `ratio` against 1,
 *    which is the one opinion the card already formed.
 * 5. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` sits inside
 *    M3's disabled band, so a pressed card read as an unavailable one.
 *
 * **Renders nothing without a `title`.**
 */
export function GoalCardV4({
  title,
  value,
  target,
  unit,
  color = 'primary',
  icon,
  noGoalLabel = 'No target set',
  metLabel = 'Goal met',
  formatValue,
  onPress,
  appearance = 'classic',
  style,
}: GoalCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const parts = goalParts(value, target);
  const format = formatValue ?? ((v: number, u?: string) => `${v}${u ? ` ${u}` : ''}`);
  const reading = format(parts.value, unit);
  const barColor = parts.met ? 'success' : color;

  // The overshoot is the interesting fact on a day someone beat their target,
  // and the base destroyed it before anyone could read it.
  const overNote = parts.over > 0 ? `+${format(parts.over, unit)}` : null;
  const meterName = parts.hasGoal
    ? spokenLine([title, `${parts.percent}%`, parts.met ? metLabel : null, overNote])
    : null;

  const name = spokenLine([
    title,
    parts.hasGoal ? `${reading} of ${format(parts.target ?? 0, unit)}` : reading,
    parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
    parts.met ? metLabel : null,
    overNote,
  ]);

  const heading = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {icon ? (
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {icon}
          </View>
        ) : null}
        <TextV4
          size="base"
          weight="semibold"
          tone="onSurface"
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {title}
        </TextV4>
        {parts.met ? (
          <TextV4 size="xs" weight="bold" style={{ color: toneInk(theme, 'success') }}>
            {`✓ ${metLabel}`}
          </TextV4>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <TextV4
          size="2xl"
          weight="bold"
          numeric="tabular"
          style={{ color: parts.met ? toneInk(theme, 'success') : colors.onSurface }}
        >
          {reading}
        </TextV4>
        {parts.hasGoal ? (
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {`/ ${format(parts.target ?? 0, unit)}`}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={[cardStyle(theme, appearance), style]}>
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={name} onPress={onPress}>
          {({ pressed }) => heading(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name}>
          {heading(false)}
        </View>
      )}

      {parts.hasGoal && meterName ? (
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={meterName}
          accessibilityValue={percentValue(parts.percent)}
        >
          {/* `ratio` against 1, never `value` against `target`: MiniBar
              rescales any max below 1 and would draw a second opinion. */}
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <MiniBar value={parts.ratio ?? 0} max={1} color={barColor} />
          </View>
        </View>
      ) : (
        <TextV4 size="xs" tone="mutedText">
          {noGoalLabel}
        </TextV4>
      )}
    </View>
  );
}
