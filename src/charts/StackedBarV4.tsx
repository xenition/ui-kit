import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { LegendV4 } from './LegendV4';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  foldChartSeries,
  type ChartToneV4,
} from '../primitives/internal/v4-chart';
import { ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';

/**
 * The opt-in to status colour, and the only way a segment paints one
 * (brief §4.3).
 *
 * A stack is the one bar form where status is often the *right* answer — a
 * pass/fail split, a budget under/over — so `tone` is per segment here rather
 * than per chart. Rule 3's "one or the other, never both" is enforced instead:
 * either every segment declares a tone or none does. A stack where segment 2 is
 * "failed" red and segment 4 is red because it is fourth cannot say which red
 * it means, so this component refuses to draw it.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type StackedBarV4Tone = ChartToneV4;

export interface StackedBarV4Segment {
  /** The segment's share of the total. Negative values are clamped to 0. */
  value: number;
  /**
   * What this segment is. Carried by the legend, the tooltip and the
   * accessible sentence — a stack without labels is a bar of colours.
   */
  label?: string;
  /** Status colour for this segment. All segments or none — see {@link StackedBarV4Tone}. */
  tone?: StackedBarV4Tone;
}

export interface StackedBarV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /** Segments laid end to end; each width is its share of the total. */
  segments: StackedBarV4Segment[];
  /** Bar height in px. */
  height?: number;
  /**
   * Show the legend. Defaults to **on at two or more segments** — brief §1
   * rule 5: the legend is the identity channel's redundancy and is not
   * optional where colour is carrying identity.
   */
  legend?: boolean;
  /**
   * Show each segment's value in the legend. Defaults to **on at
   * `CHART_DIRECT_LABEL_MAX` segments or fewer**. See {@link StackedBarV4} for
   * why a stack's direct labels live in the legend rather than in the bar.
   */
  showValues?: boolean;
  /** How a value is spelled, in the legend, the tooltip and the sentence. */
  format?: (value: number) => string;
  /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
  title?: string;
  /** The one loud number this figure is evidence for. */
  summary?: string;
  /** The quiet line — "vs last month", "last 30 days". */
  caption?: string;
  /** Render a skeleton at the bar's footprint instead of the bar. */
  loading?: boolean;
  /** What the empty state says. Keeps the footprint either way (brief §4.5). */
  emptyLabel?: string;
  /** Play the entrance reveal, once. Default `true` (brief §4.7). */
  animate?: boolean;
  /** Hover tooltip carrying the precise value. Default `true` (brief §4.6). */
  tooltip?: boolean;
  /** Fired when a segment is clicked. See the note on the bar chart's `onSelect`. */
  onSelect?: (index: number, value: number) => void;
}

