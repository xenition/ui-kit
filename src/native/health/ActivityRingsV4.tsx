import * as React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { goalParts, type GoalParts } from '../../health/goal-v4';
import {
  looseCardStyle,
  metaLine,
  percentValue,
  spokenLine,
  trackGround,
} from './internal/tone-v4';
import type { ActivityRing, ActivityRingColor, ActivityRingsProps } from './ActivityRings';

export type { ActivityRing, ActivityRingColor };

export interface ActivityRingsV4Props extends ActivityRingsProps {
  /** Shown when there is nothing to draw. Default `'No activity yet'`. */
  emptyLabel?: string;
  /** Said of a ring whose goal is missing or zero. Default `'no goal'`. */
  noGoalLabel?: string;
  /** Build one ring's spoken fragment. Default `'Move 87%'`. */
  formatRing?: (ring: ActivityRing, parts: GoalParts) => string;
}

const DEFAULT_COLORS: ActivityRingColor[] = ['danger', 'success', 'primary', 'accent'];

/**
 * **V4 activity rings** — same props as {@link ActivityRings} plus
 * `emptyLabel`, `noGoalLabel` and `formatRing`.
 *
 * ## Five changes
 *
 * 1. **A ring with no goal says so instead of announcing "0%".** The base read
 *    `goal: 0` as nought per cent, so 540 burned calories with the target
 *    switched off were reported as no progress at all.
 * 2. **The figure stops claiming rings it did not draw.** Rings whose radius
 *    fell to zero — the fifth ring on a 140px figure, say — were dropped
 *    silently and then legended and announced anyway. Only the rings that
 *    actually fit are drawn, listed and spoken.
 * 3. **The empty branch keeps `style` and `appearance`.** It returned a bare
 *    `<Text>` before either was applied, so a caller's layout and surface
 *    treatment vanished at exactly the moment the component had least to say.
 * 4. **Each legend row is a real `progressbar` with a value**, so the numbers
 *    the rings encode are reachable. When there is no legend the figure keeps
 *    the one summary sentence; when there is one, the drawing becomes
 *    decorative rather than repeating everything the legend already says.
 * 5. **The ring track is a surface, not the hairline colour**, which on a dark
 *    seed made an empty ring and a full one hard to distinguish.
 */
export function ActivityRingsV4({
  rings,
  size = 140,
  strokeWidth = 14,
  gap = 4,
  showLegend = false,
  accessibilityLabel,
  emptyLabel = 'No activity yet',
  noGoalLabel = 'no goal',
  formatRing,
  appearance = 'classic',
  style,
}: ActivityRingsV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const surface = looseCardStyle(theme, appearance);

  // The radius a ring at index `i` would take; at or below zero it cannot be
  // drawn, and the base kept announcing it regardless.
  const radiusAt = (i: number): number => size / 2 - strokeWidth / 2 - i * (strokeWidth + gap);
  const drawn = (rings ?? [])
    .map((ring, i) => ({ ring, index: i, r: radiusAt(i), parts: goalParts(ring.value, ring.goal) }))
    .filter((entry) => entry.r > 0);

  if (drawn.length === 0) {
    return (
      <View style={[surface, style]}>
        <View accessible accessibilityLabel={emptyLabel}>
          <TextV4 size="sm" tone="mutedText">
            {emptyLabel}
          </TextV4>
        </View>
      </View>
    );
  }

  const arcColor = (ring: ActivityRing, i: number): string =>
    colors[ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary'];

  const ringName = (ring: ActivityRing, parts: GoalParts): string =>
    formatRing
      ? formatRing(ring, parts)
      : spokenLine([
          ring.label,
          parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
          `${parts.value}${ring.unit ? ` ${ring.unit}` : ''}`,
        ]);

  const summary =
    accessibilityLabel ??
    `Activity rings: ${drawn.map((entry) => ringName(entry.ring, entry.parts)).join('; ')}`;

  const figure = (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
          {drawn.map((entry) => {
            const circumference = 2 * Math.PI * entry.r;
            return (
              <G key={entry.index}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={entry.r}
                  fill="none"
                  stroke={trackGround(theme)}
                  strokeWidth={strokeWidth}
                />
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={entry.r}
                  fill="none"
                  stroke={arcColor(entry.ring, entry.index)}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${circumference * (entry.parts.ratio ?? 0)} ${circumference}`}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );

  if (!showLegend) {
    return (
      <View style={[surface, style]}>
        <View accessible accessibilityRole="image" accessibilityLabel={summary}>
          {figure}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg },
        surface,
        style,
      ]}
    >
      {/* The legend carries every number, so the drawing repeating them would
          make a reader hear the whole figure twice. */}
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {figure}
      </View>
      <View style={{ gap: tokens.spacing.sm, flex: 1, minWidth: 0 }}>
        {drawn.map((entry) => (
          <View
            key={entry.index}
            accessible
            accessibilityRole={entry.parts.hasGoal ? 'progressbar' : 'text'}
            accessibilityLabel={ringName(entry.ring, entry.parts)}
            accessibilityValue={entry.parts.hasGoal ? percentValue(entry.parts.percent) : undefined}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            <View
              style={{
                width: tokens.spacing.sm,
                height: tokens.spacing.sm,
                borderRadius: tokens.radius.full,
                backgroundColor: arcColor(entry.ring, entry.index),
              }}
            />
            <TextV4 size="sm" tone="onSurface">
              {entry.ring.label}
            </TextV4>
            <TextV4
              size="xs"
              tone="mutedText"
              numeric="tabular"
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {entry.parts.hasGoal
                ? metaLine([`${entry.parts.value} / ${entry.parts.target}`, entry.ring.unit])
                : metaLine([`${entry.parts.value}`, entry.ring.unit, noGoalLabel])}
            </TextV4>
          </View>
        ))}
      </View>
    </View>
  );
}
