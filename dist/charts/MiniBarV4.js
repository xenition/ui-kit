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
exports.MiniBarV4 = exports.MINI_BAR_V4_CSS = exports.MINI_BAR_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const internal_v4_1 = require("./internal-v4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
/** The one `<style>` id this component injects from. Idempotent. */
exports.MINI_BAR_V4_STYLE_ID = 'xen-v4-mini-bar-styles';
const slotRule = (i) => `[data-xen-v4-minibar-fill][data-slot="${i}"] { background-color: var(--xen-chart-${i + 1}); }`;
const toneRule = (tone) => `[data-xen-v4-minibar-fill][data-tone="${tone}"] { background-color: var(--xen-${tone}); }`;
/**
 * The track and the fill, as a sheet rather than as inline styles.
 *
 * Every value here is a `var()`. A CSSOM that does not parse custom properties
 * — jsdom, and any SSR style extractor built on one — drops such a value from
 * an inline `style` **outright**, leaving the bar unpainted with no error;
 * `internal/nav-v4.ts` and `internal-v4.tsx` both record the same reason for
 * the same choice. The SVG members of this family escape it because a `fill`
 * is an attribute, not a declaration, and a mini bar is not an SVG (see the
 * component doc for why it stays two boxes).
 *
 * The track is `--xen-chart-grid`, the same derived neutral every grid line in
 * the module takes. The base painted it `colors.border` — a *hairline* colour
 * doing chart chrome's job, which is the defect brief §3.3 names against the
 * axes the base paints with `var(--xen-muted)`.
 */
exports.MINI_BAR_V4_CSS = `
[data-xen-v4-minibar] { background-color: var(--xen-chart-grid); }
${Array.from({ length: v4_chart_1.CHART_SERIES_COUNT }, (_, i) => slotRule(i)).join('\n')}
${['success', 'warn', 'danger'].map(toneRule).join('\n')}
`;
/**
 * **V4 mini bar** — the web twin of a component that existed only on native
 * (brief §6), built as V4 from the start because there is no base to mirror.
 *
 * A **mark**, not a figure: one slot, no title, no legend, no axis (§5 Group
 * A). It is what goes beside a number in a row when the number alone does not
 * say "of how much" — a quota, a budget, a completion.
 *
 * ## What the native base got wrong, and what this twin fixes for both
 *
 * 1. **Colour was a semantic token.** `colors[color]` over the six-slot
 *    `ChartColor` vocabulary, which let a caller paint a neutral quota `warn`
 *    because it happened to be the fourth bar on the screen (§1 rule 2, rule
 *    3). It takes slot 1, or a declared `tone`, and nothing else.
 * 2. **The track was `colors.border`.** See {@link MINI_BAR_V4_CSS}.
 * 3. **`height = 6`.** Not on the spacing scale, so it is `spacing.sm` here —
 *    and the prop stays, so a caller who needs 6 can still say 6.
 *
 * ## Why it is two boxes and not an SVG
 *
 * Every other mark in this family is an SVG, which is what makes a stroke
 * width mean painted pixels in a responsive plot. A pill is the one shape that
 * is *worse* that way: a stretched viewBox turns an `rx` into an elongated
 * ellipse, so the cap of the bar would change shape with the width of the
 * column. A `border-radius` does not — it is resolved after layout — so the
 * mini bar stays two boxes and gets a true pill at any width.
 *
 * ## Why both ends are round
 *
 * Brief §4.4 puts `CHART_MARK.endRadius` at the **data end only**, "because a
 * bar rounded at the baseline floats off its axis". That rule is about a bar
 * standing on an axis. A mini bar is a **meter**: a pill track with a pill
 * fill inside it, sharing an edge with the track rather than sitting on a
 * baseline — the shape the kit's progress controls already take. So the fill
 * is `radius.full` at both ends, and §4.4 is untouched where it applies.
 *
 * ## Degenerate inputs
 *
 * `value / max` is the one division here and it is guarded at both ends: a
 * `max` of zero, negative or non-finite floors at 1, and a non-finite ratio
 * clamps to 0. The base floored `max` and did **not** clamp the ratio, so a
 * `NaN` value produced `width: "NaN%"` — a silently empty track with no error,
 * which is the divide-by-zero class §4.5 asks every spec in this pass to
 * assert against.
 */
exports.MiniBarV4 = React.forwardRef(function MiniBarV4({ value, max = 100, slot = 0, tone, height, loading = false, animate = true, formatValue = String, className, style, 'aria-label': ariaLabel, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.MINI_BAR_V4_STYLE_ID, exports.MINI_BAR_V4_CSS);
    const chart = (0, internal_v4_1.useChartV4)(animate);
    // The palette is never cycled (§1 rule 4). `chartVar` throws past the last
    // slot for that reason; this mark paints through a sheet rather than through
    // `chartVar`, so it makes the same check itself rather than silently
    // emitting a `data-slot="7"` that no rule matches and rendering a bar with
    // no fill at all.
    if (!Number.isInteger(slot) || slot < 0 || slot >= v4_chart_1.CHART_SERIES_COUNT) {
        throw new RangeError(`@xenition/ui charts: series ${slot} is outside the ${v4_chart_1.CHART_SERIES_COUNT}-slot palette. ` +
            'The palette is never cycled — fold the extra series into "Other", or facet the chart.');
    }
    const ceiling = Math.max(Number.isFinite(max) ? max : 1, 1);
    const raw = value / ceiling;
    const ratio = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), 1) : 0;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full', className), style: style, ...rest, children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height ?? 'var(--xen-space-sm)' }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, ...chart.rootProps, "data-xen-v4-minibar": "", role: "img", "aria-label": ariaLabel ?? `${formatValue(value)} of ${formatValue(ceiling)}`, className: (0, cn_1.cn)('w-full overflow-hidden rounded-[var(--xen-radius-full)]', height === undefined ? 'h-sm' : undefined, className), style: {
            ...chart.rootProps.style,
            ...(height === undefined ? null : { height }),
            ...style,
        }, ...rest, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-minibar-fill": "", "data-xen-v4-chart-fill": "", "data-slot": tone === undefined ? slot : undefined, "data-tone": tone, className: "h-full rounded-[var(--xen-radius-full)]", style: { width: `${ratio * 100}%` } }) }));
});
//# sourceMappingURL=MiniBarV4.js.map