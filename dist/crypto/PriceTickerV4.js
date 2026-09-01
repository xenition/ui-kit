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
exports.PriceTickerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Sparkline_1 = require("../charts/Sparkline");
const row_v4_1 = require("../dashboard/internal/row-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/** A flat quote has no direction, so its sparkline takes the identity slot. */
const SPARK_COLOR = {
    success: 'success',
    danger: 'danger',
    neutral: 'primary',
};
/**
 * **V4 price ticker** — the web twin of the native `PriceTickerV4`, same props
 * as {@link PriceTicker} plus `directionLabels`.
 *
 * ## Five changes
 *
 * 1. **The ticker announces its price.** `aria-label="BTC price"` sat on the
 *    interactive root and replaced the subtree, so the price and the change —
 *    the only two things on the row — were never read out.
 * 2. **A loss is no longer announced as a gain.** `` `${pct >= 0 ? 'up' :
 *    'down'} ${formatPct(Math.abs(pct))}` `` re-applied a sign after taking the
 *    absolute value, so a 2.4% drop read "down +2.40%", and a flat `0` was
 *    called "up" beside a `•` glyph. One `changeParts()` call now decides the
 *    word, the glyph and the tone together.
 * 3. **The change is inked, not filled.** `changeToneClass()` returns
 *    `text-success` / `text-danger` / `text-muted`, which are fills.
 * 4. **The skeleton is visible, and the row stops jumping.** It was
 *    `bg-neutral-100` — a light-oriented ramp step that paints a pale plate
 *    onto a dark page — in a bare `h-10` / `h-14` box that had nothing to do
 *    with the row's real metrics, so a list of tickers visibly shifted the
 *    moment the quotes landed. The placeholder is now the shared opaque mix,
 *    drawn inside the real row container, in a `role="status"` region rather
 *    than behind an `aria-label` on a `div` with no role.
 * 5. **A press is a state layer** on the shared row body, and the row is a
 *    real `<button>` rather than a `div` with `role="button"`, `tabIndex` and
 *    a hand-written Enter/Space handler.
 */
exports.PriceTickerV4 = React.forwardRef(function PriceTickerV4({ symbol, name, price, changePct = 0, currencySymbol = '$', priceDecimals = 2, spark, variant = 'compact', loading = false, onClick, directionLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const detailed = variant === 'detailed';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": `Loading ${symbol} price`, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(detailed && name != null)), children: [(0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-md w-1/4', market_v4_1.PLACEHOLDER_CLASS) }), detailed && name != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-sm w-2/5', market_v4_1.PLACEHOLDER_CLASS) })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-md w-[5rem]', market_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-sm w-[3rem]', market_v4_1.PLACEHOLDER_CLASS) })] })] }) }));
    }
    const change = (0, market_v4_1.changeParts)(changePct, directionLabels);
    const priceText = (0, format_1.formatPrice)(price, { symbol: currencySymbol, decimals: priceDecimals });
    const label = (0, market_v4_1.spokenLine)([
        symbol,
        detailed ? name : undefined,
        priceText,
        `${change.word} ${(0, format_1.formatPct)(changePct)}`,
    ]);
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(detailed && name != null), 'rounded-[var(--xen-radius-md)]');
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: symbol }), detailed && name != null ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: name })) : null] }), detailed && spark != null && spark.length > 0 ? (
            // A trend rail is decoration beside a number that already says the
            // same thing; the reader gets the number.
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex shrink-0 items-center", children: (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: spark, width: 64, height: 28, color: SPARK_COLOR[change.tone] }) })) : null, (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-card', market_v4_1.TABULAR_CLASS), children: priceText }), (0, jsx_runtime_1.jsxs)("span", { "aria-hidden": onClick ? true : undefined, className: (0, cn_1.cn)('text-xs font-semibold', market_v4_1.TABULAR_CLASS, (0, market_v4_1.changeInkClass)(change.tone)), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: change.glyph }), ' ', onClick ? null : (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: `${change.word} ` }), (0, format_1.formatPct)(changePct)] })] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(rowClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: rowClass, children: body })) }));
});
//# sourceMappingURL=PriceTickerV4.js.map