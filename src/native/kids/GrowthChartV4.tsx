import * as React from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Polyline, Rect } from 'react-native-svg';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { MIN_NON_TEXT_CONTRAST } from '../../primitives/internal/feedback-v4';
import { CHART_MARK } from '../../primitives/internal/v4-chart';
import { ensureContrast } from '../../theme/color';
import { cardStyle, metaLine, skeletonBlockStyle, spokenLine, trackGround } from './internal/tone-v4';
import type { GrowthChartProps, GrowthMetric } from './GrowthChart';

/** One dated measurement. An ISO instant and a value. Declared identically on both twins. */
export interface GrowthPoint {
  at: string;
  value: number;
}

export interface GrowthChartV4Props extends Omit<GrowthChartProps, 'data'> {
  /**
   * Undated readings plotted on the array index — the base's shape, kept so an
   * existing caller sees no change.
   *
   * **Optional here where the base makes it required**, because a caller who
   * has `points` has no bare numbers to invent. `ActivityFeedV4` and
   * `QuickActionsV4` re-declare a required base prop the same way.
   */
  data?: number[];
  /** Dated measurements. Sorted by `at` before plotting; supersedes `data`. */
  points?: GrowthPoint[];
  /** Unit suffix for every reading, e.g. `'cm'`. */
  unit?: string;
  /** A reference band in the value's own unit, e.g. the 25th–75th centile. */
  percentileBand?: { low: number; high: number };
  /** Format a reading. Default `'68 cm'`. */
  formatValue?: (v: number, unit?: string) => string;
  /** Copy shown when there is nothing to plot. */
  emptyLabel?: string;
}

const METRIC_GLYPH: Record<GrowthMetric, string> = {
  height: '📏',
  weight: '⚖️',
  head: '🧢',
  other: '📈',
};

const METRIC_LABEL: Record<GrowthMetric, string> = {
  height: 'Height',
  weight: 'Weight',
  head: 'Head circumference',
  other: 'Growth',
};

/** Head- and foot-room, as a fraction of the value span, so nothing sits on an edge. */
const DOMAIN_PAD = 0.12;

/** How far the domain is padded past the data, as a fraction of the span, when
 * the series is flat or a single reading. */
const FLAT_PAD = 0.1;

/** One reading after scaling: its pixel position and the instant it came from. */
interface Plotted {
  x: number;
  y: number;
  at?: string;
}

/**
 * **V4 growth chart** — same props as {@link GrowthChart} plus `points`,
 * `percentileBand`, `formatValue` and a `unit` that now reaches every reading.
 *
 * ## Five changes
 *
 * 1. **A growth curve has a date axis.** The base took `data: number[]` and
 *    plotted it on the *array index*, so measurements at 2 months, 4 months and
 *    3 years rendered evenly spaced — a chart of a child's growth in which the
 *    horizontal axis meant nothing. Worse, unsorted input drew a *descending*
 *    curve for a growing child, because nothing put the readings in order.
 *    `points` carries `{ at, value }`, is sorted by `at`, and is laid out in
 *    **real time**: the gap between two measurements on screen is the gap
 *    between them in life. `data` still works and still plots on the index,
 *    so an existing caller sees no change.
 * 2. **A single measurement is visible.** One datum landed exactly on the
 *    bottom edge with half the dot clipped off the plot. The domain is padded,
 *    and a lone reading sits in the middle of the box.
 * 3. **The plot fits the card it is in.** It was a fixed 300px box inside a
 *    `lg`-padded card, so on a narrow phone the curve ran under the padding and
 *    on a tablet it stranded a third of the card empty. The plot measures its
 *    own column.
 * 4. **The series reaches a screen reader as numbers.** The base handed the
 *    whole thing to a `role="img"` with "Height over time" on it — a picture
 *    with a caption, which is nothing at all. The card is one spoken sentence
 *    carrying the count, the span of dates, the first and latest readings and
 *    the change between them; the drawing itself is marked decorative, because
 *    it is.
 * 5. **The card is a card and its skeleton is a skeleton** — `card`/`onCard`
 *    rather than the page's `surface`, and `skeletonFill` rather than
 *    `colors.border`, the hairline colour used as a fill.
 *
 * **Renders an empty state, never a frame around nothing** (§4.5).
 */
