import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { meterParts } from '../../kids/family-v4';
import {
  cardStyle,
  percentValue,
  skeletonBlockStyle,
  spokenLine,
  toneInk,
  type ToneV4,
} from './internal/tone-v4';
import type { ScreenTimeBarProps } from './ScreenTimeBar';

export interface ScreenTimeBarV4Props extends ScreenTimeBarProps {
  /** Note shown beside the reading when no limit is configured. Default `emptyLabel`. */
  noLimitLabel?: string;
  /** Precedes the overage. Default `'over by'`. */
  overLabel?: string;
  /** Follows the remaining time. Default `'left'`. */
  remainingLabel?: string;
  /** Format a duration. Default `'1h 30m'` for minutes, `'90 units'` otherwise. */
  formatDuration?: (minutes: number) => string;
}

/** Above this fraction of the limit the readout warns. 0.8 — the base's own threshold. */
const NEAR = 0.8;

/**
 * **V4 screen-time bar** — same props as {@link ScreenTimeBar} plus
 * `noLimitLabel`, `overLabel`, `remainingLabel` and `formatDuration`.
 *
 * ## Five changes
 *
 * 1. **`limit={0}` no longer throws the reading away.** The base returned early
 *    on any non-positive limit and told the parent "No screen-time limit set" —
 *    never that the child had been on the device for four hours. That is the
 *    one screen where the number matters most. "No limit set" is now a *note*
 *    beside the reading, not a replacement for it.
 * 2. **A broken reading is reported as broken.** `used={-30}` rendered
 *    "0 min / 2h — 2h left" as though a negative number out of a failed sync
 *    were sound data, and `used={NaN}` reached the screen as "NaNh NaNm" with a
 *    bar of width `"NaN%"`. `meterParts` never touches the measurement: it
 *    hands back the value as given, a `ratio` clamped **for drawing only**, and
 *    a `valid` flag. An unusable reading renders nothing rather than a
 *    confident nought.
 * 3. **The meter announces a range it is actually in.** `used={180}` against a
 *    120 limit announced `valuenow=180` against `valuemax=120` — "180 of 120".
 *    The bar is now a percentage of the limit, 0–100, and the overage is its
 *    own sentence.
 * 4. **A translated unit keeps its formatting.** The h/m split tested
 *    `unit !== 'min'` against the literal string, so a caller who passed a
 *    localised unit fell straight through to `${mins} ${unit}` and lost the
 *    split entirely. `formatDuration` is the hook that was missing.
 * 5. **Over the limit is `warn`, never `danger`.** This module draws children,
 *    and `danger` means the *system* has failed. A child who has had more
 *    screen time than a parent planned has not broken anything; the state is
 *    carried by a glyph, a word and the overage, so it survives greyscale too.
 *
 * **Renders nothing when the reading itself is unusable** — see change 2.
 */
export function ScreenTimeBarV4({
  used,
  limit,
  unit = 'min',
  label = 'Screen time',
  loading = false,
  emptyLabel = 'No screen-time limit set',
  noLimitLabel,
  overLabel = 'over by',
  remainingLabel = 'left',
  formatDuration,
  style,
}: ScreenTimeBarV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const container = [cardStyle(theme), { gap: tokens.spacing.sm }, style];

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading screen time" style={container}>
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.base, width: '40%' })}
        />
        <View style={skeletonBlockStyle(theme, { height: tokens.spacing.sm })} />
      </View>
    );
  }

  const parts = meterParts(used, limit);
  // `valid: false` is "the caller handed us NaN". A frame around a number we do
  // not have is worse than no frame at all (§4.5).
  if (!parts.valid) return null;

  // The default only knows minutes, so it only claims minutes. Any other unit
  // falls through to the value and the caller's word — and `formatDuration` is
  // there for a locale that splits hours and minutes differently.
  const format =
    formatDuration ??
    ((minutes: number): string => {
      if (unit !== 'min') return `${minutes} ${unit}`;
      if (minutes < 60) return `${minutes} ${unit}`;
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return m === 0 ? `${h}h` : `${h}h ${m}m`;
    });

  const reading = format(parts.value);
  const over = parts.over > 0;
  const near = !over && parts.hasLimit && (parts.ratio ?? 0) >= NEAR;
  const tone: ToneV4 = over || near ? 'warn' : 'neutral';

  const note = !parts.hasLimit
    ? (noLimitLabel ?? emptyLabel)
    : over
      ? `${overLabel} ${format(parts.over)}`
      : `${format(parts.remaining)} ${remainingLabel}`;

  const name = spokenLine([
    label,
    parts.hasLimit ? `${reading} / ${format(parts.limit ?? 0)}` : reading,
    parts.hasLimit ? `${parts.percent}%` : null,
    note,
  ]);

  return (
    <View style={container}>
      <View accessible accessibilityLabel={name}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: tokens.spacing.sm,
          }}
        >
          <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
            {label}
          </TextV4>
          <TextV4
            size="sm"
            weight="bold"
            numeric="tabular"
            numberOfLines={1}
            style={{ color: over || near ? toneInk(theme, 'warn') : colors.onCard }}
          >
            {parts.hasLimit ? `${reading} / ${format(parts.limit ?? 0)}` : reading}
          </TextV4>
        </View>
        {/* A word and a glyph, never the hue on its own — and never `danger`. */}
        <TextV4 size="xs" weight={over ? 'bold' : 'regular'} tone={over ? 'warnText' : 'mutedText'}>
          {over ? `⚠ ${note}` : note}
        </TextV4>
      </View>

      {/* The meter is a sibling of the readout, so its value is not pruned by an
          ancestor that has already claimed the whole card as one leaf. */}
      {parts.hasLimit ? (
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={spokenLine([label, `${parts.percent}%`, note])}
          accessibilityValue={percentValue(parts.percent)}
        >
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {/* `percent` against 100, never `value` against `limit`: the bar draws
                the clamped ratio while the readout above keeps the real number. */}
            <ProgressV4
              value={parts.percent ?? 0}
              max={100}
              tone={tone === 'warn' ? 'warn' : 'primary'}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
