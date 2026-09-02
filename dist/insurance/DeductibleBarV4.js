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
exports.DeductibleBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ProgressV4_1 = require("../primitives/ProgressV4");
const format_1 = require("./internal/format");
const coverage_v4_1 = require("./coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 deductible bar** — same props as {@link DeductibleBar} plus `metLabel`,
 * `toGoLabel` and `overLabel`.
 *
 * ## Four changes
 *
 * 1. **A policy with no deductible no longer reads as a deductible that has
 *    been met.** The base guarded a `<= 0` ceiling by setting `ratio = 1`, so
 *    `deductibleCents={0}` — which is what a plan with no deductible recorded,
 *    or a field that has not loaded, looks like — drew a **full green bar
 *    reading "Deductible met"**. That is a claim about money the holder does
 *    not owe. With no usable ceiling the bar is not drawn at all and the line
 *    says only what has been applied.
 * 2. **The meter and the caption are the same number.** `value={ratio * 100}`
 *    was announced as `33.33333333333333` while the caption beside it said
 *    33%; both now come from `deductibleParts`, whose `percent` is a whole
 *    number by construction.
 * 3. **Money applied beyond the ceiling is shown.** `metCents={150000}`
 *    against a `deductibleCents={100000}` displayed "$1,000.00 / $1,000.00"
 *    and never mentioned the extra $500 — the one figure the holder would have
 *    called about.
 * 4. **Every word is a prop**, and the caption is inked with `*-text` slots
 *    rather than `text-success` / `text-muted`, which are fills the compiler
 *    makes no contrast promise about as text.
 */
exports.DeductibleBarV4 = React.forwardRef(function DeductibleBarV4({ metCents, deductibleCents, label = 'Deductible', currency = 'USD', formatMoney: format = format_1.formatMoney, metLabel = 'Deductible met', toGoLabel = 'to go', overLabel = 'applied beyond the deductible', noCeilingLabel = 'No deductible recorded', className, ...rest }, ref) {
    const parts = (0, coverage_v4_1.deductibleParts)(metCents, deductibleCents);
    const metText = format(parts.met, currency);
    const ceilingText = parts.ceiling != null ? format(parts.ceiling, currency) : undefined;
    const remaining = parts.hasCeiling ? Math.max(0, (parts.ceiling ?? 0) - parts.met) : 0;
    const toGoText = `${format(remaining, currency)} ${toGoLabel}`;
    const overText = `${format(parts.over, currency)} ${overLabel}`;
    // With no usable ceiling there is no ratio to draw, and drawing one anyway
    // is what made a zero deductible look satisfied.
    const caption = !parts.hasCeiling
        ? noCeilingLabel
        : parts.over > 0
            ? overText
            : parts.satisfied
                ? metLabel
                : toGoText;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-card", children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', tone_v4_1.TABULAR_CLASS), children: ceilingText != null ? `${metText} / ${ceilingText}` : metText })] }), parts.hasCeiling ? ((0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: parts.percent ?? 0, max: 100, tone: parts.satisfied ? 'success' : 'warn', "aria-label": (0, tone_v4_1.spokenLine)([label, `${(0, tone_v4_1.percentText)(parts.percent ?? 0)} met`, caption]) })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', parts.satisfied || parts.over > 0 ? 'text-success-text' : 'text-muted-text'), children: caption })] }));
});
//# sourceMappingURL=DeductibleBarV4.js.map