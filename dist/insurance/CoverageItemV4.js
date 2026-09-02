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
exports.CoverageItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./internal/format");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 coverage item** — same props as {@link CoverageItem} plus
 * `unlimitedLabel`, `excludedLabel` and `includedLabel`.
 *
 * ## Four changes
 *
 * 1. **"—" no longer means two opposite things.** The base printed an em dash
 *    both for an included coverage with no ceiling — unlimited, the best line
 *    on the policy — and for a coverage that is excluded outright. Those are
 *    the two ends of the range and they rendered identically, so a reader
 *    comparing two quotes could not tell "we will pay whatever it costs" from
 *    "we will not pay". They are now `unlimitedLabel` and `excludedLabel`.
 * 2. **Inclusion stops spending a status colour.** `included → success`,
 *    `excluded → muted` said that a policy covering water damage is good news
 *    and that one excluding it is a failure. Inclusion is a property of the
 *    contract, and half of any benefits list is always excluded; a page of
 *    green ticks over grey struck-through lines teaches the eye to stop
 *    reading both. The glyph and, now, the word carry it. `muted` was also a
 *    **fill** slot with no contrast promise, and `bg-neutral-100` behind the
 *    excluded mark mirrors under `[data-theme="dark"]`.
 * 3. **`limitCents={-1}` no longer prints "$0.00".** The base clamped with
 *    `Math.max(0, …)`, so a bad value looked like a real zero benefit.
 * 4. **The line is one thought, not three stops.** The mark carried its own
 *    `aria-label`, so the reader heard "Included" and "Collision" and
 *    "$50,000.00" as three separate items; the mark is now decorative and the
 *    row's own text says all three in order.
 */
exports.CoverageItemV4 = React.forwardRef(function CoverageItemV4({ label, included = true, limitCents, detail, currency = 'USD', formatMoney: format = format_1.formatMoney, unlimitedLabel = 'Unlimited', excludedLabel = 'Not covered', includedLabel = 'Included', className, ...rest }, ref) {
    if (!label)
        return null;
    const mark = included ? tone_v4_1.COVERAGE_MARK_V4.included : tone_v4_1.COVERAGE_MARK_V4.excluded;
    const markWord = included ? includedLabel : excludedLabel;
    const limit = included ? (0, tone_v4_1.moneyParts)(limitCents, currency, format) : undefined;
    const value = included ? (limit?.text ?? unlimitedLabel) : excludedLabel;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-md py-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] text-xs', (0, tone_v4_1.toneInkClass)(mark.tone)), style: (0, tone_v4_1.toneGroundStyle)(mark.tone), children: mark.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-base font-semibold', included ? 'text-on-card' : 'text-muted-text line-through'), children: label }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted-text", children: [markWord, detail != null && detail !== '' ? ` · ${detail}` : ''] })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-sm font-semibold', tone_v4_1.TABULAR_CLASS, limit?.negative ? 'text-danger-text' : included ? 'text-on-card' : 'text-muted-text'), children: limit?.negative ? tone_v4_1.NEGATIVE_AMOUNT_LABEL : value })] }));
});
//# sourceMappingURL=CoverageItemV4.js.map