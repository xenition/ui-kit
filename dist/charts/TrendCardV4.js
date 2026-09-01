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
exports.TrendCardV4 = exports.TREND_CARD_V4_CSS = exports.TREND_CARD_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const SparklineV4_1 = require("./SparklineV4");
/**
 * Trend → direction glyph.
 *
 * The kit's confirmed icon set has `chevron-up`, `chevron-down` and `forward`
 * and no arrows, so the mark is a chevron rather than a `▲` typed into this
 * file. Identical to `StatCardV4`'s table, deliberately.
 */
const TREND_ICON = {
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
 * delta `var(--xen-${color})` — the *fill* — which is the same defect one
 * layer down.
 */
const TREND_TONE = {
    up: 'successText',
    down: 'dangerText',
    flat: 'mutedText',
};
/** The one `<style>` id this component injects from. Idempotent. */
exports.TREND_CARD_V4_STYLE_ID = 'xen-v4-trend-card-styles';
/**
 * Two rules, each needing something a utility class bound to a token cannot
 * say. Both are `StatCardV4`'s, for the reasons that file argues at length and
 * which are not re-argued here.
 *
 * 1. **The card ground.** `CardV4` hard-codes `bg-surface text-on-surface` in
 *    its own class list and `cn()` is a plain string join with no
 *    `tailwind-merge` behind it, so passing `bg-card` in `className` would put
 *    both utilities on the element and let stylesheet ordering pick — and
 *    Tailwind sorts `.bg-card` *before* `.bg-surface`, so the override would
 *    lose silently. The override is made by **specificity** instead: two
 *    attributes (0-2-0) against one class (0-1-0) wins wherever the sheets
 *    land.
 * 2. **The trend glyph's ink.** `IconV4`'s `color` takes the ten `IconColor`
 *    slots and none of them is `successText`. Rather than tint the glyph with
 *    the *fill*, it inherits from the delta line, which is already the right
 *    `*Text` colour.
 */
exports.TREND_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-trend-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
[data-xen-v4-trend-delta] [data-xen-v4-icon] {
  color: inherit;
}
`;
/**
 * **V4 trend card** — the figure `StatCardV4` already got right, with a plot
 * in it.
 *
 * Brief §5 Group A names the anatomy exactly: `colors.card` ground, label →
 * value → delta → caption → sparkline, delta ink from the `*Text` slots,
 * composing `SparklineV4`. Four changes from the base, in the order they
 * matter.
 *
 * 1. **The ground is `card`, not `surface`.** The single most visible bug in
 *    the whole V4 line: a card painted the same colour as the page it sits on
 *    is a spreadsheet cell (charts brief §3.2, layout brief §4.2), and the
 *    border ends up doing all the work. See {@link TREND_CARD_V4_CSS} for why
 *    the override is a sheet.
 * 2. **The delta is not colour alone.** The base tinted it
 *    `var(--xen-${color})` — the sparkline's own hue — so a delta was
 *    *purple* on a purple-seeded app and carried no direction at all. V4 pairs
 *    the `*Text` ink with a real chevron from the named set, which is the
 *    secondary encoding brief §1 rule 5 obliges everywhere in this module and
 *    the ~8% of men who cannot separate green from red depend on.
 * 3. **The trend and the series are two different channels.** `trend` colours
 *    the delta; `slot` / `tone` colour the plot. Folding them together — which
 *    is what "one `color` prop for the sparkline **and** the delta accent"
 *    did — means a chart whose line changes colour when the last point moves,
 *    which is the identity break `CHART_HUE_OFFSETS` is documented to prevent.
 *    A sparkline stays slot 1 whatever the number did this month.
 * 4. **The value is the loudest thing on the block.** `3xl` bold in tabular
 *    figures, matching `StatCardV4` and `StatisticV4`. `2xl` ties the page
 *    title, and a KPI that ties the page title has no hierarchy. Tabular
 *    figures are what stop a ticking value reflowing and a row of cards
 *    failing to line up.
 *
 * It renders **nothing** when it has neither a label nor a value: brief §4.5,
 * a component with nothing to show is never a blank bordered box.
 */
exports.TrendCardV4 = React.forwardRef(function TrendCardV4({ label, value, delta, trend = 'flat', caption, data, slot = 0, tone, height = 28, width = 120, loading = false, raised = true, animate = true, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.TREND_CARD_V4_STYLE_ID, exports.TREND_CARD_V4_CSS);
    const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    const hasValue = value !== undefined && value !== null && value !== '';
    const hasLabel = label !== undefined && label !== null && label !== '';
    if (!hasLabel && !hasValue && !loading)
        return null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-v4-trend-card": "", variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "lg", role: "img", "aria-label": `${label}${valueText ? `, ${valueText}` : ''}${delta ? `, ${delta}` : ''}${caption ? `, ${caption}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-col gap-xs", children: loading ? ((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: 2 })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [hasLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: label })) : null, hasValue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onCard", numeric: "tabular", children: value })) : null, delta ? ((0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { "data-xen-v4-trend-delta": "", size: "sm", weight: "semibold", tone: TREND_TONE[trend], numeric: "tabular", className: "inline-flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: TREND_ICON[trend], size: "xs" }), delta] })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption })) : null] })) }), loading ? ((0, jsx_runtime_1.jsx)(SparklineV4_1.SparklineV4, { data: [], loading: true, width: width, height: height })) : data !== undefined && data.length > 0 ? ((0, jsx_runtime_1.jsx)(SparklineV4_1.SparklineV4, { data: data, slot: slot, tone: tone, width: width, height: height, animate: animate, className: "w-full", "aria-hidden": "true" })) : null] }));
});
//# sourceMappingURL=TrendCardV4.js.map