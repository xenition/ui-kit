"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHART_AXIS_VAR = exports.CHART_GRID_VAR = exports.CHART_V4_CSS = exports.CHART_V4_STYLE_ID = exports.CHART_RAMP_STEPS = void 0;
exports.useChartV4 = useChartV4;
exports.chartVar = chartVar;
exports.chartSeqVar = chartSeqVar;
exports.chartDivVar = chartDivVar;
exports.ChartEmptyV4 = ChartEmptyV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const provider_1 = require("../provider");
const v4_data_1 = require("../primitives/internal/v4-data");
const v4_motion_1 = require("../primitives/internal/v4-motion");
const v4_chart_1 = require("../primitives/internal/v4-chart");
Object.defineProperty(exports, "CHART_RAMP_STEPS", { enumerable: true, get: function () { return v4_chart_1.CHART_RAMP_STEPS; } });
/** The one `<style>` id the whole V4 charts line injects from. Idempotent. */
exports.CHART_V4_STYLE_ID = 'xen-v4-chart-styles';
const seriesRule = (i) => `  --xen-chart-${i + 1}: var(--xen-chart-${i + 1}-l);`;
const seriesDarkRule = (i) => `  --xen-chart-${i + 1}: var(--xen-chart-${i + 1}-d);`;
const rampRule = (name, i) => `  --xen-chart-${name}-${i}: var(--xen-chart-${name}-${i}-l);`;
const rampDarkRule = (name, i) => `  --xen-chart-${name}-${i}: var(--xen-chart-${name}-${i}-d);`;
const range = (n) => Array.from({ length: n }, (_, i) => i);
/**
 * The static sheet: scheme selection, chrome colour, and the one motion rule.
 *
 * Every declaration here is theme-independent — it maps one custom property
 * onto another, or mixes the two scheme-resolved neutral slots — so a single
 * fixed id is correct and a second `XenitionUIProvider` on the page does not
 * fight it.
 */
