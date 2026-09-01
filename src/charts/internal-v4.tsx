import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { useXenitionCompiledTheme } from '../provider';
import { zebraCss } from '../primitives/internal/v4-data';
import { EASE_STANDARD, transitionCss, V4_MOTION } from '../primitives/internal/v4-motion';
import {
  CHART_AXIS_MIX,
  CHART_GRID_MIX,
  CHART_RAMP_STEPS,
  CHART_SERIES_COUNT,
  chartDiverging,
  chartSequential,
  chartSeries,
} from '../primitives/internal/v4-chart';

/**
 * The web half of the V4 charts line.
 *
 * The palette itself, the validator run behind it and every rule about how
 * many series a form may carry live in `primitives/internal/v4-chart.ts`,
 * which both twins share. This file is the **web spelling**: how five derived
 * hexes reach an SVG fill without freezing the colour scheme.
 *
 * ## Why the palette is emitted as custom properties and not as fills
 *
 * The base charts write `fill="var(--xen-primary)"`, which follows
 * `[data-theme="dark"]` for free because the compiler re-emits every semantic
 * slot under that selector. A derived palette has no such luck: it is computed
 * in JavaScript from the seed's brand hue, and JavaScript does not know which
 * scheme is active — `useXenitionCompiledTheme()` hands back *both*.
 *
 * Resolving the scheme in JS would mean reading `document.documentElement`,
 * subscribing to attribute mutations, and re-rendering every chart on a theme
 * flip. Instead the element carries both palettes as plain hex custom
 * properties, and one static rule picks between them:
 *
 * ```css
 * [data-xen-v4-chart] { --xen-chart-1: var(--xen-chart-1-l); }
 * [data-theme="dark"] [data-xen-v4-chart] { --xen-chart-1: var(--xen-chart-1-d); }
 * ```
 *
 * The theme flip is then a pure CSS cascade — no listener, no re-render, no
 * flash — and the values that go inline are plain hexes, which survive the
 * jsdom CSSOM that drops a `color-mix()` from an inline `style` outright.
 *
 * ## Why sequential and diverging are emitted as steps
 *
 * A magnitude ramp is continuous, and a continuous value cannot be a custom
 * property picked by a selector. It is quantised to nine buckets instead —
 * which is what Carbon does too (ten discrete steps, not a gradient), and
 * which is honest about what a reader can actually distinguish: nobody reads
 * the difference between the 41st and 42nd percentile off a fill.
 */

/**
 * How many buckets a sequential or diverging ramp is quantised into.
 *
 * Re-exported from the shared palette module rather than redeclared: the
 * native twin buckets from the same binding, and the whole point of the number
 * is that both twins land on the same nine bands.
 */
export { CHART_RAMP_STEPS };

/** The one `<style>` id the whole V4 charts line injects from. Idempotent. */
export const CHART_V4_STYLE_ID = 'xen-v4-chart-styles';

const seriesRule = (i: number): string =>
  `  --xen-chart-${i + 1}: var(--xen-chart-${i + 1}-l);`;
const seriesDarkRule = (i: number): string =>
  `  --xen-chart-${i + 1}: var(--xen-chart-${i + 1}-d);`;
const rampRule = (name: string, i: number): string =>
  `  --xen-chart-${name}-${i}: var(--xen-chart-${name}-${i}-l);`;
const rampDarkRule = (name: string, i: number): string =>
  `  --xen-chart-${name}-${i}: var(--xen-chart-${name}-${i}-d);`;

const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i);

/**
 * The static sheet: scheme selection, chrome colour, and the one motion rule.
 *
 * Every declaration here is theme-independent — it maps one custom property
 * onto another, or mixes the two scheme-resolved neutral slots — so a single
 * fixed id is correct and a second `XenitionUIProvider` on the page does not
 * fight it.
 */
