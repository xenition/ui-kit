import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ProgressRing } from '../charts';
import { TextV4 } from '../primitives/TextV4';
import { goalParts } from '../../health/goal-v4';
import { looseCardStyle, percentValue, spokenLine, toneInk } from './internal/tone-v4';
import type { MetricRingProps } from './MetricRing';

export interface MetricRingV4Props extends MetricRingProps {
  /** Shown in place of the ring when there is no usable goal. Default `'No goal set'`. */
  noGoalLabel?: string;
  /** Format the measurement and its unit. Default `'540 kcal'`. */
  formatValue?: (value: number, unit?: string) => string;
}

/**
 * **V4 metric ring** — same props as {@link MetricRing} plus `noGoalLabel` and
 * `formatValue`.
 *
 * ## Four changes
 *
 * 1. **The ring announces its value.** `ProgressRing` hard-codes
 *    `accessibilityRole="image"`, so a component whose entire job is to show a
 *    number against a goal announced itself as a picture. The ring is wrapped
 *    in a `progressbar` carrying the percentage, and the drawing is hidden
 *    from the reader so the number is stated once rather than twice.
 * 2. **540 of 500 kcal reads as 540, not 500.** The base clamped the
 *    measurement and printed the clamped copy in the caption, so a metric that
 *    had been beaten looked exactly like one that had been met on the nose.
 *    The caption now shows what was measured and names the overshoot.
 * 3. **`ProgressRing` is handed a fraction against 1**, which is the same
 *    number the caption was derived from, so the arc and the words cannot
 *    disagree.
 * 4. **The "no goal" branch is a branch, not a zero.** `goal={0}` is now
 *    absence rather than nought per cent — a distinction the caption is free
 *    to say out loud.
 *
 * **Renders nothing without a `label`.**
 */
export function MetricRingV4({
  label,
  value,
  goal,
  unit,
  color = 'primary',
  size = 120,
  centerLabel,
  noGoalLabel = 'No goal set',
  formatValue,
  appearance = 'classic',
  style,
}: MetricRingV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!label) return null;

  const parts = goalParts(value, goal);
  const format = formatValue ?? ((v: number, u?: string) => `${v}${u ? ` ${u}` : ''}`);
  const surface = looseCardStyle(theme, appearance);
  const box = [{ alignItems: 'center' as const, gap: tokens.spacing.xs }, surface, style];

  if (!parts.hasGoal) {
    return (
      <View style={box}>
        <View
          accessible
          accessibilityLabel={spokenLine([label, format(parts.value, unit), noGoalLabel])}
        >
          <TextV4 size="sm" weight="semibold" tone="onSurface" align="center">
            {label}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" align="center">
            {noGoalLabel}
          </TextV4>
        </View>
      </View>
    );
  }

  const overNote = parts.over > 0 ? `+${format(parts.over, unit)}` : null;
  const caption = `${format(parts.value, unit)} / ${format(parts.target ?? 0, unit)}`;
  const name = spokenLine([label, caption, `${parts.percent}%`, overNote]);

  return (
    <View style={box}>
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={name}
        accessibilityValue={percentValue(parts.percent)}
      >
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {/* A fraction against 1 — the same number the caption prints. */}
          <ProgressRing
            value={parts.ratio ?? 0}
            max={1}
            size={size}
            color={color}
            label={centerLabel ?? `${parts.percent}%`}
          />
        </View>
      </View>
      <TextV4 size="sm" weight="semibold" tone="onSurface">
        {label}
      </TextV4>
      <TextV4 size="xs" tone="mutedText" numeric="tabular">
        {caption}
      </TextV4>
      {overNote ? (
        <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, 'success') }}>
          {overNote}
        </TextV4>
      ) : null}
    </View>
  );
}