export function GrowthChartV4({
  data,
  points,
  metric = 'height',
  unit,
  percentile,
  percentileBand,
  color = 'primary',
  height = 160,
  loading = false,
  formatValue,
  emptyLabel = 'No measurements logged yet',
  style,
}: GrowthChartV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [plotWidth, setPlotWidth] = React.useState(0);

  const glyph = METRIC_GLYPH[metric] ?? METRIC_GLYPH.other;
  const metricWord = METRIC_LABEL[metric] ?? METRIC_LABEL.other;
  const format = formatValue ?? ((v: number, u?: string) => `${v}${u ? ` ${u}` : ''}`);

  const container = [cardStyle(theme), style];

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading growth chart" style={container}>
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.base, width: '40%' })}
        />
        <View style={skeletonBlockStyle(theme, { height })} />
      </View>
    );
  }

  // Sorting is the whole of defect 1's second half: an unsorted series drew a
  // descending curve for a growing child, and nobody noticed because the axis
  // was the array index and the array index is always ascending.
  const dated = (points ?? [])
    .filter((p) => Number.isFinite(p.value) && Number.isFinite(Date.parse(p.at)))
    .slice()
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
  const bare = dated.length > 0 ? [] : (data ?? []).filter((v) => Number.isFinite(v));
  const values = dated.length > 0 ? dated.map((p) => p.value) : bare;

  if (values.length === 0) {
    return (
      <View accessible accessibilityLabel={spokenLine([metricWord, emptyLabel])} style={container}>
        <TextV4 size="base" weight="bold" tone="onCard">
          {`${glyph} ${metricWord}`}
        </TextV4>
        <View
          style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}
        >
          <TextV4
            size="2xl"
            allowFontScaling={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            📉
          </TextV4>
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      </View>
    );
  }

  const first = values[0] as number;
  const latest = values[values.length - 1] as number;

  // The band is part of what the plot has to fit, or half of it is drawn
  // outside the box it is meant to explain.
  const band =
    percentileBand &&
    Number.isFinite(percentileBand.low) &&
    Number.isFinite(percentileBand.high)
      ? {
          low: Math.min(percentileBand.low, percentileBand.high),
          high: Math.max(percentileBand.low, percentileBand.high),
        }
      : undefined;

  const rawLo = Math.min(...values, band ? band.low : Infinity);
  const rawHi = Math.max(...values, band ? band.high : -Infinity);
  // A flat or single-valued series has no span to pad, so it is given one —
  // which is what stops one measurement landing on the bottom edge (defect 2).
  const pad =
    rawHi - rawLo > 0
      ? (rawHi - rawLo) * DOMAIN_PAD
      : Math.max(1, Math.abs(rawHi) * FLAT_PAD);
  const lo = rawLo - pad;
  const span = rawHi + pad - lo;

  const times = dated.map((p) => Date.parse(p.at));
  const t0 = times.length > 0 ? (times[0] as number) : 0;
  const tSpan = times.length > 1 ? (times[times.length - 1] as number) - t0 : 0;

  const yOf = (v: number): number => height - ((v - lo) / span) * height;
  const xOf = (i: number): number => {
    if (values.length === 1) return plotWidth / 2;
    // Real elapsed time when we have dates, the index when we only have bare
    // numbers — never the index when a date was supplied.
    if (times.length === values.length && tSpan > 0) {
      return (((times[i] as number) - t0) / tSpan) * plotWidth;
    }
    return (i / (values.length - 1)) * plotWidth;
  };

  const plotted: Plotted[] = values.map((v, i) => ({
    x: xOf(i),
    y: yOf(v),
    at: dated[i]?.at,
  }));

  const dateOf = (iso: string | undefined): string | undefined => {
    if (!iso) return undefined;
    const ms = Date.parse(iso);
    if (!Number.isFinite(ms)) return undefined;
    return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(
      new Date(ms)
    );
  };

  const firstDate = dateOf(plotted[0]?.at);
  const lastDate = dateOf(plotted[plotted.length - 1]?.at);
  const change = latest - first;
  const changeText =
    values.length > 1 ? `${change >= 0 ? '+' : '−'}${format(Math.abs(change), unit)}` : null;

  // A stroke is a non-text graphic, so 3:1 — against the card it is drawn on.
  const ink = ensureContrast(colors[color], colors.card, MIN_NON_TEXT_CONTRAST);

  // The band is a grey block with no meaning unless its range is written down.
  const bandText = band ? `${format(band.low, unit)} – ${format(band.high, unit)}` : null;
  const caption = metaLine([percentile, bandText, changeText]);

  // Every number on this card, in one sentence — which is what the base's
  // `role="img"` and its "Height over time" caption replaced with nothing.
  const name = spokenLine([
    metricWord,
    firstDate && lastDate && firstDate !== lastDate ? `${firstDate} – ${lastDate}` : firstDate,
    format(first, unit),
    format(latest, unit),
    changeText,
    percentile,
    bandText,
  ]);

  const onPlotLayout = (event: LayoutChangeEvent): void => {
    setPlotWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={container}>
      <View accessible accessibilityLabel={name} style={{ gap: tokens.spacing.xs }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: tokens.spacing.sm,
          }}
        >
          <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
            {`${glyph} ${metricWord}`}
          </TextV4>
          <TextV4 size="lg" weight="bold" tone="onCard" numeric="tabular">
            {format(latest, unit)}
          </TextV4>
        </View>
        {caption ? (
          <TextV4 size="xs" tone="mutedText">
            {caption}
          </TextV4>
        ) : null}
      </View>

      {/* Decorative: every number in it is stated above and in the card's own
          spoken name. The base announced this as a picture and stopped there. */}
      <View
        onLayout={onPlotLayout}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ width: '100%', height }}
      >
        {plotWidth > 0 ? (
          <Svg width={plotWidth} height={height}>
            {band ? (
              <Rect
                x={0}
                y={yOf(band.high)}
                width={plotWidth}
                height={Math.max(0, yOf(band.low) - yOf(band.high))}
                fill={trackGround(theme)}
              />
            ) : null}
            {plotted.length > 1 ? (
              <Polyline
                points={plotted.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke={ink}
                strokeWidth={CHART_MARK.stroke}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ) : null}
            {plotted.map((p, i) => (
              <Circle key={i} cx={p.x} cy={p.y} r={CHART_MARK.dotSize / 2} fill={ink} />
            ))}
          </Svg>
        ) : null}
      </View>

      {firstDate || lastDate ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }}
        >
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {firstDate ?? ''}
          </TextV4>
          {lastDate && lastDate !== firstDate ? (
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {lastDate}
            </TextV4>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