export const CHART_V4_CSS = `
[data-xen-v4-chart] {
${range(CHART_SERIES_COUNT).map(seriesRule).join('\n')}
${range(CHART_RAMP_STEPS).map((i) => rampRule('seq', i)).join('\n')}
${range(CHART_RAMP_STEPS).map((i) => rampRule('div', i)).join('\n')}
  --xen-chart-grid: ${zebraCss(CHART_GRID_MIX)};
  --xen-chart-axis: ${zebraCss(CHART_AXIS_MIX)};
}
[data-theme="dark"] [data-xen-v4-chart] {
${range(CHART_SERIES_COUNT).map(seriesDarkRule).join('\n')}
${range(CHART_RAMP_STEPS).map((i) => rampDarkRule('seq', i)).join('\n')}
${range(CHART_RAMP_STEPS).map((i) => rampDarkRule('div', i)).join('\n')}
}
/*
  A mark that overlaps another mark carries a ring of the page, so two points
  on top of each other still read as two. This is one of the secondary
  encodings the palette's CVD band obliges, and it is a paint rule rather than
  a prop because every form that can overlap needs it identically.
*/
[data-xen-v4-chart] [data-xen-v4-mark-ring] {
  stroke: var(--xen-surface);
  paint-order: stroke;
}
/*
  Entrance is a reveal, never a re-draw: the marks are already in their final
  positions and the plot is wiped in. Under reduced motion it is a plain fade,
  because a chart that appears with no transition at all reads as a glitch
  (design.md 36.10) — the same relief the V4 surfaces use.
*/
@keyframes xen-v4-chart-in { from { opacity: 0; transform: scaleY(0.94); } to { opacity: 1; transform: none; } }
@keyframes xen-v4-chart-fade { from { opacity: 0; } to { opacity: 1; } }
[data-xen-v4-chart][data-animate="true"] {
  transform-origin: bottom;
  animation: xen-v4-chart-in var(--xen-motion-enter, 400ms) var(--xen-motion-easing-enter, cubic-bezier(0.05, 0.7, 0.1, 1));
}
/*
  The hover readout.

  Every figure in the line renders its tooltip as \`{hovered !== null ? … :
  null}\` — a mount and an unmount, which without a rule is a bubble that
  blinks into existence under the pointer. \`TooltipV4\` solved the same problem
  with a fade off \`[data-xen-v4-nav-tip]\`, and this is the charts line's
  spelling of it: ONE rule here rather than a bespoke keyframe in each of the
  five files that draw a readout.

  \`quick\` and not \`reveal\`: a chart tip is not a panel arriving, it is
  feedback tied to a pointer that is still moving, and the reader is already
  looking at the place it appears. \`EASE_STANDARD\` for the same reason — it
  starts and ends in place, so nothing about it is an arrival.

  \`data-reveal="hover"\` narrows the direct-value marker to the ONE case that
  is a reveal. \`[data-xen-v4-chart-value]\` also labels a legend readout and a
  range bar's static endpoints, which are simply there and should not fade in.
*/
@keyframes xen-v4-chart-tip-in { from { opacity: 0; } to { opacity: 1; } }
[data-xen-v4-chart-tip],
[data-xen-v4-chart-tooltip],
[data-xen-v4-chart-value][data-reveal="hover"] {
  animation: xen-v4-chart-tip-in ${V4_MOTION.quick}ms ${EASE_STANDARD};
}

/*
  A mark whose LENGTH is the value.

  \`[data-animate]\` above is a MOUNT-time entrance and nothing else, so a bar,
  a ring or a band whose value changes while it is on screen — a KPI ring going
  40% to 75% — jumped from one length to the next with no movement between
  them. \`ProgressV4\` in the primitives line has always eased its width; this
  is the same line, for the charts family, keyed off one attribute so the five
  marks that carry a live value cannot drift apart.

  \`standard\`: a control changing state, which is exactly what this is. The
  three properties are the three spellings of "how long is the mark" in this
  line — a box's \`width\`, a floating band's \`left\`, and an arc's
  \`stroke-dashoffset\` — and a property that never changes on a given mark
  costs nothing by being listed.
*/
[data-xen-v4-chart-fill] {
  transition: ${transitionCss(['width', 'left', 'stroke-dashoffset'])};
}

@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-chart][data-animate="true"] {
    animation: xen-v4-chart-fade var(--xen-motion-standard, 200ms) var(--xen-motion-easing-exit, cubic-bezier(0.3, 0, 1, 1));
  }
  [data-xen-v4-chart-tip],
  [data-xen-v4-chart-tooltip],
  [data-xen-v4-chart-value][data-reveal="hover"] { animation: none; }
  [data-xen-v4-chart-fill] { transition: none; }
}
`;

/**
 * The brand hue's source of truth.
 *
 * `ramps.primary[500]` rather than `colors.primary`: the ramp keeps ONE
 * orientation in both schemes (the compiler inverts it only at emit time), so
 * the hue a palette is derived from does not shift when the reader flips the
 * theme. Deriving from `colors.primary` would rotate every series slot in dark
 * mode, which is exactly the identity break the shared module forbids.
 */
const BRAND_STEP = 500;

/**
 * The seed's brand hex, or a neutral blue when no `XenitionUIProvider` is
 * mounted.
 *
 * `useXenitionCompiledTheme()` throws in that case, which is right for an app
 * — a missing provider means every `--xen-*` is missing too — and wrong for a
 * chart, which should render its default look rather than blow up someone's
 * render. Same shape as `useDepth()` in `surface-v4.ts`; the `useContext`
 * inside runs unconditionally before the throw, so hook order stays stable.
 */
function useBrandHex(): string {
  let compiled = null;
  try {
    compiled = useXenitionCompiledTheme();
  } catch {
    compiled = null;
  }
  return compiled?.ramps.primary[BRAND_STEP] ?? '#3b82f6';
}

/**
 * Everything a V4 chart element needs: the attribute that opts it into the
 * sheet, and both schemes' palettes as inline custom properties.
 *
 * Spread onto the outermost element of the chart:
 *
 * ```tsx
 * const chart = useChartV4();
 * return <svg {...chart.rootProps}><rect fill={chartVar(0)} /></svg>;
 * ```
 */
