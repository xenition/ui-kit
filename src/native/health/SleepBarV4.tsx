import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { goalParts } from '../../health/goal-v4';
import {
  cardStyle,
  percentValue,
  spokenLine,
  toneFill,
  toneInk,
  trackGround,
  type ToneV4,
} from './internal/tone-v4';
import type { SleepBarProps, SleepQuality } from './SleepBar';

export type { SleepQuality };

export interface SleepBarV4Props extends SleepBarProps {
  /** Shown in place of the ratio when there is no usable goal. Default `'No goal set'`. */
  noGoalLabel?: string;
  /** Wording for each quality rating. Defaults to `Poor` / `Fair` / `Good` / `Excellent`. */
  qualityLabels?: Partial<Record<SleepQuality, string>>;
  /** Format an hours figure. Default `'7.5h'`. */
  formatHours?: (hours: number) => string;
}

/** Quality → the tone its tag and bar take. */
const QUALITY_TONE: Record<SleepQuality, ToneV4> = {
  poor: 'danger',
  fair: 'warn',
  good: 'primary',
  excellent: 'success',
};

const QUALITY_LABEL: Record<SleepQuality, string> = {
  poor: 'Poor',
  fair: 'Fair',
  good: 'Good',
  excellent: 'Excellent',
};

/**
 * **V4 sleep bar** — same props as {@link SleepBar} plus `noGoalLabel`,
 * `qualityLabels` and `formatHours`.
 *
 * ## Five changes
 *
 * 1. **A fully-slept night with `goal={0}` no longer draws an empty bar.** The
 *    base read a goal of zero as *nought per cent* rather than as *no goal*,
 *    so someone who turned their sleep target off saw 7.5 hours reported above
 *    a completely empty track. Absence is now its own branch: the hours stand
 *    alone and the card says there is no goal.
 * 2. **The bar is a real `progressbar` with a value.** It was a pair of plain
 *    `View`s inside a container whose `accessibilityLabel` was set on a
 *    non-`accessible` element — dead on iOS — so nothing about this card
 *    reached a screen reader at all.
 * 3. **The container stops claiming a name it cannot carry.** The label moves
 *    onto the elements that actually own each fact: one for the readout, the
 *    meter for the progress, one for the bed and wake times.
 * 4. **The track is a surface, not a hairline.** `colors.border` as a fill is
 *    nearly invisible on a dark seed, which made an empty bar and a half-full
 *    one hard to tell apart.
 * 5. **The quality words are props**, and the tag is a word as well as a
 *    colour — the base carried the rating in the tag's ink alone once the
 *    label was lost.
 */
export function SleepBarV4({
  hours,
  goal = 8,
  quality,
  bedtime,
  wakeTime,
  noGoalLabel = 'No goal set',
  qualityLabels,
  formatHours,
  appearance = 'classic',
  style,
}: SleepBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const parts = goalParts(hours, goal);
  const format = formatHours ?? ((h: number) => `${h}h`);
  const tone: ToneV4 = quality ? QUALITY_TONE[quality] : 'primary';
  const qualityWord = quality ? (qualityLabels?.[quality] ?? QUALITY_LABEL[quality]) : null;

  const readout = spokenLine([
    `Sleep ${format(parts.value)}`,
    parts.hasGoal ? `of ${format(parts.target ?? 0)}` : noGoalLabel,
    qualityWord ? `${qualityWord} quality` : null,
  ]);
  const times = spokenLine([
    bedtime ? `Bedtime ${bedtime}` : null,
    wakeTime ? `Wake ${wakeTime}` : null,
  ]);

  return (
    <View style={[cardStyle(theme, appearance), style]}>
      <View
        accessible
        accessibilityLabel={readout}
        style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <TextV4
            size="base"
            allowFontScaling={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            😴
          </TextV4>
          <TextV4 size="2xl" weight="bold" tone="onSurface" numeric="tabular">
            {format(parts.value)}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {parts.hasGoal ? `/ ${format(parts.target ?? 0)}` : noGoalLabel}
          </TextV4>
        </View>
        {qualityWord ? (
          <TextV4 size="xs" weight="bold" style={{ color: toneInk(theme, tone) }}>
            {qualityWord}
          </TextV4>
        ) : null}
      </View>

      {parts.hasGoal ? (
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={readout}
          accessibilityValue={percentValue(parts.percent)}
          style={{
            height: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: trackGround(theme),
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${Math.round((parts.ratio ?? 0) * 100)}%`,
              height: '100%',
              borderRadius: tokens.radius.full,
              backgroundColor: toneFill(theme, tone),
            }}
          />
        </View>
      ) : null}

      {times ? (
        <View
          accessible
          accessibilityLabel={times}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <TextV4 size="xs" tone="mutedText">
            {bedtime ? `🌙 ${bedtime}` : ''}
          </TextV4>
          <TextV4 size="xs" tone="mutedText">
            {wakeTime ? `☀️ ${wakeTime}` : ''}
          </TextV4>
        </View>
      ) : null}
    </View>
  );
}