exports.CHART_V4_CSS = `
[data-xen-v4-chart] {
${range(v4_chart_1.CHART_SERIES_COUNT).map(seriesRule).join('\n')}
${range(v4_chart_1.CHART_RAMP_STEPS).map((i) => rampRule('seq', i)).join('\n')}
${range(v4_chart_1.CHART_RAMP_STEPS).map((i) => rampRule('div', i)).join('\n')}
  --xen-chart-grid: ${(0, v4_data_1.zebraCss)(v4_chart_1.CHART_GRID_MIX)};
  --xen-chart-axis: ${(0, v4_data_1.zebraCss)(v4_chart_1.CHART_AXIS_MIX)};
}
[data-theme="dark"] [data-xen-v4-chart] {
${range(v4_chart_1.CHART_SERIES_COUNT).map(seriesDarkRule).join('\n')}
${range(v4_chart_1.CHART_RAMP_STEPS).map((i) => rampDarkRule('seq', i)).join('\n')}
${range(v4_chart_1.CHART_RAMP_STEPS).map((i) => rampDarkRule('div', i)).join('\n')}
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
  animation: xen-v4-chart-tip-in ${v4_motion_1.V4_MOTION.quick}ms ${v4_motion_1.EASE_STANDARD};
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
  transition: ${(0, v4_motion_1.transitionCss)(['width', 'left', 'stroke-dashoffset'])};
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
function useBrandHex() {
    let compiled = null;
    try {
        compiled = (0, provider_1.useXenitionCompiledTheme)();
    }
    catch {
        compiled = null;
    }
    return compiled?.ramps.primary[BRAND_STEP] ?? '#3b82f6';
}
/**
 * Derive the palette once per brand colour and hand back both the inline
 * custom properties and the `var()` references that read them.
 *
 * Memoised on the brand hex alone: the derivation is ten gamut bisections plus
 * eighteen ramp steps, and a chart that recomputes that on every pointer move
 * is spending it on nothing.
 */
function useChartV4(animate = false) {
    const brand = useBrandHex();
    (0, inject_1.injectStyleOnce)(exports.CHART_V4_STYLE_ID, exports.CHART_V4_CSS);
    const style = React.useMemo(() => {
        const vars = {};
        const light = (0, v4_chart_1.chartSeries)(brand, 'light');
        const dark = (0, v4_chart_1.chartSeries)(brand, 'dark');
        for (let i = 0; i < v4_chart_1.CHART_SERIES_COUNT; i += 1) {
            vars[`--xen-chart-${i + 1}-l`] = light[i];
            vars[`--xen-chart-${i + 1}-d`] = dark[i];
        }
        for (let i = 0; i < v4_chart_1.CHART_RAMP_STEPS; i += 1) {
            const t = i / (v4_chart_1.CHART_RAMP_STEPS - 1);
            vars[`--xen-chart-seq-${i}-l`] = (0, v4_chart_1.chartSequential)(brand, t, 'light');
            vars[`--xen-chart-seq-${i}-d`] = (0, v4_chart_1.chartSequential)(brand, t, 'dark');
            const d = t * 2 - 1;
            vars[`--xen-chart-div-${i}-l`] = (0, v4_chart_1.chartDiverging)(brand, d, 'light');
            vars[`--xen-chart-div-${i}-d`] = (0, v4_chart_1.chartDiverging)(brand, d, 'dark');
        }
        return vars;
    }, [brand]);
    return React.useMemo(() => ({
        rootProps: animate
            ? { 'data-xen-v4-chart': '', 'data-animate': 'true', style }
            : { 'data-xen-v4-chart': '', style },
        series: range(v4_chart_1.CHART_SERIES_COUNT).map((i) => chartVar(i)),
    }), [animate, style]);
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
function chartVar(index) {
    if (!Number.isInteger(index) || index < 0 || index >= v4_chart_1.CHART_SERIES_COUNT) {
        throw new RangeError(`@xenition/ui charts: series ${index} is outside the ${v4_chart_1.CHART_SERIES_COUNT}-slot palette. ` +
            'The palette is never cycled — fold the extra series into "Other", or facet the chart.');
    }
    return `var(--xen-chart-${index + 1})`;
}
/** The `var()` for a sequential bucket — magnitude, one hue, light to dark. */
function chartSeqVar(t) {
    const clamped = Number.isFinite(t) ? Math.min(Math.max(t, 0), 1) : 0;
    const step = Math.round(clamped * (v4_chart_1.CHART_RAMP_STEPS - 1));
    return `var(--xen-chart-seq-${step})`;
}
/** The `var()` for a diverging bucket — polarity, two arms, neutral middle. */
function chartDivVar(t) {
    const clamped = Number.isFinite(t) ? Math.min(Math.max(t, -1), 1) : 0;
    const step = Math.round(((clamped + 1) / 2) * (v4_chart_1.CHART_RAMP_STEPS - 1));
    return `var(--xen-chart-div-${step})`;
}
/** Grid lines — reference, not data. Recessive by construction. */
exports.CHART_GRID_VAR = 'var(--xen-chart-grid)';
/** The axis line — one step more present than the grid behind it. */
exports.CHART_AXIS_VAR = 'var(--xen-chart-axis)';
/**
 * The empty state every V4 chart falls back to.
 *
 * Not a bare string: a chart that renders nothing where a chart was promised
 * reads as a broken chart, and the caller cannot tell "no data yet" from "the
 * request failed". The plot keeps its footprint so the page does not reflow
 * when data arrives — the single most common dashboard jank, and free to
 * avoid here.
 */
function ChartEmptyV4({ label = 'No data', height, }) {
    return ((0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": label, style: height === undefined ? undefined : { height }, className: "text-muted-text flex w-full items-center justify-center text-sm", children: label }));
}
//# sourceMappingURL=internal-v4.js.map