export interface ChartV4 {
  /** Spread onto the chart's root element. */
  rootProps: { 'data-xen-v4-chart': ''; style: React.CSSProperties };
  /** The active-scheme series colour references, in assignment order. */
  series: string[];
}

/**
 * Derive the palette once per brand colour and hand back both the inline
 * custom properties and the `var()` references that read them.
 *
 * Memoised on the brand hex alone: the derivation is ten gamut bisections plus
 * eighteen ramp steps, and a chart that recomputes that on every pointer move
 * is spending it on nothing.
 */
export function useChartV4(animate = false): ChartV4 {
  const brand = useBrandHex();
  injectStyleOnce(CHART_V4_STYLE_ID, CHART_V4_CSS);

  const style = React.useMemo(() => {
    const vars: Record<string, string> = {};
    const light = chartSeries(brand, 'light');
    const dark = chartSeries(brand, 'dark');
    for (let i = 0; i < CHART_SERIES_COUNT; i += 1) {
      vars[`--xen-chart-${i + 1}-l`] = light[i] as string;
      vars[`--xen-chart-${i + 1}-d`] = dark[i] as string;
    }
    for (let i = 0; i < CHART_RAMP_STEPS; i += 1) {
      const t = i / (CHART_RAMP_STEPS - 1);
      vars[`--xen-chart-seq-${i}-l`] = chartSequential(brand, t, 'light');
      vars[`--xen-chart-seq-${i}-d`] = chartSequential(brand, t, 'dark');
      const d = t * 2 - 1;
      vars[`--xen-chart-div-${i}-l`] = chartDiverging(brand, d, 'light');
      vars[`--xen-chart-div-${i}-d`] = chartDiverging(brand, d, 'dark');
    }
    return vars as React.CSSProperties;
  }, [brand]);

  return React.useMemo(
    () => ({
      rootProps: animate
        ? ({ 'data-xen-v4-chart': '', 'data-animate': 'true', style } as ChartV4['rootProps'])
        : ({ 'data-xen-v4-chart': '', style } as ChartV4['rootProps']),
      series: range(CHART_SERIES_COUNT).map((i) => chartVar(i)),
    }),
    [animate, style]
  );
}

/**
 * The `var()` for a categorical slot.
 *
 * **Throws past the last slot rather than wrapping.** The base cycled with
 * `i % SERIES.length` and silently painted a sixth series the same colour as
 * the first; two different things in one colour, with a legend that repeats
 * the swatch as though that were fine. A sixth series is a composition
 * decision — fold it into "Other", facet the chart, or drop it — and it
 * belongs to the caller, not to a modulo.
 */
export function chartVar(index: number): string {
  if (!Number.isInteger(index) || index < 0 || index >= CHART_SERIES_COUNT) {
    throw new RangeError(
      `@xenition/ui charts: series ${index} is outside the ${CHART_SERIES_COUNT}-slot palette. ` +
        'The palette is never cycled — fold the extra series into "Other", or facet the chart.'
    );
  }
  return `var(--xen-chart-${index + 1})`;
}

/** The `var()` for a sequential bucket — magnitude, one hue, light to dark. */
export function chartSeqVar(t: number): string {
  const clamped = Number.isFinite(t) ? Math.min(Math.max(t, 0), 1) : 0;
  const step = Math.round(clamped * (CHART_RAMP_STEPS - 1));
  return `var(--xen-chart-seq-${step})`;
}

/** The `var()` for a diverging bucket — polarity, two arms, neutral middle. */
export function chartDivVar(t: number): string {
  const clamped = Number.isFinite(t) ? Math.min(Math.max(t, -1), 1) : 0;
  const step = Math.round(((clamped + 1) / 2) * (CHART_RAMP_STEPS - 1));
  return `var(--xen-chart-div-${step})`;
}

/** Grid lines — reference, not data. Recessive by construction. */
export const CHART_GRID_VAR = 'var(--xen-chart-grid)';
/** The axis line — one step more present than the grid behind it. */
export const CHART_AXIS_VAR = 'var(--xen-chart-axis)';

/**
 * The empty state every V4 chart falls back to.
 *
 * Not a bare string: a chart that renders nothing where a chart was promised
 * reads as a broken chart, and the caller cannot tell "no data yet" from "the
 * request failed". The plot keeps its footprint so the page does not reflow
 * when data arrives — the single most common dashboard jank, and free to
 * avoid here.
 */
export function ChartEmptyV4({
  label = 'No data',
  height,
}: {
  label?: string;
  height?: number;
}): React.ReactElement {
  return (
    <div
      role="img"
      aria-label={label}
      style={height === undefined ? undefined : { height }}
      className="text-muted-text flex w-full items-center justify-center text-sm"
    >
      {label}
    </div>
  );
}