/** A segment's non-negative contribution. `NaN` and `-1` both count as nothing. */
function share(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Rule 3, enforced rather than documented.
 *
 * The palette module already throws rather than cycling past slot 5, on the
 * grounds that a silent second meaning for one colour is worse than a loud
 * failure. Mixing status hues with slot hues in one stack is the same defect
 * wearing a different hat, so it gets the same answer.
 */
function assertOneColourVocabulary(segments: StackedBarV4Segment[]): void {
  const toned = segments.filter((s) => s.tone !== undefined).length;
  if (toned !== 0 && toned !== segments.length) {
    throw new RangeError(
      '@xenition/ui charts: a stacked bar carries status colour or slot colour, never both. ' +
        `${toned} of ${segments.length} segments declare a tone — give every segment one, or none.`
    );
  }
}

/**
 * Fold a stack that is longer than the palette, instead of crashing on it.
 *
 * `chartVar(5)` throws, and it is right to: asking the palette for a sixth
 * slot is a mistake in the caller's own code. But a stack's segment count
 * arrives with the **data** — six lines on an expenses breakdown from a live
 * API — and a `RangeError` thrown out of render takes the whole page down.
 * The split the shared module draws is exactly this: *the primitive throws,
 * the component folds* (see `foldChartSeries`).
 *
 * A stack is a composition — the parts add up to the whole — so the tail is
 * **summed** into one segment named {@link CHART_OVERFLOW_LABEL}, the same
 * answer `PieChartV4` gives for the same reason. The total is unchanged, which
 * is the property a stack must not lose: a bar that dropped its sixth segment
 * would silently rescale every other one.
 *
 * Not sorted, deliberately. `foldChartSeries` does not sort and neither does
 * this: a stack's order is the composition the caller chose, and re-ranking it
 * moves a segment between slots exactly as re-ordering the palette would. A
 * pie sorts because its tail is genuinely "the small ones"; a stack's is "the
 * ones after the fifth".
 *
 * A **toned** stack never folds. It is not spending the categorical palette,
 * so there is no slot to run out of — and "Other" has no honest status hue:
 * the residual of a pass/fail split is neither passing nor failing.
 */
function foldSegmentsV4(segments: StackedBarV4Segment[]): StackedBarV4Segment[] {
  if (segments.some((s) => s.tone !== undefined)) return segments;
  const fold = foldChartSeries(segments);
  if (!fold.didFold) return fold.kept;
  return [
    ...fold.kept,
    {
      value: fold.folded.reduce((sum, s) => sum + share(s.value), 0),
      label: CHART_OVERFLOW_LABEL,
    },
  ];
}

/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function stackedBarLabel(
  segments: StackedBarV4Segment[],
  total: number,
  title: string | undefined
): string {
  const head = `Stacked bar${title ? `, ${title}` : ''}`;
  const count = `${segments.length} ${segments.length === 1 ? 'segment' : 'segments'}`;
  if (total <= 0) return `${head}, ${count}`;
  const parts = segments.map((s, i) => {
    const name = s.label ?? `Segment ${i + 1}`;
    return `${name} ${Math.round((share(s.value) / total) * 100)}%`;
  });
  return `${head}, ${count}, ${parts.join(', ')}`;
}

/**
 * The custom property every mark in this chart reads its fill from.
 *
 * The palette reaches an element as `var(--xen-chart-1)`, and a `var()` in an
 * inline `background-color` is dropped outright by the jsdom CSSOM — the same
 * hazard `internal-v4.tsx` records against `color-mix()`. So the value goes
 * inline as a **custom property**, which no CSSOM validates, and one static
 * rule turns it into paint.
 *
 * A stack is the one chart in this group where the property is set **per
 * element** rather than once on the root: a segment and its legend swatch are
 * two nodes that must be the same colour, and inheritance is what guarantees
 * they never drift apart.
 */
const MARK_FILL = '--xen-v4-mark-fill';

/** The one `<style>` id this component injects from. Idempotent. */
export const STACKED_BAR_V4_STYLE_ID = 'xen-v4-stacked-bar-styles';

/** Paint, keyed off the chart's own root attribute. */
export const STACKED_BAR_V4_CSS = `
[data-xen-v4-stacked-bar] [data-xen-v4-segment] { background-color: var(${MARK_FILL}); }
/*
  The legend swatch is LegendV4's since the consolidation pass, and is painted
  by that component's own sheet — so it is deliberately NOT selected here. A
  more specific rule reaching for a custom property LegendV4 never sets would
  paint every swatch transparent.
*/
[data-xen-v4-stacked-bar] [data-xen-v4-chart-indicator] {
  width: ${CHART_MARK.dotSize}px;
  height: ${CHART_MARK.dotSize}px;
  border-radius: ${CHART_MARK.dotSize}px;
  background-color: var(${MARK_FILL});
}
`;

/**
 * **V4 stacked bar** — one horizontal bar split into its parts.
 *
 * The base is the module's clearest example of the defect this whole pass
 * exists to fix, because it makes the mistake twice:
 *
 * 1. **`seriesColor(i)` cycles the semantic slots.** Segment 3 is painted
 *    `success`, segment 4 `warn`, segment 5 `danger` — so a three-part revenue
 *    split renders as green, amber, red and reads as a health indicator.
 *    Nothing is wrong with segment 4; it is simply fourth. V4 takes the shared
 *    palette's slots in order, and status is opt-in per {@link
 *    StackedBarV4Tone}.
 * 2. **`opacity` as the way to tell segments apart.** The base's own doc
 *    comment recommends it: "distinguish series by varying the `opacity` of one
 *    theme color". Opacity is not a categorical channel — it is a *magnitude*
 *    channel, so a descending ramp says the fourth segment matters less than
 *    the first, and at the bottom of the ramp it says the fourth segment is
 *    **disabled**, because 0.38 of a colour is exactly what `v4-state.ts` uses
 *    to mean that. Retired outright: every segment is painted at full strength.
 *
 * ## The gap is the encoding
 *
 * `CHART_MARK.gap` of page between segments is not a style choice here, it is
 * the secondary encoding the palette's 6.5 adjacent CVD ΔE obliges (brief §1
 * rule 5). Two segments a dichromat cannot tell apart by hue are still visibly
 * two segments when a hairline of page runs between them — and a stack is the
 * one form where every pair of series is guaranteed to be adjacent, so it is
 * the form that needs it most. The base drew its segments flush.
 *
 * ## Where a stack's direct labels go
 *
 * Brief §4.4 asks for direct labels at four series or fewer. A stack cannot
 * take them in place: a segment is as wide as its share, so the 8% segment has
 * no room for "8%" and the label that does not fit is the one the reader most
 * wanted. So the legend carries the values instead — same channel, same four-
 * or-fewer rule, somewhere they fit. The tooltip carries the precise number
 * for the rest.
 *
 * ## Rounding
 *
 * `CHART_MARK.endRadius` at the **data end only** (brief §4.4): the stack's
 * right edge is where the total lands, and its left edge is the baseline. A bar
 * rounded at the baseline floats off its axis, which is why the base's
 * `rx={5}` pill is gone.
 */
export const StackedBarV4 = React.forwardRef<HTMLDivElement, StackedBarV4Props>(
  function StackedBarV4(
    {
      segments,
      height = 16,
      legend,
      showValues,
      format = String,
      title,
      summary,
      caption,
      loading = false,
      emptyLabel = 'No data',
      animate = true,
      tooltip = true,
      onSelect,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const chart = useChartV4();
    injectStyleOnce(STACKED_BAR_V4_STYLE_ID, STACKED_BAR_V4_CSS);
    const [hovered, setHovered] = React.useState<number | null>(null);

    assertOneColourVocabulary(segments);

    // Everything below draws the **folded** stack: past the palette's five
    // slots the tail is summed into one "Other" segment rather than thrown at.
    // See {@link foldSegmentsV4}.
    const drawn = foldSegmentsV4(segments);
    const total = drawn.reduce((sum, s) => sum + share(s.value), 0);
    const label = stackedBarLabel(drawn, total, title);

    const header =
      title || summary || caption ? (
        <div className="flex min-w-0 flex-col gap-xs">
          {title ? (
            <TextV4 size="base" weight="semibold" numberOfLines={1}>
              {title}
            </TextV4>
          ) : null}
          {summary ? (
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {summary}
            </TextV4>
          ) : null}
          {caption ? (
            <TextV4 size="sm" tone="mutedText">
              {caption}
            </TextV4>
          ) : null}
        </div>
      ) : null;

    const frame = (children: React.ReactNode): React.ReactElement => (
      <div
        ref={ref}
        data-xen-v4-stacked-bar=""
        {...chart.rootProps}
        style={{ ...chart.rootProps.style, ...style }}
        className={cn('flex w-full flex-col gap-sm', className)}
        {...rest}
      >
        {header}
        {children}
      </div>
    );

    if (loading) {
      return frame(
        <div aria-busy="true" aria-label={label} role="img">
          <SkeletonV4 variant="rect" width="100%" height={height} />
        </div>
      );
    }
    // No segments and an all-zero stack are the same picture — a bar with
    // nothing in it — so they get the same answer rather than the base's
    // silent `null`-shaped divergence.
    if (drawn.length === 0 || total <= 0) {
      return frame(<ChartEmptyV4 label={emptyLabel} height={height} />);
    }

    const showLegend = legend ?? drawn.length >= 2;
    const legendValues = showValues ?? drawn.length <= CHART_DIRECT_LABEL_MAX;
    const fillOf = (segment: StackedBarV4Segment, i: number): string =>
      segment.tone ? `var(--xen-${segment.tone})` : chartVar(i);
    const last = drawn.length - 1;

    return frame(
      <div role="img" aria-label={label} className="flex w-full flex-col gap-sm">
        {/*
          The bar is 16 tall by default, which is under the tap floor, so the
          press target is the padded row around it (rule 10) rather than the
          painted mark.
        */}
        <div
          data-xen-v4-chart=""
          data-xen-v4-chart-plot=""
          {...(animate ? { 'data-animate': 'true' } : {})}
          className={cn('flex w-full items-center', MIN_TAP_CLASS)}
          style={{ position: 'relative' }}
        >
          <div className="flex w-full" style={{ height, gap: CHART_MARK.gap }}>
            {drawn.map((segment, i) => {
              const value = share(segment.value);
              if (value <= 0) return null;
              return (
                <div
                  key={i}
                  data-xen-v4-segment=""
                  className="h-full cursor-default"
                  style={{
                    flexGrow: value / total,
                    flexBasis: 0,
                    // `1` is the hairline exception in rule 1: a segment that
                    // exists must be visible, however small its share.
                    minWidth: 1,
                    [MARK_FILL]: fillOf(segment, i),
                    borderTopRightRadius: i === last ? CHART_MARK.endRadius : undefined,
                    borderBottomRightRadius: i === last ? CHART_MARK.endRadius : undefined,
                  } as React.CSSProperties}
                  onPointerEnter={tooltip ? () => setHovered(i) : undefined}
                  onPointerLeave={tooltip ? () => setHovered(null) : undefined}
                  onClick={onSelect ? () => onSelect(i, segment.value) : undefined}
                />
              );
            })}
          </div>
          {tooltip && hovered !== null && drawn[hovered] !== undefined ? (
            <div
              data-xen-v4-chart-tooltip=""
              role="presentation"
              className="pointer-events-none absolute flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-popover px-sm py-xs"
              style={{ left: 0, top: 0 }}
            >
              <span
                data-xen-v4-chart-indicator=""
                style={
                  {
                    [MARK_FILL]: fillOf(drawn[hovered] as StackedBarV4Segment, hovered),
                  } as React.CSSProperties
                }
              />
              <TextV4 size="xs" tone="onPopover" numeric="tabular">
                {drawn[hovered]?.label ? `${drawn[hovered]?.label}: ` : ''}
                {format(drawn[hovered]?.value as number)}
              </TextV4>
            </div>
          ) : null}
        </div>
        {/*
          The legend is the shared `LegendV4`, not a local one. It was local
          because that component was Group D's and was not on disk while this
          group built; the swap also retires the `numberOfLines={1}` this file
          had on the label, which is the one thing `LegendV4` is explicit that a
          legend must never do — a clipped legend label is an unreadable
          identity, and identity is the only reason the legend exists.
        */}
        {showLegend ? (
          <LegendV4
            items={drawn.map((segment, i) => ({
              key: String(i),
              label: segment.label ?? `Segment ${i + 1}`,
              slot: i,
              ...(segment.tone === undefined ? {} : { tone: segment.tone }),
              ...(legendValues ? { value: format(segment.value) } : {}),
            }))}
          />
        ) : null}
      </div>
    );
  }
);
