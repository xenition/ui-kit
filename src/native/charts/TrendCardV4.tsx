import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { useXenitionTheme, type SemanticColors } from '../theme';
import type { IconName } from '../../primitives/icon-names';
import { SparklineV4 } from './SparklineV4';
import type { ChartToneV4 } from './SparklineV4';

/**
 * Direction of a `delta`.
 *
 * `'flat'` is the value the base had no word for: a delta with no direction
 * rendered in the sparkline's own colour, so "0.0%" was painted the same green
 * as "+12%". `StatCardV4` named this first and this component takes its
 * vocabulary verbatim — there must not be two ways to say "the number went up"
 * in one kit.
 */
export type TrendCardV4Trend = 'up' | 'down' | 'flat';

export interface TrendCardV4Props {
  /** Metric label, e.g. "Revenue". */
  label: string;
  /** The one loud number. */
  value: string | number;
  /** The change, e.g. "+12.4%". */
  delta?: string;
  /** Direction of `delta`. Drives the ink and the glyph. Default `'flat'`. */
  trend?: TrendCardV4Trend;
  /**
   * The quiet line under the delta — "vs last month", "last 30 days". The base
   * had nowhere to put it, so apps appended it to `label` and got it at the
   * wrong size above the number instead of below it.
   */
  caption?: string;
  /** Trend series, drawn as the composed {@link SparklineV4}. */
  data?: number[];
  /** Which categorical slot the sparkline takes. Default `0` (the brand hue). */
  slot?: number;
  /**
   * Paint the sparkline with a status hue because the series genuinely means
   * good or bad. **Not** the delta's direction — see the component doc.
   */
  tone?: ChartToneV4;
  /** The sparkline's height in px. Default `28`. */
  height?: number;
  /** The sparkline's width in px. Default `120`. */
  width?: number;
  /** Render the loading placeholders instead of the content. */
  loading?: boolean;
  /**
   * Whether the card carries `elevation.card`. Default `true`. Pass `false`
   * when the card sits **inside** another card — layout brief §4.6, never nest
   * a shadow in a shadow.
   */
  raised?: boolean;
  /** Play the sparkline's entrance reveal. Default `true`. */
  animate?: boolean;
  /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Trend → direction glyph.
 *
 * The kit's confirmed icon set has `chevron-up`, `chevron-down` and `forward`
 * and no arrows, so the mark is a chevron rather than a `▲` typed into this
 * file. Identical to `StatCardV4`'s table, deliberately.
 */
const TREND_ICON: Record<TrendCardV4Trend, IconName> = {
  up: 'chevron-up',
  down: 'chevron-down',
  flat: 'forward',
};

/**
 * Trend → ink.
 *
 * The contrast-corrected `*Text` slots, **never the fills**. Brief §5 Group A
 * asks for exactly this: "delta ink from the `*Text` slots (`successText` /
 * `dangerText` / `mutedText`), never the fills". `success` is what a filled
 * chip is painted with and the compiler makes no contrast promise about it as
 * ink on a card; `successText` is exactly that promise. The base painted the
 * delta `colors[color]` — the *fill* — which is the same defect one layer
 * down.
 */
const TREND_TONE: Record<TrendCardV4Trend, keyof SemanticColors> = {
  up: 'successText',
  down: 'dangerText',
  flat: 'mutedText',
};

/**
 * **V4 trend card (native)** — the figure `StatCardV4` already got right, with
 * a plot in it.
 *
 * Brief §5 Group A names the anatomy exactly: `colors.card` ground, label →
 * value → delta → caption → sparkline, delta ink from the `*Text` slots,
 * composing `SparklineV4`. Four changes from the base, in the order they
 * matter.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** The single most
 *    visible bug in the whole V4 line: a card painted the same colour as the
 *    page it sits on is a spreadsheet cell (charts brief §3.2, layout brief
 *    §4.2), and the border ends up doing all the work. `CardV4` supplies the
 *    rest of the recipe — the radius, the hairline, `elevation.card`, and the
 *    shadow that gets *more* opacity in dark — and only the fill is stated
 *    here.
 * 2. **The delta is not colour alone.** The base tinted it `colors[color]` —
 *    the sparkline's own hue — so a delta was *purple* on a purple-seeded app
 *    and carried no direction at all. V4 pairs the `*Text` ink with a real
 *    chevron from the named set, which is the secondary encoding §1 rule 5
 *    obliges everywhere in this module and the ~8% of men who cannot separate
 *    green from red depend on.
 * 3. **The trend and the series are two different channels.** `trend` colours
 *    the delta; `slot` / `tone` colour the plot. Folding them together — one
 *    `color` prop for the sparkline *and* the delta accent — means a chart
 *    whose line changes colour when the last point moves, which is the
 *    identity break `CHART_HUE_OFFSETS` is documented to prevent. A sparkline
 *    stays slot 1 whatever the number did this month.
 * 4. **The value is the loudest thing on the block.** `3xl` bold in tabular
 *    figures, matching `StatCardV4` and `StatisticV4`. `2xl` ties the page
 *    title, and a KPI that ties the page title has no hierarchy. Tabular
 *    figures are what stop a ticking value reflowing and a column of cards
 *    failing to line up.
 *
 * Composes `CardV4`, `TextV4`, `IconV4` and `SparklineV4` — §1 rule 8, a V4
 * composite composes V4 children, which is also what keeps the mark on the
 * derived palette instead of on `colors.primary`. It renders **nothing** when
 * it has neither a label nor a value: brief §4.5, a component with nothing to
 * show is never a blank bordered box.
 */
export function TrendCardV4({
  label,
  value,
  delta,
  trend = 'flat',
  caption,
  data,
  slot = 0,
  tone,
  height = 28,
  width = 120,
  loading = false,
  raised = true,
  animate = true,
  accessibilityLabel,
  style,
}: TrendCardV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();

  const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  const hasValue = value !== undefined && value !== null && value !== '';
  const hasLabel = label !== undefined && label !== null && label !== '';
  if (!hasLabel && !hasValue && !loading) return null;

  return (
    <CardV4
      accessibilityLabel={
        accessibilityLabel ??
        `${String(label ?? '')}${valueText ? `, ${valueText}` : ''}${delta ? `, ${delta}` : ''}${
          caption ? `, ${caption}` : ''
        }`
      }
      variant={raised ? 'elevated' : 'outlined'}
      radius="lg"
      padding="lg"
      style={[
        {
          // The headline fix. Everything else in the recipe is `CardV4`'s;
          // only the fill is stated here, because `CardV4` still paints the
          // page colour.
          backgroundColor: colors.card,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      {/*
        One text block on the `xs` rhythm (layout brief §4.1, "between a title
        and its supporting line"): label, value, delta and caption are one
        thought about one number, and anything larger between them reads as
        separate rows stacked in a box.
      */}
      <View style={{ gap: tokens.spacing.xs }}>
        {loading ? (
          <SkeletonV4 variant="text" lines={2} />
        ) : (
          <>
            {hasLabel ? (
              <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
                {label}
              </TextV4>
            ) : null}
            {hasValue ? (
              <TextV4 size="3xl" weight="bold" tone="onCard" numeric="tabular">
                {value}
              </TextV4>
            ) : null}
            {delta ? (
              <View
                testID="trend-delta"
                style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
              >
                <IconV4 name={TREND_ICON[trend]} size="xs" color={TREND_TONE[trend]} />
                <TextV4 size="sm" weight="semibold" tone={TREND_TONE[trend]} numeric="tabular">
                  {delta}
                </TextV4>
              </View>
            ) : null}
            {caption ? (
              <TextV4 size="xs" tone="mutedText">
                {caption}
              </TextV4>
            ) : null}
          </>
        )}
      </View>

      {loading ? (
        <SparklineV4 data={[]} loading width={width} height={height} />
      ) : data !== undefined && data.length > 0 ? (
        <SparklineV4
          data={data}
          slot={slot}
          tone={tone}
          width={width}
          height={height}
          animate={animate}
        />
      ) : null}
    </CardV4>
  );
}
