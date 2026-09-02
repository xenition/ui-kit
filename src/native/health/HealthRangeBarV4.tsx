import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { type Appearance } from '../primitives/internal/appearance';
import { rangeVerdict, type HealthRange, type RangeVerdict } from '../../health/goal-v4';
import {
  RANGE_LABEL,
  cardStyle,
  spokenLine,
  toneFill,
  toneInk,
  trackGround,
  verdictTone,
} from './internal/tone-v4';

export interface HealthRangeBarV4Props {
  /** What was measured, e.g. `'Fasting glucose'`. */
  label: string;
  /** The reading being plotted. */
  value: number;
  /** The normal band. Either bound may be omitted for a one-sided range. */
  range?: HealthRange;
  /** Unit suffix, e.g. `'mg/dL'`. */
  unit?: string;
  /** Scale start. Derived from the reading and the band when omitted. */
  min?: number;
  /** Scale end. Derived from the reading and the band when omitted. */
  max?: number;
  /** Wording for each verdict. Defaults to `Below range` / `In range` / `Above range`. */
  rangeLabels?: Partial<Record<RangeVerdict, string>>;
  /** Format the reading and the band's bounds. Default `'96 mg/dL'`. */
  formatValue?: (value: number, unit?: string) => string;
  /** Shown in place of the band when no usable range was supplied. Default `'No range set'`. */
  emptyLabel?: string;
  /** Surface treatment. Defaults to `classic`, matching the rest of the module. */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * How much air the derived scale leaves outside the data, as a fraction of the
 * span it covers. A reading sitting hard against the end of its own axis reads
 * as clipped rather than as extreme.
 */
const SCALE_PAD = 0.25;

/** The marker's width relative to the track's height — a tick, not a dot. */
const MARKER_RATIO = 0.5;

/**
 * **V4 health range bar** — a reading plotted against its normal band. New in
 * V4; there is no base component.
 *
 * ## Why it exists
 *
 * Nothing in the `health` module could say *out of range*. `VitalStat` fixed
 * its tone by `variant`, so a fasting glucose of 260 mg/dL drew in exactly the
 * ink a fasting glucose of 95 drew in, and a heart rate of 190 bpm shared its
 * permanent red with a resting 58. `VitalStatV4` and `BodyMetricCardV4` can
 * now take a `range` and say the word — but a word is not a picture, and a
 * reading is far easier to judge against a band you can see than against one
 * you have to remember.
 *
 * So: the band is drawn as a lit segment of the track, the reading as a marker
 * on it, and the verdict as a word beneath. It reads `rangeVerdict` from the
 * shared `goal-v4`, which is the same function the two cards read, so the
 * picture and the words cannot disagree.
 *
 * ## Four things it does deliberately
 *
 * 1. **The whole bar is one `progressbar` with a value**, rather than a
 *    decorative drawing with a caption beside it — every meter in the base
 *    module was the latter.
 * 2. **The verdict is a word before it is a colour.** `low` and `high` share
 *    one tone, because a component knows only that a reading is outside the
 *    band it was handed, not whether that is a rounding error or an emergency.
 * 3. **The scale is derived from the data and the band together**, so a
 *    reading far outside its band is still visible on the axis instead of
 *    being pinned to the end of it.
 * 4. **No band is a state, not a blank.** With `range` omitted the reading
 *    still renders, under `emptyLabel` — the same distinction `goalParts`
 *    draws between "no goal" and "nought per cent", and for the same reason:
 *    a component that does not know the band must not draw one.
 *
 * **Renders nothing without a `label` or a finite `value`.**
 */
export function HealthRangeBarV4({
  label,
  value,
  range,
  unit,
  min,
  max,
  rangeLabels,
  formatValue,
  emptyLabel = 'No range set',
  appearance = 'classic',
  style,
}: HealthRangeBarV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!label || !Number.isFinite(value)) return null;

  const format = formatValue ?? ((n: number, u?: string) => `${n}${u ? ` ${u}` : ''}`);
  const verdict = rangeVerdict(value, range);

  const heading = (ink: string): React.ReactElement => (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
      <TextV4 size="sm" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
        {label}
      </TextV4>
      <TextV4 size="lg" weight="bold" numeric="tabular" style={{ color: ink }}>
        {format(value, unit)}
      </TextV4>
    </View>
  );

  if (verdict === undefined) {
    return (
      <View
        accessible
        accessibilityLabel={spokenLine([label, format(value, unit), emptyLabel])}
        style={[cardStyle(theme, appearance), style]}
      >
        {heading(theme.colors.onSurface)}
        <TextV4 size="xs" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const low = typeof range?.low === 'number' && Number.isFinite(range.low) ? range.low : undefined;
  const high =
    typeof range?.high === 'number' && Number.isFinite(range.high) ? range.high : undefined;

  const points = [value, low, high].filter((n): n is number => n !== undefined);
  const dataMin = Math.min(...points);
  const dataMax = Math.max(...points);
  const span = dataMax - dataMin || Math.abs(dataMax) || 1;
  const floor = min ?? dataMin - span * SCALE_PAD;
  const ceiling = max ?? dataMax + span * SCALE_PAD;
  const width = ceiling - floor || 1;

  const at = (n: number): number => Math.min(Math.max((n - floor) / width, 0), 1);
  const bandStart = at(low ?? floor);
  const bandEnd = at(high ?? ceiling);

  const tone = verdictTone(verdict);
  const word = rangeLabels?.[verdict] ?? RANGE_LABEL[verdict];
  const bandCaption =
    low !== undefined && high !== undefined
      ? `${format(low, unit)} – ${format(high, unit)}`
      : low !== undefined
        ? `≥ ${format(low, unit)}`
        : `≤ ${format(high ?? 0, unit)}`;

  const trackHeight = tokens.spacing.sm;
  const markerWidth = Math.max(2, Math.round(trackHeight * MARKER_RATIO));

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={spokenLine([label, format(value, unit), word, `normal ${bandCaption}`])}
      accessibilityValue={{ min: floor, max: ceiling, now: value }}
      style={[cardStyle(theme, appearance), style]}
    >
      {heading(toneInk(theme, tone))}

      <View
        style={{
          height: trackHeight,
          borderRadius: tokens.radius.full,
          backgroundColor: trackGround(theme),
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        {/* The band, lit along the track. */}
        <View
          style={{
            position: 'absolute',
            left: `${bandStart * 100}%`,
            width: `${Math.max(bandEnd - bandStart, 0) * 100}%`,
            height: '100%',
            backgroundColor: toneFill(theme, 'success'),
          }}
        />
        {/* The reading. A tick that spans the track's full height, so it is
            legible against both the band and the ground outside it. */}
        <View
          style={{
            position: 'absolute',
            left: `${at(value) * 100}%`,
            marginStart: -markerWidth / 2,
            width: markerWidth,
            height: '100%',
            borderRadius: tokens.radius.full,
            backgroundColor: theme.colors.onSurface,
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, tone) }}>
          {word}
        </TextV4>
        <TextV4 size="xs" tone="mutedText" numeric="tabular">
          {bandCaption}
        </TextV4>
      </View>
    </View>
  );
}
